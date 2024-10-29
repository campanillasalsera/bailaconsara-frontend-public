import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { MatCardModule } from '@angular/material/card';
import { VideoCardComponent } from '../../components/video-card/video-card.component';
import { VideoCarruselComponent } from '../../components/video-carrusel/video-carrusel.component';
import { Imagen } from '../../interfaces/imagen';
import { Video } from '../../interfaces/video';

/**
 * Componente que muestra una galería de videos e imágenes.
 *
 * @export
 * @class GaleriaComponent
 * @typedef {GaleriaComponent}
 */
@Component({
  selector: 'app-galeria',
  standalone: true,
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss',
  imports: [
    MatIconModule,
    MatCardModule,
    CarouselComponent,
    VideoCardComponent,
    VideoCarruselComponent,
  ],
})
export class GaleriaComponent {
  /**
   * Array de videos a mostrar en el carrusel.
   *
   * @type {Array<Video>}
   */
  videosCarrusel: Array<Video> = [
    {
      imgSrc: 'assets/img/videoCarrusel-1.jpg',
      srcVideo: 'https://www.youtube.com/embed/Zp9u3yHEXOg',
      imgAlt: 'Clases de salsa en Torremolinos',
      descripcion: 'Taller de Timba, con Ángel Rodríguez y Sara Fernández',
    },
    {
      imgSrc: 'assets/img/videoCarrusel-2.jpg',
      srcVideo: 'https://www.youtube.com/embed/B2q6Cux4LRI',
      imgAlt: 'Clases de salsa en Torremolinos',
      descripcion: 'Taller de Salsa, con Dani Segado y Sara Fernández',
    },
    {
      imgSrc: 'assets/img/videoCarrusel-3.jpg',
      srcVideo: 'https://www.youtube.com/embed/oWEwOzpSKCM',
      imgAlt: 'Clases de salsa en Torremolinos',
      descripcion:
        'Clases de kizomba en Málaga Temptation Festival, con Marina de Ayala y Sara Fernández',
    },
    {
      imgSrc: 'assets/img/videoCarrusel-4.jpg',
      srcVideo: 'https://www.youtube.com/embed/jrah3wd_0BY',
      imgAlt: 'Clases de salsa en Torremolinos',
      descripcion: 'Taller Intensivo Salsa Lady Style, con Sara Fernández',
    },
    {
      imgSrc: 'assets/img/videoCarrusel-5.jpg',
      srcVideo: 'https://www.youtube.com/embed/DfpJ9z1ncCY',
      imgAlt: 'Clases de salsa en Torremolinos',
      descripcion: 'Intensivo de Chachachá, con Dani Segado y Sara Fernández',
    },
    {
      imgSrc: 'assets/img/videoCarrusel-6.jpg',
      srcVideo: 'https://www.youtube.com/embed/hfMXEUdCrMo',
      imgAlt: 'Clases de salsa en Torremolinos',
      descripcion:
        'Clases de Kizomba Lady Style, con Sandra Molina y Sara Fernández',
    },
    {
      imgSrc: 'assets/img/videoCarrusel-7.jpg',
      srcVideo: 'https://www.youtube.com/embed/U7vNXlJ76W4',
      imgAlt: 'Clases de salsa en Torremolinos',
      descripcion: 'Intensivo de Salsa, con Jimmy Rosales y Sara Fernández',
    },
    {
      imgSrc: 'assets/img/videoCarrusel-8.jpg',
      srcVideo: 'https://www.youtube.com/embed/dHJJrRXGCfI',
      imgAlt: 'Clases de salsa en Torremolinos',
      descripcion:
        'Clases de Kizomba en Málaga Sobre Todo Bachata, con Estrella Vogelin y  Sara Fernández',
    },
    {
      imgSrc: 'assets/img/videoCarrusel-9.jpg',
      srcVideo: 'https://www.youtube.com/embed/gsb7hach5GU',
      imgAlt: 'Clases de salsa en Torremolinos',
      descripcion: 'Intensivo de Salsa, con Dani Segado y Sara Fernández',
    },
  ];

  /**
   * Array de imágenes a mostrar en el carrusel.
   *
   * @type {Array<Imagen>}
   */
  imagenesCarrusel: Array<Imagen> = [
    {
      imgSrc: 'assets/img/Carrusel1.jpg',
      imgAlt: 'Clases de salsa en Torremolinos',
    },
    {
      imgSrc: 'assets/img/Carrusel2.jpg',
      imgAlt: 'Clases de salsa en Torremolinos',
    },
    {
      imgSrc: 'assets/img/Carrusel3.jpg',
      imgAlt: 'Clases de salsa en Torremolinos',
    },
    {
      imgSrc: 'assets/img/Carrusel4.jpg',
      imgAlt: 'Clases de salsa en Torremolinos',
    },
    {
      imgSrc: 'assets/img/Carrusel5.jpg',
      imgAlt: 'Clases de salsa en Torremolinos',
    },
    {
      imgSrc: 'assets/img/Carrusel6.jpg',
      imgAlt: 'Clases de salsa en Torremolinos',
    },
    {
      imgSrc: 'assets/img/Carrusel7.jpg',
      imgAlt: 'Clases de salsa en Torremolinos',
    },
    {
      imgSrc: 'assets/img/Carrusel8.jpg',
      imgAlt: 'Clases de salsa en Torremolinos',
    },
  ];
}
