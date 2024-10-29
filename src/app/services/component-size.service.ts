import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Servicio para gestionar el tamaño de los componentes, específicamente el ancho de la tarjeta de video.
 *
 * @export
 * @class ComponentSizeService
 * @typedef {ComponentSizeService}
 */
@Injectable({
  providedIn: 'root',
})
export class ComponentSizeService {
  /**
   * Variable compartida que almacena el ancho de la tarjeta de video.
   *
   * @private
   * @type {*}
   */
  private videoCardWidthSource = new BehaviorSubject<number>(0);

  /**
   * Observable que emite el ancho de la tarjeta de video para que otros componentes puedan suscribirse a él.
   *
   * @type {*}
   */
  videoCardWidth$ = this.videoCardWidthSource.asObservable();

  /**
   * Actualiza el ancho de la tarjeta de video y emite el nuevo valor.
   * @param width Nuevo ancho de la tarjeta de video.
   */
  setVideoCardWidth(width: number): void {
    this.videoCardWidthSource.next(width);
  }
}
