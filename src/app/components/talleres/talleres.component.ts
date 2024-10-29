import { Component, Input, OnInit } from '@angular/core';
import { TalleresService } from '../../services/talleres.service';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Taller } from '../../interfaces/taller';
import { Router } from '@angular/router';
import { combineLatest, forkJoin } from 'rxjs';

/**
 * Componente para mostrar y gestionar los talleres. Maneja la visualización de la información de los talleres,
 * el estado de suscripción del usuario y la navegación hacia los formularios de creación y actualización de talleres.
 *
 * @export
 * @class TalleresComponent
 * @typedef {TalleresComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-talleres',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatMenuModule,
  ],
  templateUrl: './talleres.component.html',
  styleUrl: './talleres.component.scss',
})
export class TalleresComponent implements OnInit {
  /**
   * Indica si el usuario logueado es administrador.
   * @type {boolean}
   */
  @Input() adminLogueado: boolean = false;

  /**
   * ID del usuario logueado.
   * @type {number}
   */
  userId: number = 0;

  /**
   * Array que contiene los talleres a mostrar.
   * @type {Taller[]}
   */
  talleres: Taller[] = [];

  /**
   * Información del taller actual.
   * @type {Taller}
   */
  taller: Taller = {
    id: 0,
    nombre: '',
    modalidad: '',
    profesores: '',
    fecha: '',
    hora: '',
    lugar: '',
    isSignedUp: false,
    hasPartner: false,
  };

  /**
   * Constructor del componente, que inyecta los servicios necesarios para gestionar talleres, autenticación y navegación.
   * @param tallerService Servicio para la gestión de talleres.
   * @param authService Servicio de autenticación para verificar el perfil del usuario.
   * @param router Servicio de navegación para redirigir entre vistas.
   */
  constructor(
    private tallerService: TalleresService,
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Inicializa el componente, cargando la lista de talleres y
   * configurando las propiedades relacionadas al perfil del usuario logueado.
   */
  ngOnInit(): void {
    //llama al servicio para que solicite los talleres
    this.listTalleres();

    //array de observables para usar con combineLatest
    const sources = [
      this.authService.getUserProfile(),
      this.tallerService.tallerSubject$,
    ];

    //uso combineLatest para combinar las suscripciones antes de continuar
    combineLatest(sources).subscribe(([userProfile, tallerState]) => {
      this.userId = userProfile?.id;
      if (userProfile.role === 'ADMIN') {
        this.adminLogueado = true;
      }
      this.talleres = tallerState.talleres || [];

      //tras obtener los resultados de user y talleres, comprueba si el usuario está inscrito y si tiene pareja
      this.talleres.forEach((taller) => {
        this.tallerService
          .isUserSuscribed(taller.id, this.userId)
          .subscribe((value) => (taller.isSignedUp = value));
        this.tallerService
          .isUserHasAPartner(taller.id, this.userId)
          .subscribe((value) => (taller.hasPartner = value));
      });
    });
  }

  /**
   * Obtiene la lista de talleres y ajusta el formato de la fecha a DD-MM-YYYY.
   */
  listTalleres(): void {
    this.tallerService.listTalleres().subscribe((talleres) => {
      //cambia el formato de fecha YYYY-MM-DD a DD-MM-YYYY
      for (let index = 0; index < talleres.length; index++) {
        const date = new Date(talleres[index].fecha);
        // Agrega un cero inicial y coge los últimos 2 caracteres
        const day = ('0' + date.getDate()).slice(-2);
        // Los meses son 0-11, así que agregamos 1
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        talleres[index].fecha = `${day}-${month}-${year}`;
      }
    });
  }

  /**
   * Navega al formulario para crear un nuevo taller.
   */
  handleOpenCreateTallerForm(): void {
    this.router.navigate(['/crearTaller']);
  }

  /**
   * Navega al formulario de actualización de un taller específico.
   * @param taller Datos del taller a actualizar.
   */
  handleOpenUpdateTallerForm(taller: Taller): void {
    this.router.navigate(['/updateTaller', taller.id]);
  }
}
