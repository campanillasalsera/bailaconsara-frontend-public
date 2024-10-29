import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';

/**
 * Componente para mostrar un efecto de deslizamiento en el texto.
 *
 * @export
 * @class SlantComponent
 * @typedef {SlantComponent}
 */
@Component({
  selector: 'app-slant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slant.component.html',
  styleUrl: './slant.component.scss',
})
export class SlantComponent {
  /**
   * Texto que se mostrará en el primer lado del componente.
   */
  @Input() text1: string = '';

  /**
   * Texto que se mostrará en el segundo lado del componente.
   */
  @Input() text2: string = '';

  /**
   * Color de fondo del componente.
   */
  @Input() backgroundColor: string = 'white';

  /**
   * Color del texto mostrado en el componente.
   */
  @Input() textColor: string = 'red';

  /**
   * Indica si el texto debe deslizarse hacia la derecha.
   */
  isSlideRightin: boolean = false;

  /**
   * Indica si el texto debe deslizarse hacia la izquierda.
   */
  isSlideLeftin: boolean = false;

  /**
   * Indicador para saber si el efecto ya ha sido activado al menos una vez.
   */
  private effectActivated: boolean = false;

  /**
   * Escucha el evento de desplazamiento de la ventana y verifica si el componente está en el viewport.
   * Si está visible, activa los efectos de deslizamiento.
   * @param event Evento de desplazamiento.
   */
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    //Si hay más de un slant hay los mete en un array y
    //aplicamos la lógica a cada uno de los slants
    const slants: NodeListOf<Element> = document.querySelectorAll('.slant');
    let isAnySlantInViewport: boolean = false;

    //Si existen los nodos slant, calcula su posicición al hacer scroll
    //y cuando entre en pantalla llama al evento para que se
    //ejecute el desplazamiento.
    slants.forEach((slant) => {
      const boundingClientRect: DOMRect = slant.getBoundingClientRect();
      if (
        boundingClientRect.top >= 0 &&
        boundingClientRect.bottom <= window.innerHeight
      ) {
        isAnySlantInViewport = true;
      }
    });
    if (isAnySlantInViewport) {
      this.isSlideRightin = true;
      this.isSlideLeftin = true;
      // Una vez activado, establece el indicador para evitar restablecer el efecto
      this.effectActivated = true;
    } // Solo restablece el efecto si aún no ha sido activado
    else if (!isAnySlantInViewport && !this.effectActivated) {
      this.isSlideRightin = false;
      this.isSlideLeftin = false;
    }
  }
}
