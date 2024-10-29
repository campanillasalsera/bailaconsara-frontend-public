import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { VideoCardComponent } from '../../video-card/video-card.component';
import { ComponentSizeService } from '../../../services/component-size.service';
import { PostService } from '../../../services/post.service';

/**
 * Componente que muestra una serie de cajas de contenido, incluyendo videos y enlaces de inicio.
 * Ajusta automáticamente la altura del video embebido en función del ancho del componente.
 *
 * @export
 * @class ContentBoxesComponent
 * @typedef {ContentBoxesComponent}
 * @implements {OnInit}
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-content-boxes',
  standalone: true,
  templateUrl: './content-boxes.component.html',
  styleUrl: './content-boxes.component.scss',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    VideoCardComponent,
  ],
})
export class ContentBoxesComponent implements OnInit, AfterViewInit {
  /**
   * ID del post de contenido para principiantes.
   * @type {string}
   */
  principiantesPostId: string = '';

  /**
   * URL del video que se mostrará para las sesiones de la mañana.
   * @type {string}
   * @default "https://www.youtube.com/embed/pqCqk3f4GYY"
   */
  srcVideoMornings: string = 'https://www.youtube.com/embed/pqCqk3f4GYY';

  /**
   * Referencia al elemento con la variable de plantilla `#videoMorningCard`.
   * Se utiliza para acceder a su ancho y ajustar la altura del video.
   * @type {ElementRef}
   */
  @ViewChild('videoMorningCard', { static: false })
  videoMorningCard!: ElementRef;

  /**
   * Almacena el ancho del elemento `videoMorningCard` para ajustar la altura del video.
   * @type {number}
   */
  videoCardWidth: number = 0;

  /**
   * Constructor que inyecta el servicio de tamaño de componentes y el servicio de posts.
   * @param {ComponentSizeService} componentSizeService - Servicio para gestionar el tamaño del componente.
   * @param {PostService} postService - Servicio para obtener el post de contenido.
   */
  constructor(
    public componentSizeService: ComponentSizeService,
    private postService: PostService
  ) {}

  /**
   * Inicializa el componente y obtiene el ID del post de contenido para principiantes.
   */
  ngOnInit(): void {
    this.postService
      .getPostByTitle('Clases iniciales de salsa, bachata y kizomba')
      .subscribe((post) => {
        this.principiantesPostId = post.id;
      });
  }

  /**
   * Método de ciclo de vida que se llama después de que la vista del componente ha sido inicializada.
   * Ajusta la altura del video según el ancho del componente.
   */
  ngAfterViewInit(): void {
    //una vez está establecida el ancho del componente,
    //llama a la función que ajusta la altura del componente
    //hijo
    this.adjustVideoHeigth();
  }

  /**
   * Escucha el evento de cambio de tamaño de la ventana y ajusta la altura del video en consecuencia.
   */
  @HostListener('window:resize')
  onResize(): void {
    this.adjustVideoHeigth();
  }

  /**
   * Ajusta la altura del video en función del ancho del componente `videoMorningCard`.
   * Si el componente `videoMorningCard` está definido, establece el ancho y actualiza el tamaño en el servicio.
   */
  private adjustVideoHeigth(): void {
    if (this.videoMorningCard && this.videoMorningCard.nativeElement) {
      this.videoCardWidth = this.videoMorningCard.nativeElement.offsetWidth;
      this.componentSizeService.setVideoCardWidth(this.videoCardWidth);
    }
  }
}
