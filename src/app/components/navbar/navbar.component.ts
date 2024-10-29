import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

/**
 * Componente de barra de navegación que muestra el estado de autenticación del usuario
 * y permite iniciar o cerrar sesión.
 *
 * @export
 * @class NavbarComponent
 * @typedef {NavbarComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  /**
   * Estado de sesión del usuario.
   *
   * @type {boolean}
   */
  userLogged: boolean = false;

  /**
   * Estado de sesión del administrador.
   *
   * @type {boolean}
   */
  adminLogged: boolean = false;

  /**
   * Datos del usuario autenticado.
   *
   * @type {User}
   */
  user: User = {
    id: 0,
    nombre: '',
    apellidos: '',
    fechanacimiento: '',
    email: '',
    telefono: '',
    bailerol: '',
    password: '',
  };

  /**
   * Constructor que inyecta el servicio de autenticación y el enrutador.
   * @param authService Servicio de autenticación para gestionar el estado de sesión.
   * @param router Servicio de enrutamiento para navegar entre rutas.
   */
  constructor(public authService: AuthService, private router: Router) {}

  /**
   * Inicializa el componente y suscriptores para los estados de autenticación de usuario y administrador.
   */
  ngOnInit(): void {
    this.authService.authSubject$.subscribe((auth) => {
      this.user = auth.user;
    });

    this.authService.adminLogueado$.subscribe((state) => {
      this.adminLogged = state;
    });
    this.authService.userLogueado$.subscribe((state) => {
      this.userLogged = state;
    });
  }

  /**
   * Navega a la página de autenticación para iniciar sesión.
   */
  handleLogin(): void {
    this.router.navigate(['/auth']);
  }

  /**
   * Cierra la sesión del usuario, borra el almacenamiento local y redirige a la página de inicio.
   */
  handleLogout(): void {
    this.authService.logout().subscribe(() => {
      this.authService.setUserLogueado(false);
      localStorage.clear();
      this.router.navigate(['/home']);
    });
  }
}
