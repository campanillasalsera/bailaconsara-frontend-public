import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth.service';
import { CodigoCompartidoService } from '../../../services/snack-bar.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Componente para manejar el proceso de recuperación de contraseña.
 * Permite solicitar un OTP (One-Time Password), confirmar el OTP y restablecer la contraseña.
 *
 * @export
 * @class ForgotPasswordComponent
 * @typedef {ForgotPasswordComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnInit {
  /**
   * Indica si se debe solicitar un OTP
   *
   * @type {boolean}
   */
  requestOtp: boolean = true;

  /**
   * Indica si se está en la fase de restablecimiento de contraseña
   *
   * @type {boolean}
   */
  resetPassword: boolean = false;

  /**
   * Indica si la contraseña debe estar oculta.
   *
   * @type {boolean}
   */
  hide: boolean = true;

  /**
   * Indica si se está cargando un proceso (por ejemplo, una solicitud).
   *
   * @type {boolean}
   */
  isLoading: boolean = false;

  /**
   * Almacena el email del usuario.
   *
   * @type {string}
   */
  email: string = '';

  /**
   * Almacena la nueva contraseña y su repetición.
   *
   * @type {*}
   */
  newPassword: any = {
    password: '',
    repeatPassword: '',
  };

  /**
   * Crea una instancia del componente ForgotPasswordComponent.
   *
   * @param authService
   * @param snackbarService
   * @param router
   * @param activatedRoute
   */
  constructor(
    private authService: AuthService,
    private snackbarService: CodigoCompartidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  /** Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Captura el parámetro email usando queryParams.
   */
  ngOnInit(): void {
    // Captura el parámetro email usando queryParams
    this.activatedRoute.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
    });
  }

  /**
   * Cambia el estado de solicitud de OTP.
   *
   * @returns {void}
   */
  reRequestOtp(): void {
    this.requestOtp = !this.requestOtp;
  }

  /**
   * Envía un correo electrónico al usuario con una contraseña OTP.
   *
   * @param {string} email - El correo electrónico del usuario al que se enviará el OTP.
   * @returns {void}
   */
  handleRerequestOTP(email: string): void {
    //activa el spinner-progress mientras se recibe la respuesta
    this.isLoading = true;
    this.authService.requestOTP(email).subscribe({
      next: (response) => {
        //una vez recibida la respuesta quita el spinner
        this.isLoading = false;
        this.snackbarService.openSnackBar(response.message, 'success', 5000);
        //como ya se ha enviado la OTP, lo ponemos a false para que se muetren los siguientes inputs
        this.requestOtp = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackbarService.openSnackBar(
          'Ups, se ha producido un error',
          'error'
        );
      },
    });
  }

  /**
   * Verifica el OTP ingresado por el usuario.
   *
   * @param {string} otp - La contraseña OTP ingresada por el usuario.
   * @param {string} email - El correo electrónico del usuario.
   * @returns {void}
   */
  handleConfirmOtp(otp: string, email: string): void {
    this.email = email;
    this.authService.confirmOtp(otp, email).subscribe({
      next: () => {
        //si la respuesta es de confirmación, se pone a true para que muestre los inputs de resetear contraseña
        this.resetPassword = true;
      },
      error: (error) => {
        this.snackbarService.openSnackBar(error.message, 'error', 3000);
      },
    });
  }

  /**
   * Comprueba que las contraseñas ingresadas coincidan antes de enviarlas al backend.
   *
   * @param {string} newPassword - La nueva contraseña ingresada.
   * @param {string} repeatNewPassword - La repetición de la nueva contraseña ingresada.
   * @returns {void}
   */
  handleResetPassword(newPassword: string, repeatNewPassword: string): void {
    if (newPassword !== repeatNewPassword) {
      this.snackbarService.openSnackBar(
        'Las contraseñas no coinciden',
        'error',
        4000
      );
    } else {
      this.newPassword.password = newPassword;
      this.newPassword.repeatPassword = repeatNewPassword;

      this.authService.resetPassword(this.newPassword, this.email).subscribe({
        next: (response) => {
          this.snackbarService.openSnackBar(response.message, 'success', 5000);
          this.authService.setUserLogueado(false);
          localStorage.clear();
          this.router.navigate(['/auth']);
        },
        error: (error) => {
          this.snackbarService.openSnackBar(error.message, 'error', 4000);
        },
      });
    }
  }
}
