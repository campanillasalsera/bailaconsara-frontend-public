import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBarLabel,
  MatSnackBarActions,
  MatSnackBarAction,
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

/**
 * Componente para mostrar un Snackbar personalizado.
 *
 * @export
 * @class SnackBarComponent
 * @typedef {SnackBarComponent}
 */
@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    CommonModule,
  ],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss',
})
export class SnackBarComponent {
  /**
   * Referencia al Snackbar para controlar su comportamiento.
   */
  snackBarRef = inject(MatSnackBarRef);

  /**
   * Crea una instancia del componente SnackBar.
   * @param data Datos que se pasan al Snackbar, incluyendo el tipo de mensaje.
   */
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  /**
   * Devuelve la clase CSS correspondiente según el tipo de mensaje.
   * @returns Clase CSS que se aplicará al Snackbar.
   */
  getClass(): string {
    return this.data.messageType === 'error'
      ? 'error-snackbar'
      : 'custom-snack-bar';
  }
}
