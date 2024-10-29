import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { VideoCardComponent } from '../video-card/video-card.component';

/**
 * Componente para mostrar un video en un diálogo modal.
 * Ajusta el tamaño del video según el ancho de la ventana y permite cerrar el diálogo.
 *
 * @export
 * @class VideoDialogComponent
 * @typedef {VideoDialogComponent}
 */
@Component({
  selector: 'app-video-dialog',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatButtonModule, VideoCardComponent],
  templateUrl: './video-dialog.component.html',
  styleUrl: './video-dialog.component.scss',
})
export class VideoDialogComponent {
  /**
   * Ancho de la ventana del navegador en píxeles.
   *
   * @type {number}
   */
  windowWidth: number = window.innerWidth;

  /**
   * Ancho calculado del video en función del dispositivo y tamaño de la ventana.
   *
   * @type {number}
   */
  videoWidth: number = this.videoWidthCalc();

  /**
   * Constructor del componente.
   * @param dialogRef Referencia al diálogo que permite controlarlo y cerrarlo.
   * @param data Datos inyectados en el diálogo, incluyendo la URL del video y su descripción.
   */
  constructor(
    public dialogRef: MatDialogRef<VideoDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { srcVideo: string; descripcion: string }
  ) {}

  /**
   * Calcula el ancho del video en función del tamaño de la ventana.
   * Ajusta el ancho para diferentes dispositivos y tamaños de pantalla.
   * @returns El ancho adecuado para el video en píxeles.
   */
  videoWidthCalc(): number {
    //movil y tablet
    if (this.windowWidth < 1008) {
      this.videoWidth = this.windowWidth;
    }
    //pc pequeño
    if (this.windowWidth > 1008 && this.windowWidth < 1200) {
      this.videoWidth = this.windowWidth / 1.3;
    }
    //pc mediano
    if (this.windowWidth > 1200 && this.windowWidth < 1400) {
      this.videoWidth = this.windowWidth / 1.5;
    }
    //pc grande
    if (this.windowWidth > 1400) {
      this.videoWidth = this.windowWidth / 1.8;
    }
    return this.videoWidth;
  }

  /**
   * Cierra el diálogo actual.
   */
  close() {
    this.dialogRef.close();
  }
}
