import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CookieConsentService } from '../../../services/cookie-consent.service';
import { BannerVideoComponent } from '../../home-components/banner-video/banner-video.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PoliticaCookiesComponent } from '../politica-cookies/politica-cookies.component';

/**
 * Componente que gestiona el consentimiento de cookies del usuario.
 * Muestra un mensaje de consentimiento y permite al usuario aceptar o rechazar cookies.
 *
 * @export
 * @class CookieConsentComponent
 * @typedef {CookieConsentComponent}
 */
@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    BannerVideoComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsentComponent {
  /**
   * URL del video que se muestra en el popup de consentimiento de cookies.
   *
   * @type {string}
   */
  videoSrc9s: string = 'assets/video/baila-con-sara-9s.mp4';

  /**
   * Indica si se debe mostrar un mensaje después de que el usuario rechaza las cookies.
   *
   * @type {boolean}
   */
  showRejectedMessage: boolean = false;

  /**
   * Referencia al servicio MatDialog para manejar diálogos en la interfaz.
   *
   * @type {MatDialog}
   */
  readonly dialog = inject(MatDialog);

  /**
   * Crea una instancia del componente CookieConsentComponent.
   *
   * @param {CookieConsentService} cookieConsentService - Servicio para gestionar el consentimiento de cookies.
   */
  constructor(private cookieConsentService: CookieConsentService) {}

  /**
   * Llama al servicio de cookies para aceptar las cookies.
   */
  acceptCookies(): void {
    this.cookieConsentService.acceptCookies();
  }

  /**
   * Llama al servicio de cookies para rechazar las cookies y muestra un mensaje de aviso.
   */
  rejectCookies(): void {
    this.cookieConsentService.rejectCookies();
    this.showRejectedMessage = true;
  }

  /**
   * Abre un diálogo con la política de cookies y se suscribe al resultado.
   * Si el usuario acepta, se llama al servicio para aceptar cookies.
   */
  goToCookiesPolicy(): void {
    const dialogRef = this.dialog.open(PoliticaCookiesComponent);
    //se suscribe al resultaedo del dialogo, si es true, llama al servicio para aceptar cookies
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.cookieConsentService.acceptCookies();
      }
    });
  }
}
