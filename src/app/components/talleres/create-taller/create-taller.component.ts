import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CodigoCompartidoService } from '../../../services/snack-bar.service';
import { TalleresService } from '../../../services/talleres.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import 'moment/locale/es';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

/**
 * Componente para crear un nuevo taller.
 * Permite a los administradores autenticados ingresar detalles del taller.
 *
 * @export
 * @class CreateTallerComponent
 * @typedef {CreateTallerComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-create-taller',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-Es' },
    provideMomentDateAdapter(),
  ],
  templateUrl: './create-taller.component.html',
  styleUrl: './create-taller.component.scss',
})
export class CreateTallerComponent implements OnInit {
  /**
   * Indica si el usuario actual está autenticado como administrador.
   * @type {boolean}
   */
  @Input() adminLogueado: boolean = false;

  /**
   * Formulario reactivo para añadir los datos del taller.
   * Contiene los campos necesarios y sus validaciones.
   */
  addTallerForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    modalidad: new FormControl('', [Validators.required]),
    profesores: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    hora: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
    ]),
    lugar: new FormControl('', [Validators.required]),
  });

  /**
   * Constructor del componente.
   * @param tallerService Servicio para la gestión de talleres.
   * @param snackBarService Servicio para mostrar notificaciones tipo snackbar.
   * @param authService Servicio de autenticación para verificar el estado del usuario.
   * @param router Router de Angular para la navegación entre páginas.
   */
  constructor(
    private tallerService: TalleresService,
    private snackBarService: CodigoCompartidoService,
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Inicializa el componente.
   * Suscribe al estado de autenticación del usuario.
   */
  ngOnInit(): void {
    this.authService.adminLogueado$.subscribe((state) => {
      this.adminLogueado = state;
    });
  }

  /**
   * Envía los datos del taller al servicio correspondiente para crear el taller.
   * Muestra un mensaje de éxito o error según el resultado.
   */
  handleCreateTaller(): void {
    if (this.addTallerForm.valid) {
      //actualiza la fecha para que no cambie el día al transformarla en Date
      let fecha: string | null = this.addTallerForm.controls.fecha.value;
      if (fecha) {
        const fechaDate = new Date(fecha);
        // Ajustar la fecha a la zona horaria local sin cambiar la hora
        const adjustedDate = new Date(
          fechaDate.getTime() - fechaDate.getTimezoneOffset() * 60000
        );
        const formattedDate = adjustedDate.toISOString().split('T')[0];
        this.addTallerForm.get('fecha')?.patchValue(formattedDate);
      }
      this.tallerService.createTaller(this.addTallerForm.value).subscribe({
        next: () => {
          //muestra snackbar con mensaje de exito y luego navega a la página de talleres
          this.snackBarService.openSnackBar(
            'Se ha añadido el taller con éxito',
            'success'
          );
          this.snackBarService.snackBarRef.afterDismissed().subscribe(() => {
            this.router.navigate(['/talleres']);
          });
        },
        error: (error) => {
          //en caso de error muestra snckbar con mensaje de error
          this.snackBarService.openSnackBar(error.message, 'error');
        },
      });
    }
  }

  /**
   * Navega a la página de talleres, cerrando el formulario actual.
   */
  handleCloseForm(): void {
    this.router.navigate(['/talleres']);
  }

  /**
   * Devuelve un mensaje de error específico para un control del formulario.
   * @param control Control del formulario al que se verifica el error.
   * @returns {string} Mensaje de error basado en las validaciones del control.
   */
  getErrorMessage(control: FormControl): string {
    let message: string = '';
    if (control.hasError('required')) {
      message = 'Este campo es obligatorio';
    }
    if (control.hasError('pattern')) {
      message = 'Formato incorrecto';
    }
    return message;
  }
}
