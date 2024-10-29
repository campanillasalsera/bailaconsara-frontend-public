import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CodigoCompartidoService } from '../../../services/snack-bar.service';
import { EliminarCuentaDialogComponent } from '../../authentication/eliminar-cuenta-dialog/eliminar-cuenta-dialog.component';
import { SalasBaileService } from '../../../services/salas-baile.service';

/**
 * Componente para eliminar una sala de baile.
 *
 * @export
 * @class DeleteSalaComponent
 * @typedef {DeleteSalaComponent}
 */
@Component({
  selector: 'app-delete-sala',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-sala.component.html',
  styleUrl: './delete-sala.component.scss',
})
export class DeleteSalaComponent {
  /**
   * Constructor del componente que inyecta los servicios necesarios.
   * @param salaService Servicio para gestionar las operaciones de las salas de baile.
   * @param snackBarService Servicio para mostrar notificaciones en pantalla.
   * @param eliminarSalaDialogRef Referencia al diálogo de eliminación.
   * @param salaBaileId ID de la sala de baile que se va a eliminar.
   */
  constructor(
    private salaService: SalasBaileService,
    private snackBarService: CodigoCompartidoService,
    private eliminarSalaDialogRef: MatDialogRef<EliminarCuentaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public salaBaileId: number
  ) {}

  /**
   * Maneja la eliminación de la sala de baile.
   * Envía la ID de la sala al servicio para eliminarla y maneja la respuesta.
   */
  handleEliminarSala(): void {
    //envía la id recibida en el dialogoRef Data al servicio para eliminar la sala
    this.salaService.deleteSala(this.salaBaileId).subscribe({
      next: () => {
        this.snackBarService.openSnackBar(
          '¡La sala ha sido eliminada!',
          'success'
        );
        this.eliminarSalaDialogRef.close();
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.message, 'error');
      },
    });
  }
}
