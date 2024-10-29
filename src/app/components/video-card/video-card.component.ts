import { Component, Input, OnInit } from '@angular/core';
import { ComponentSizeService } from '../../services/component-size.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Componente que representa una tarjeta de video, permitiendo la
 * visualización de un video a partir de una URL proporcionada.
 *
 * @export
 * @class VideoCardComponent
 * @typedef {VideoCardComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
})
export class VideoCardComponent implements OnInit {
  /**
   * Ancho del iframe del video.
   *
   * @type {number}
   */
  @Input() videoWidth: number = 0;

  /**
   * Alto del iframe del video, calculado dinámicamente.
   *
   * @type {number}
   */
  videoHeight: number = 0;

  /**
   * Porcentaje para calcular el ancho del iframe dependiendo del ancho de la pantalla.
   *
   * @type {number}
   */
  porCiento: number = 0.87;

  /**
   * URL del video recibida desde el componente padre.
   *
   * @type {string}
   */
  @Input() srcVideo: string = '';

  /**
   * URL segura para que Angular no bloquee la visualización del video.
   *
   * @type {SafeResourceUrl}
   */
  trustedUrl: SafeResourceUrl = '';

  /**
   * Constructor del componente.
   * @param componentSizeService Servicio que gestiona el tamaño de los componentes.
   * @param domSanitizer Servicio para sanitizar URLs y evitar problemas de seguridad.
   */
  constructor(
    private componentSizeService: ComponentSizeService,
    private domSanitizer: DomSanitizer
  ) {}

  /**
   * Inicializa el componente, suscribiéndose a los cambios de tamaño
   * y calculando el tamaño del iframe del video.
   */
  ngOnInit(): void {
    this.componentSizeService.videoCardWidth$.subscribe((width) => {
      //cuando el video está en el carrusel de videos envía width=0
      //calcula el 87% del ancho del video card para que queden márgenes a los lados.
      if (this.videoWidth != 0) {
        this.videoWidth = this.videoWidth * this.porCiento;
      } else {
        this.videoWidth = width * this.porCiento;
      }

      //para que no se vean los espacios del holder del video,
      //hay que darle la altura correspondiente.
      //Si le doy 16:9 se ve, así que lo he bajado a 16:8
      this.videoHeight = (this.videoWidth / 16) * 8;

      //convierte la urlOriginal en una url segura
      this.trustedUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.srcVideo
      );
    });
  }
}
