import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Servicio para gestionar el consentimiento de cookies del usuario.
 *
 * @export
 * @class CookieConsentService
 * @typedef {CookieConsentService}
 */
@Injectable({
  providedIn: 'root',
})
export class CookieConsentService {
  /**
   * Variable que indica si se debe mostrar el aviso de cookies.
   * Se utiliza un BehaviorSubject para mantener el estado actual.
   *
   * @type {*}
   */
  showConsent = new BehaviorSubject<boolean>(true);

  /**
   * Observable que emite el estado de visibilidad del aviso de cookies.
   *
   * @type {*}
   */
  showConsent$ = this.showConsent.asObservable();

  /**
   * Constructor del servicio.
   * Comprueba si el usuario ya ha visto el aviso de cookies y actualiza el estado en consecuencia.
   */
  constructor() {
    // Comprobar si el usuario ya ha visto el aviso de cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent === 'accepted') {
      this.showConsent.next(false);
    }
  }

  /**
   * Método para aceptar el uso de cookies.
   * Almacena la preferencia del usuario y oculta el aviso de cookies.
   */
  acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    this.showConsent.next(false);
  }

  /**
   * Método para rechazar el uso de cookies.
   * Almacena la preferencia del usuario y mantiene visible el aviso de cookies.
   */
  rejectCookies() {
    localStorage.setItem('cookieConsent', 'rejected');
    this.showConsent.next(true);
  }
}
