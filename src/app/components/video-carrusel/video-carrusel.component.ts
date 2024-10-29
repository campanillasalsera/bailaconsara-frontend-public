import { NgClass, CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentSizeService } from '../../services/component-size.service';
import { Video } from '../../interfaces/video';
import { MatCardModule } from '@angular/material/card';
import { VideoCardComponent } from '../video-card/video-card.component';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Componente que representa un carrusel de videos.
 * Permite ver una lista de videos, desplazarse entre ellos y abrirlos en un diálogo.
 *
 * @export
 * @class VideoCarruselComponent
 * @typedef {VideoCarruselComponent}
 * @implements {OnInit}
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-video-carrusel',
  standalone: true,
  templateUrl: './video-carrusel.component.html',
  styleUrl: './video-carrusel.component.scss',
  imports: [
    NgClass,
    MatProgressSpinnerModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    VideoCardComponent,
    VideoDialogComponent,
  ],
})
export class VideoCarruselComponent implements OnInit, AfterViewInit {
  /**
   * Referencia al elemento del DOM que tiene el identificador #videoCard.
   *
   * @type {!ElementRef}
   */
  @ViewChild('videoCard', { static: false })
  videoCard!: ElementRef;

  /**
   * Lista de videos a mostrar en el carrusel.
   *
   * @type {Array<Video>}
   */
  @Input() videos: Array<Video> = [];

  /**
   * Define si se muestran los indicadores de posición en el carrusel.
   *
   * @type {boolean}
   */
  @Input() indicadores: boolean = true;

  /**
   * Define si se muestran los controles de navegación del carrusel.
   *
   * @type {boolean}
   */
  @Input() controles: boolean = true;

  /**
   * Define si el carrusel avanza automáticamente entre videos.
   *
   * @type {boolean}
   */
  @Input() autoSlide: boolean = false;

  /**
   * Intervalo en milisegundos para el cambio automático de videos en el carrusel.
   *
   * @type {number}
   */
  @Input() slideInterval: number = 0;

  /**
   * Índice del video actualmente seleccionado.
   *
   * @type {number}
   */
  selectedIndex = 0;

  /**
   * URL del video para mostrar como predeterminado en el carrusel.
   *
   * @type {string}
   */
  srcVideoMornings: string = 'https://www.youtube.com/embed/pqCqk3f4GYY';

  /**
   * Ancho del elemento `videoCard`, calculado dinámicamente.
   *
   * @type {number}
   */
  videoCardWidth: number = 0;

  /**
   * Constructor del componente.
   * @param componentSizeService Servicio para gestionar el tamaño de los componentes.
   * @param dialog Servicio de Angular Material para abrir el video en un diálogo modal.
   */
  constructor(
    public componentSizeService: ComponentSizeService,
    public dialog: MatDialog
  ) {}

  /**
   * Inicializa el componente; si `autoSlide` está habilitado, activa el cambio automático de videos.
   */
  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImagenes();
    }
  }

  /**
   * Ajusta la altura del componente de video una vez cargado completamente.
   */
  ngAfterViewInit(): void {
    //una vez está establecida el ancho del componente,
    //llama a la función que ajusta la altura del componente
    //hijo
    this.adjustVideoHeigth();
  }

  /**
   * Ajusta el tamaño del componente cuando la ventana cambia de tamaño.
   */
  @HostListener('window:resize')
  onResize(): void {
    this.adjustVideoHeigth();
  }

  /**
   * Ajusta la altura del video de acuerdo con el ancho del componente `videoCard`,
   * y lo comunica al servicio de tamaño de componentes.
   */
  private adjustVideoHeigth(): void {
    if (this.videoCard && this.videoCard.nativeElement) {
      this.videoCardWidth = this.videoCard.nativeElement.offsetWidth;
      this.componentSizeService.setVideoCardWidth(this.videoCardWidth);
    }
  }

  /**
   * Establece el índice del video seleccionado al hacer clic en el indicador de posición.
   * @param index Índice del video seleccionado.
   */
  selectImagen(index: number): void {
    this.selectedIndex = index;
    const selectedImage = this.videos[this.selectedIndex];
    this.openVideoDialog(selectedImage.srcVideo, selectedImage.descripcion);
  }

  /**
   * Cambia automáticamente el video mostrado en el carrusel según el intervalo especificado.
   */
  autoSlideImagenes(): void {
    setInterval(() => {
      this.irSiguiente();
    }, this.slideInterval);
  }

  /**
   * Abre el video en una ventana de diálogo.
   * @param srcVideo URL del video.
   * @param descripcion Descripción del video.
   */
  openVideoDialog(srcVideo: string, descripcion: string): void {
    this.dialog.open(VideoDialogComponent, {
      data: { srcVideo, descripcion },
    });
  }

  /**
   * Muestra el siguiente video en el carrusel.
   */
  irSiguiente(): void {
    if (this.selectedIndex === this.videos.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  /**
   * Muestra el video anterior en el carrusel.
   */
  irAnterior(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.videos.length - 1;
    } else {
      this.selectedIndex--;
    }
  }
}
