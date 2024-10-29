import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SalasBaileService } from '../../services/salas-baile.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateSalaFormComponent } from '../../components/salas/create-sala-form/create-sala-form.component';
import { MatButtonModule } from '@angular/material/button';
import { UpdateSalaFormComponent } from '../../components/salas/update-sala-form/update-sala-form.component';
import { CodigoCompartidoService } from '../../services/snack-bar.service';
import { DeleteSalaComponent } from '../../components/salas/delete-sala/delete-sala.component';

/**
 * Componente que gestiona la visualización y administración de las salas de baile.
 * Permite al usuario seleccionar un día y ver las salas disponibles para ese día.
 *
 * @export
 * @class DondeBailarComponent
 * @typedef {DondeBailarComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-donde-bailar',
  standalone: true,
  templateUrl: './donde-bailar.component.html',
  styleUrl: './donde-bailar.component.scss',
  imports: [
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DondeBailarComponent implements OnInit {
  /**
   * Día seleccionado por defecto, inicializado a 'viernes'.
   *
   * @type {string}
   */
  diaSelected: string = 'viernes';

  /**
   * Lista de salas de baile disponibles.
   *
   * @type {any[]}
   */
  salas: any[] = [];

  /**
   * Indica si el administrador está logueado.
   *
   * @type {boolean}
   */
  @Input() adminLogueado: boolean = false;

  /**
   * Constructor del componente.
   * @param salasBaileService Servicio para gestionar las salas de baile.
   * @param authService Servicio de autenticación.
   * @param dialog Servicio para manejar diálogos.
   * @param snackBarService Servicio para mostrar mensajes.
   */
  constructor(
    public salasBaileService: SalasBaileService,
    public authService: AuthService,
    public dialog: MatDialog,
    public snackBarService: CodigoCompartidoService
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Suscribe a los estados de autenticación y obtiene las salas para el día seleccionado.
   */
  ngOnInit(): void {
    this.authService.getUserProfile();

    this.authService.adminLogueado$.subscribe((state) => {
      this.adminLogueado = state;
    });

    //suscribe salsaSubject del servicio y las mete en salas
    this.getSalas();

    //muestra las salas del día elegido, por defecto el viernes.
    this.handleSelection(this.diaSelected);
  }

  /**
   * Se suscribe al Subject de salas del servicio para obtener la lista de salas.
   */
  getSalas(): void {
    this.salasBaileService.salaSubject$.subscribe((state) => {
      this.salas = state.salas || [];
    });
  }

  /**
   * Observa si el usuario es administrador.
   */
  isUserAdmin(): void {
    this.authService.authSubject$.subscribe();
  }

  /**
   * Envía el día seleccionado para que el servicio haga la petición de las salas para ese día.
   * @param diaSelected Día seleccionado por el usuario.
   */
  handleSelection(diaSelected: string): void {
    this.diaSelected = diaSelected;
    this.salasBaileService.getSalasByDia(this.diaSelected).subscribe();
  }

  /**
   * Abre el formulario para crear una nueva sala.
   * Una vez cerrado el diálogo, vuelve a cargar las salas para el día seleccionado.
   */
  handleOpenCreateSalaForm(): void {
    this.dialog.open(CreateSalaFormComponent);
    //una vez cerrado el dialogo vuelve a cargar las salas para el día seleccionado
    this.dialog.afterAllClosed.subscribe(() =>
      this.handleSelection(this.diaSelected)
    );
  }

  /**
   * Abre el formulario para actualizar una sala existente.
   * @param salaId ID de la sala a actualizar.
   */
  handleOpenUpdateSalaForm(salaId: number): void {
    this.dialog.open(UpdateSalaFormComponent, { data: salaId });
    //una vez cerrado el dialogo vuelve a cargar las salas para el día seleccionado
    this.dialog.afterAllClosed.subscribe(() =>
      this.handleSelection(this.diaSelected)
    );
  }

  /**
   * Abre un diálogo para confirmar la eliminación de una sala.
   * @param salaId ID de la sala a eliminar.
   */
  handleDeleteSala(salaId: number): void {
    this.dialog.open(DeleteSalaComponent, { data: salaId });
    //una vez cerrado el dialogo vuelve a cargar las salas para el día seleccionado
    this.dialog.afterAllClosed.subscribe(() =>
      this.handleSelection(this.diaSelected)
    );
  }
}
