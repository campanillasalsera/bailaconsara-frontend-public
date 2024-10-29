import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

/**
 * Componente que representa el área privada de la aplicación.
 * Muestra información y funcionalidades accesibles solo para usuarios autenticados.
 *
 * @export
 * @class AreaPrivadaComponent
 * @typedef {AreaPrivadaComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-area-privada',
  standalone: true,
  imports: [MatIconModule, MatCardModule, RouterLink],
  templateUrl: './area-privada.component.html',
  styleUrl: './area-privada.component.scss',
})
export class AreaPrivadaComponent implements OnInit {
  /**
   * Indica si el usuario autenticado es administrador.
   *
   * @type {boolean}
   */
  @Input() adminLogueado: boolean = false;

  /**
   * Indica si hay un usuario autenticado.
   *
   * @type {boolean}
   */
  @Input() userLogueado: boolean = false;

  /**
   * Constructor del componente.
   * @param authService Servicio de autenticación para gestionar el estado del usuario.
   */
  constructor(public authService: AuthService) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Obtiene el perfil del usuario y suscribe a los estados de autenticación del usuario y administrador.
   */
  ngOnInit(): void {
    this.authService.getUserProfile();

    this.authService.adminLogueado$.subscribe((state) => {
      this.adminLogueado = state;
    });

    this.authService.userLogueado$.subscribe((state) => {
      this.userLogueado = state;
    });
  }
}
