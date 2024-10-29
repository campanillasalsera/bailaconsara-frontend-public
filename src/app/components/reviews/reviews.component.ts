import { NgClass, CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Review } from '../../interfaces/review';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

/**
 * Componente para mostrar una lista de reseñas.
 * Permite la navegación entre reseñas y la funcionalidad de deslizamiento automático.
 *
 * @export
 * @class ReviewsComponent
 * @typedef {ReviewsComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    NgClass,
    MatProgressSpinnerModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent implements OnInit {
  /**
   * Array de reseñas a mostrar
   *
   * @type {Array<Review>}
   */
  @Input() reviews: Array<Review> = [];

  /**
   * Indica si se deben mostrar indicadores de navegación
   *
   * @type {boolean}
   */
  @Input() indicadores: boolean = true;

  /**
   * Indica si se deben mostrar controles de navegación
   *
   * @type {boolean}
   */
  @Input() controles: boolean = true;

  /**
   * Indica si el deslizamiento automático está habilitado
   *
   * @type {boolean}
   */
  @Input() autoSlide: boolean = false;

  /**
   * Intervalo de tiempo en milisegundos para el deslizamiento automático
   *
   * @type {number}
   */
  @Input() slideInterval: number = 3000;

  /**
   * Índice de la reseña actualmente seleccionada
   *
   * @type {number}
   */
  selectedIndex: number = 0;

  /**
   * Inicializa el componente.
   * Si el deslizamiento automático está habilitado, inicia la función de deslizamiento.
   */
  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImagenes();
    }
  }

  /**
   * Establece el índice de la reseña seleccionada al hacer clic en un indicador.
   * @param index Índice de la reseña seleccionada.
   */
  selectImagen(index: number): void {
    this.selectedIndex = index;
  }

  /**
   * Navega a la reseña anterior.
   * Si se encuentra en la primera reseña, vuelve a la última.
   */
  irAnterior(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.reviews.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  /**
   * Navega a la siguiente reseña.
   * Si se encuentra en la última reseña, vuelve a la primera.
   */
  irSiguiente(): void {
    if (this.selectedIndex === this.reviews.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  /**
   * Cambia automáticamente la reseña cada `slideInterval` milisegundos.
   */
  autoSlideImagenes(): void {
    setInterval(() => {
      this.irSiguiente();
    }, this.slideInterval);
  }
}
