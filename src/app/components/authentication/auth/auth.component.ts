import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import 'moment/locale/es';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CodigoCompartidoService } from '../../../services/snack-bar.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

/**
 * Componente de autenticación que gestiona el login y registro de usuarios.
 *
 * @export
 * @class AuthComponent
 * @typedef {AuthComponent}
 */
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-Es'},
    provideMomentDateAdapter(),
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})


export class AuthComponent{
  
  
  /**
   * Fecha actual del sistema
   *
   * @private
   * @readonly
   * @type {number}
   */
  private readonly _currentYear: number = new Date().getFullYear();
  
  /**
   * Fecha mínima permitida para la fecha de nacimiento (1 de enero de hace 70 años).
   * @readonly
   * @type {Date}
   */
  readonly minDate: Date = new Date(this._currentYear - 70, 0, 1);

  
  /**
   * Fecha máxima permitida para la fecha de nacimiento (31 de diciembre de hace 13 años).
   *
   * @readonly
   * @type {Date}
   */
  readonly maxDate: Date = new Date(this._currentYear -13, 11, 31);

  
  /**
   * Indica si el formulario de registro está activo.
   *
   * @type {boolean}
   */
  isRegister: boolean = false;

  
  /**
   * Indica si la aplicación está en estado de carga.
   *
   * @type {boolean}
   */
  isLoading: boolean = false;

  /**
   * Controla la visibilidad del campo de contraseña.
   * @type {boolean}
   */
  hide: boolean = true;

  /**
   * Código de país seleccionado por defecto.
   * @type {string}
   */
  selectedCountryCode: string = '+34'; 

  /**
   * Lista de códigos de país disponibles.
   * @type {string[]}
   */
  countryCodes: string[] = [
    // Europa
    "+44", // Reino Unido
    "+33", // Francia
    "+49", // Alemania
    "+39", // Italia
    "+34", // España
    "+41", // Suiza
    "+31", // Países Bajos
    "+32", // Bélgica
    "+46", // Suecia
    "+47", // Noruega
    "+48", // Polonia
    "+43", // Austria
    "+30", // Grecia
    "+353", // Irlanda
    "+45", // Dinamarca
    "+36", // Hungría
    "+420", // República Checa
    "+421", // Eslovaquia
    "+372", // Estonia
    "+370", // Lituania
    "+371", // Letonia
    "+386", // Eslovenia
    "+386", // Croacia
    "+359", // Bulgaria
    "+40", // Rumanía
    "+386", // Montenegro
    "+382", // Serbia
    "+381", // Kosovo
    "+355", // Albania
    "+357", // Chipre
    "+373", // Moldavia
    "+380", // Ucrania
  
    // Rusia
    "+7", 
  
    // Estados Unidos y Canadá
    "+1", 
  
    // Argentina
    "+54" 
  ];

  /**
   * Crea una instancia del componente de autenticación.
   * @param {AuthService} authService Servicio de autenticación.
   * @param {Router} router Router para la navegación.
   * @param {CodigoCompartidoService} snackBarService Servicio para mostrar notificaciones.
   */
  constructor(
    public authService: AuthService,
    private router: Router,
    private snackBarService: CodigoCompartidoService
  ){}

  /**
   * Formulario de registro del usuario.
   * @type {FormGroup}
   */
  registerForm = new FormGroup({
    nombre: new FormControl("", [
      Validators.required, 
      Validators.minLength(2),
      Validators.pattern("^[a-zA-ZÀ-ÿ\\u00f1\\u00d1]+( [a-zA-ZÀ-ÿ\\u00f1\\u00d1]+)*$")]),
    apellidos: new FormControl("", [
      Validators.required
    ]),
    fechanacimiento: new FormControl("", [
      Validators.required
    ]),
    telefono: new FormControl("", [
      Validators.required,
      Validators.pattern('^[0-9]{6,15}$')
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!¡*@$%^&+=._-])(?=\\S+$).{8,}$")
    ]),
    bailerol: new FormControl("", [
      Validators.required
    ])
  });
  
  /**
   * Formulario de inicio de sesión del usuario.
   * @type {FormGroup}
   */
  loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("", [
      Validators.required
    ])
  });

  /**
   * Maneja el proceso de inicio de sesión. Llama al servicio de autenticación
   * para loguearse y, si es exitoso, guarda el token en el almacenamiento local.
   * @returns {void}
   */
  handleLogin():void{
    if (this.loginForm.valid || !this.loginForm.invalid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem("token", response.token);
          this.authService.getUserProfile().subscribe();
          this.router.navigate(["/areaPrivada"]);
          this.isLoading = false;
        },
        error: (errorMessage)=>{
          this.isLoading = false;
          this.snackBarService.openSnackBar(errorMessage.message, 'error', 3000);
        }
      })
    }
  }
  
  /**
   * Maneja el proceso de registro de usuario. Envía los datos del formulario al
   * servicio de autenticación para crear una cuenta de usuario.
   * @returns {void}
   */
  handleRegister():void{
    this.isLoading = true;
    //actualiza la fecha para que no cambie el día al transformarla en Date
    let fechanacimiento: string|null = this.registerForm.controls.fechanacimiento.value;
    if (fechanacimiento) {
      const fechanacimientoDate = new Date(fechanacimiento);
      // Ajustar la fecha a la zona horaria local sin cambiar la hora
      const adjustedDate = new Date(fechanacimientoDate.getTime() - fechanacimientoDate.getTimezoneOffset() * 60000);
      const formattedDate = adjustedDate.toISOString().split('T')[0];
      this.registerForm.get('fechanacimiento')?.patchValue(formattedDate);
    }
    
    //une el prefijo del pais al número de telefono
    const fullTelephoneNumber: string = this.selectedCountryCode + this.registerForm.controls.telefono.value;
    //actualiza el valor del teléfono en el formulario antes de enviarlo
    this.registerForm.controls.telefono.patchValue(fullTelephoneNumber);
    //llama al servicio para enviar el formulario de registro
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.snackBarService.openSnackBar (response.mensaje, 'success');
        this.isLoading = false;
      },
      error: (errorMessage) =>{
        this.snackBarService.openSnackBar(errorMessage.message, 'error', 5000);
        this.isLoading = false;
      }
    })
  }

  /**
   * Actualiza el valor de la fecha de nacimiento en el formulario en función de
   * la entrada del usuario.
   * @param {MatDatepickerInputEvent<Date>} event Evento de cambio de fecha.
   */
  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const dateString = event.value?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) ?? '';
  
    this.registerForm.get('fechanacimiento')?.setValue(dateString);
  }

  /**
   * Cambia de página entre el formulario de registro y el formulario de inicio de sesión.
   * @returns {void}
   */
  togglePanel():void {
    this.isRegister=!this.isRegister;
  }

  /**
   * Cierra el formulario y redirige a la página de inicio.
   * @returns {void}
   */
  handleCloseForm():void{
    this.router.navigate(["/home"]);
  }

  /**
   * Genera un mensaje de error basado en el tipo de validación que no se cumple en
   * un control del formulario.
   * @param {FormControl} control Control de formulario a evaluar.
   * @returns {string} Mensaje de error correspondiente.
   */
  getErrorMessage(control: FormControl): string {
    let message: string = "";
    if (control.hasError('required')) {
      message = 'Este campo es obligatorio';
    }
    if (control.hasError('pattern')) {
      message = 'Formato incorrecto';
    }
    if (control.hasError('minlength')) {
      message = 'Demasiado corto';
    }
    if (control.hasError('email')) {
      message = 'introduzca un email válido';
    }
    return message;
  }

  /**
   * Redirige a la página de recuperación de contraseña.
   * @returns {void}
   */
  handleForgotPassword():void{
    this.router.navigate(['/forgotPassword']);
  }
  
}


