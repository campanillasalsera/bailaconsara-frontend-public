import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { PostService } from '../../../services/post.service';
import { CodigoCompartidoService } from '../../../services/snack-bar.service';
import { EliminarCuentaDialogComponent } from '../../authentication/eliminar-cuenta-dialog/eliminar-cuenta-dialog.component';

/**
 * Componente para confirmar la eliminación de un post.
 * Se utiliza en un diálogo que permite al usuario eliminar un post específico.
 *
 * @export
 * @class DeletePostComponent
 * @typedef {DeletePostComponent}
 */
@Component({
  selector: 'app-delete-post',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-post.component.html',
  styleUrl: './delete-post.component.scss',
})
export class DeletePostComponent {
  /**
   * Constructor del componente
   * @param postService Servicio para gestionar publicaciones
   * @param snackBarService Servicio para mostrar mensajes
   * @param eliminarSalaDialogRef Referencia al diálogo de eliminación
   * @param postId ID del post a eliminar, inyectada a través de MAT_DIALOG_DATA
   */
  constructor(
    private postService: PostService,
    private snackBarService: CodigoCompartidoService,
    private eliminarSalaDialogRef: MatDialogRef<EliminarCuentaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public postId: number
  ) {}

  /**
   * Maneja la eliminación del post.
   * Envía la ID del post al servicio para eliminarlo y gestiona la respuesta.
   */
  handleEliminarPost(): void {
    //envía la id recibida en el dialogoRef Data al servicio para eliminar el post
    this.postService.deletePost(this.postId).subscribe({
      next: (response) => {
        this.snackBarService.openSnackBar(response.message, 'success');
        this.eliminarSalaDialogRef.close();
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.message, 'error');
      },
    });
  }
}
