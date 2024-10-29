import { Component } from '@angular/core';
import { Imagen } from '../../../interfaces/imagen';
import { MatCardModule } from '@angular/material/card';
import { CarouselComponent } from '../../carousel/carousel.component';

/**
 * Componente de galería de la página de inicio, que incluye carruseles de imágenes
 * para mostrar fotos de clases y horarios.
 *
 * @export
 * @class HomeGaleryComponent
 * @typedef {HomeGaleryComponent}
 */
@Component({
  selector: 'app-home-galery',
  standalone: true,
  templateUrl: './home-galery.component.html',
  styleUrl: './home-galery.component.scss',
  imports: [MatCardModule, CarouselComponent],
})
export class HomeGaleryComponent {
  /**
   * Imágenes para el carrusel de la galería, que muestra diferentes fotos de clases.
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

  /**
   * Imágenes para el carrusel de horarios, que muestra el horario de clases actual.
   * @type {Array<Imagen>}
   */
  imagenesHorarios: Array<Imagen> = [
    {
      imgSrc: 'assets/img/Horario-2023-2024.jpg',
      imgAlt: 'Clases de salsa en Torremolinos',
    },
  ];
}
