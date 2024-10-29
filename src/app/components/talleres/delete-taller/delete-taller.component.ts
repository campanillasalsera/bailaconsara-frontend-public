import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Taller } from '../../../interfaces/taller';

/**
 * Componente de diálogo para confirmar la eliminación de un taller.
 * Muestra los detalles del taller a eliminar y ofrece opciones de confirmación o cancelación.
 *
 * @export
 * @class DeleteTallerComponent
 * @typedef {DeleteTallerComponent}
 */
@Component({
  selector: 'app-delete-taller',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-taller.component.html',
  styleUrl: './delete-taller.component.scss',
})
export class DeleteTallerComponent {
  /**
   * Constructor del componente DeleteTallerComponent.
   * @param taller Datos del taller que se desea eliminar, inyectados a través de MAT_DIALOG_DATA.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public taller: Taller) {}
}
