import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { CodigoCompartidoService } from '../../../services/snack-bar.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

/**
 * Componente para manejar la eliminación de cuentas de usuario.
 *
 * @export
 * @class EliminarCuentaDialogComponent
 * @typedef {EliminarCuentaDialogComponent}
 */
@Component({
  selector: 'app-eliminar-cuenta-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './eliminar-cuenta-dialog.component.html',
  styleUrl: './eliminar-cuenta-dialog.component.scss',
})
export class EliminarCuentaDialogComponent {
  /**
   * Crea una instancia del componente EliminarCuentaDialogComponent.
   *
   * @param {AuthService} authService - Servicio de autenticación para manejar el login y logout.
   * @param {CodigoCompartidoService} snackBarService - Servicio para mostrar mensajes en la interfaz.
   * @param {MatDialogRef<EliminarCuentaDialogComponent>} dialogRef - Referencia al diálogo para cerrar el componente.
   * @param {Object} dialogData - Datos pasados al diálogo.
   * @param {number} dialogData.userId - ID del usuario cuya cuenta se va a eliminar.
   * @param {boolean} dialogData.isAdminLogged - Indica si el usuario que está realizando la acción es un administrador.
   * @param {Router} router - Servicio de enrutamiento para navegar a diferentes vistas.
   */
  constructor(
    private authService: AuthService,
    private snackBarService: CodigoCompartidoService,
    private dialogRef: MatDialogRef<EliminarCuentaDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dialogData: { userId: number; isAdminLogged: boolean },
    private router: Router
  ) {}

  /**
   * Llama al servicio para eliminar la cuenta del usuario con el ID recibido.
   * Si el usuario no está logueado como administrador, también cierra la sesión.
   * Muestra un mensaje de éxito o error en función del resultado de la operación.
   *
   * @returns {void}
   */
  handleEliminarUsuario(): void {
    if (!this.dialogData.isAdminLogged) {
      this.authService.logout().subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
    this.authService.eliminarUsuario(this.dialogData.userId).subscribe({
      next: () => {
        this.snackBarService.openSnackBar(
          '¡La cuenta ha sido eliminada!',
          'success',
          3000
        );
        this.dialogRef.close();
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.message, 'error', 3000);
      },
    });
  }
}
