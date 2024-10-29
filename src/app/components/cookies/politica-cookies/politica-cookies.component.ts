import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

/**
 * Componente que muestra la política de cookies de la aplicación.
 * Proporciona información sobre el uso de cookies y política de privacidad y permite al usuario cerrarlo o aceptarlo.
 *
 * @export
 * @class PoliticaCookiesComponent
 * @typedef {PoliticaCookiesComponent}
 */
@Component({
  selector: 'app-politica-cookies',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatListModule, MatButtonModule],
  templateUrl: './politica-cookies.component.html',
  styleUrl: './politica-cookies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoliticaCookiesComponent {
  emailBailaConSara: string = 'bailaconsara@gmail.com';
}
