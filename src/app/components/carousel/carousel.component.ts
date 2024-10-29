import { CommonModule, NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Imagen } from '../../interfaces/imagen';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

/**
 * Componente de carrusel que muestra una serie de imágenes con opciones de control.
 * Permite la navegación entre imágenes y la apertura de una vista ampliada de cada imagen.
 *
 * @export
 * @class CarouselComponent
 * @typedef {CarouselComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  imports: [
    NgClass,
    MatProgressSpinnerModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ImageDialogComponent,
  ],
})
export class CarouselComponent implements OnInit {
  /**
   * Lista de imágenes a mostrar en el carrusel.
   *
   * @type {Array<Imagen>}
   */
  @Input() imagenes: Array<Imagen> = [];

  /**
   * Indica si se deben mostrar los indicadores del carrusel.
   *
   * @type {boolean}
   */
  @Input() indicadores: boolean = true;

  /**
   * Indica si se deben mostrar los controles del carrusel.
   *
   * @type {boolean}
   */
  @Input() controles: boolean = true;

  /**
   * Indica si el carrusel debe avanzar automáticamente.
   *
   * @type {boolean}
   */
  @Input() autoSlide: boolean = false;

  /**
   * Intervalo de tiempo en milisegundos entre cada cambio de imagen.
   *
   * @type {number}
   */
  @Input() slideInterval: number = 3000;

  /**
   * Índice de la imagen actualmente seleccionada.
   *
   * @type {number}
   */
  selectedIndex: number = 0;

  /**
   * Crea una instancia del componente CarouselComponent.
   *
   * @param {MatDialog} dialog - Servicio para abrir diálogos en la interfaz.
   */
  constructor(public dialog: MatDialog) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicia el auto-slide si está habilitado.
   */
  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImagenes();
    }
  }

  /**
   * Establece el índice de la imagen al hacer clic en el indicador.
   *
   * @param {number} index - Índice de la imagen seleccionada.
   */
  selectImagen(index: number): void {
    this.selectedIndex = index;
    const selectedImage = this.imagenes[this.selectedIndex];
    this.openImageDialog(selectedImage.imgSrc, selectedImage.imgAlt);
  }

  /**
   * Navega a la imagen anterior en el carrusel.
   */
  irAnterior(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.imagenes.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  /**
   * Navega a la siguiente imagen en el carrusel.
   */
  irSiguiente(): void {
    if (this.selectedIndex === this.imagenes.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  /**
   * Cambia automáticamente la imagen cada un intervalo especificado.
   */
  autoSlideImagenes(): void {
    setInterval(() => {
      this.irSiguiente();
    }, this.slideInterval);
  }

  /**
   * Abre un diálogo para mostrar la imagen en grande.
   *
   * @param {string} image - URL de la imagen a mostrar.
   * @param {string} alt - Texto alternativo de la imagen.
   */
  openImageDialog(image: string, alt: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: { image, imageAlt: alt },
    });
  }
}
