import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CookieConsentService } from '../../services/cookie-consent.service';
import { PoliticaCookiesComponent } from '../cookies/politica-cookies/politica-cookies.component';

/**
 * Componente de pie de página de la aplicación.
 * Proporciona enlaces y acceso a la política de cookies.
 *
 * @export
 * @class FooterComponent
 * @typedef {FooterComponent}
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatListModule, 
    MatDividerModule,
    MatDialogModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})

export class FooterComponent {
  /**
   * Servicio de diálogo de Angular Material inyectado para abrir modales.
   * @readonly
   */
  readonly dialog = inject(MatDialog);

  /**
   * Constructor del componente FooterComponent.
   * @param {CookieConsentService} cookieConsentService - Servicio para gestionar el consentimiento de cookies.
   */
  constructor(
    private cookieConsentService: CookieConsentService
  ) {}

  /**
   * Abre un diálogo que muestra la política de cookies.
   * Si el usuario acepta la política en el diálogo, se actualiza el estado de consentimiento de cookies.
   */
  openDialogCookiesPolicy(): void {

    const dialogRef = this.dialog.open(PoliticaCookiesComponent);
    //se suscribe al resultaedo del dialogo, si es true, llama al servicio para aceptar cookies
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.cookieConsentService.acceptCookies();
      }
    });
  }
  
}
