import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

/**
 * Componente de diálogo para mostrar una imagen en una ventana emergente.
 * Incluye un botón de cierre para cerrar el diálogo.
 *
 * @export
 * @class ImageDialogComponent
 * @typedef {ImageDialogComponent}
 */
@Component({
  selector: 'app-image-dialog',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './image-dialog.component.html',
  styleUrl: './image-dialog.component.scss',
})
export class ImageDialogComponent {
  /**
   * Constructor que inyecta la referencia del diálogo actual y los datos necesarios para mostrar la imagen.
   * @param dialogRef Referencia del diálogo para controlarlo y cerrarlo.
   * @param data Datos del diálogo que contienen la URL de la imagen (`image`) y el texto alternativo (`imageAlt`).
   */
  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { image: string; imageAlt: string }
  ) {}

  /**
   * Cierra el diálogo actual.
   */
  close() {
    this.dialogRef.close();
  }
}
