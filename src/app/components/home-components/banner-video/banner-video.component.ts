import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Componente que muestra un video en banner.
 * Ajusta el video para dispositivos móviles y establece una URL de video segura.
 *
 * @export
 * @class BannerVideoComponent
 * @typedef {BannerVideoComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-banner-video',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './banner-video.component.html',
  styleUrl: './banner-video.component.scss',
})
export class BannerVideoComponent implements OnInit {
  /**
   * URL de origen del video a mostrar en el banner.
   * @type {string}
   * @default "assets/video/Baila-Con-Sara-32sg.mp4"
   */
  @Input() videoSrc: string = 'assets/video/Baila-Con-Sara-32sg.mp4';

  /**
   * Controla si se debe aplicar un padding adicional al video.
   * @type {boolean}
   * @default true
   */
  @Input() applyPadding = true;

  /**
   * Indica si el navegador en uso es Safari.
   * @type {boolean}
   */
  isSafari: boolean = false;

  /**
   * Ancho del video basado en el ancho de la ventana.
   * @type {number}
   */
  videoWidth: number = window.innerWidth;

  /**
   * Altura del video calculada en función del ancho para mantener una relación de aspecto 16:8.
   * @type {number}
   */
  videoHeight: number = (this.videoWidth / 16) * 8;

  /**
   * URL segura del video para su visualización en un iframe.
   * @type {SafeResourceUrl}
   */
  trustedUrl: SafeResourceUrl = '';

  /**
   * Constructor que inyecta los servicios necesarios para gestionar los puntos de ruptura de la pantalla y la sanitización de URLs.
   * @param {BreakpointObserver} breakpointObserver - Observador de puntos de ruptura para detectar si el dispositivo es móvil.
   * @param {DomSanitizer} domSanitizer - Servicio para sanitizar y asegurar URLs para su inserción en el DOM.
   */
  constructor(
    private breakpointObserver: BreakpointObserver,
    private domSanitizer: DomSanitizer
  ) {
    this.detectBrowser();
  }

  /**
   * Método de inicialización que observa si la pantalla es móvil para ajustar la fuente del video.
   * También genera una URL segura con reproducción automática y sonido desactivado.
   */
  ngOnInit(): void {
    //Observa si la pantalla es movil o no para enviar un video u otro
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (result.matches) {
          // Si es móvil, cambia el videoSrc a la versión móvil
          this.videoSrc = 'assets/video/baila-con-sara-9s.mp4';
        } else {
          // Si no es móvil, usa el video original de mayor duración
          this.videoSrc = 'assets/video/Baila-Con-Sara-32sg.mp4';
        }
      });

    //convierte la urlOriginal en una url segura
    //añado autoplay=1&mute=1 para que el video sea autoplay y no tenga sonido
    this.trustedUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/SAcKZmgdrQM?autoplay=1&mute=1'
    );
  }

  /**
   * Detecta si el navegador es Safari basado en el user-agent.
   * Actualiza la propiedad `isSafari` en consecuencia.
   */
  detectBrowser() {
    const userAgent = window.navigator.userAgent;
    this.isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
  }
}
