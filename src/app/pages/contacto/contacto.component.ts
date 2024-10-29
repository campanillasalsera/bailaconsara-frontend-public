import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

/**
 * Componente que representa la sección de contacto de la aplicación.
 * Muestra información de contacto para los usuarios.
 *
 * @export
 * @class ContactoComponent
 * @typedef {ContactoComponent}
 */
@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss',
})
export class ContactoComponent {
  /**
   *  Dirección de correo electrónico de contacto.
   *
   * @type {string}
   */
  email: string = 'bailaconsara@gmail.com';
}
