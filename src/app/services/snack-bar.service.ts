import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

/**
 * Servicio para gestionar la visualización de snack bars en la aplicación.
 *
 * @export
 * @class CodigoCompartidoService
 * @typedef {CodigoCompartidoService}
 */
@Injectable({
  providedIn: 'root',
})
export class CodigoCompartidoService {
  /**
   * Referencia del snackbar que se está mostrando.
   *
   * @type {!MatSnackBarRef<any>}
   */
  snackBarRef!: MatSnackBarRef<any>;

  /**
   * Constructor del servicio.
   * @param _snackBar - Instancia de MatSnackBar para mostrar los mensajes.
   */
  constructor(private _snackBar: MatSnackBar) {}

  /**
   * Muestra un snack-bar con un mensaje que puede ser de éxito o de error.
   * @param message - El mensaje que se mostrará en el snack-bar.
   * @param messageType - Tipo de mensaje, puede ser 'success' o 'error'.
   * @param duration - Duración en milisegundos para la que se mostrará el snack-bar (opcional).
   * @returns MatSnackBarRef<SnackBarComponent> - Referencia al snack-bar mostrado.
   */
  openSnackBar(
    message: string,
    messageType: 'success' | 'error',
    duration?: number
  ): MatSnackBarRef<SnackBarComponent> {
    if (!this._snackBar._openedSnackBarRef) {
      this.snackBarRef = this._snackBar.openFromComponent(SnackBarComponent, {
        data: { message, messageType },
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: duration,
      });
    }
    return this.snackBarRef;
  }
}
