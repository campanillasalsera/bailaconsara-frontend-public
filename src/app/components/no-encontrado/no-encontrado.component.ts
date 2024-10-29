import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

/**
 * Componente para la página de error 404 - No Encontrado.
 * Muestra un mensaje indicando que la página solicitada no ha sido encontrada
 * e incluye opciones para navegar de vuelta a la página principal.
 *
 * @export
 * @class NoEncontradoComponent
 * @typedef {NoEncontradoComponent}
 */
@Component({
  selector: 'app-no-encontrado',
  standalone: true,
  imports: [MatIcon, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './no-encontrado.component.html',
  styleUrl: './no-encontrado.component.scss',
})
export class NoEncontradoComponent {}
