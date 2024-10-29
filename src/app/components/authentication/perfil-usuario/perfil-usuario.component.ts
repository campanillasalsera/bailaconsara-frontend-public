import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { CodigoCompartidoService } from '../../../services/snack-bar.service';
import { EliminarCuentaDialogComponent } from '../eliminar-cuenta-dialog/eliminar-cuenta-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Componente para gestionar el perfil del usuario.
 * Permite ver y editar la información del usuario, así como listar y administrar otros usuarios.
 *
 * @export
 * @class PerfilUsuarioComponent
 * @typedef {PerfilUsuarioComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormField,
    MatLabel,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatRadioModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-Es' },
    provideMomentDateAdapter(),
  ],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.scss',
})
export class PerfilUsuarioComponent implements OnInit {
  /**
   * Indica si el administrador está logueado.
   *
   * @type {boolean}
   */
  @Input() adminLogueado: boolean = false;

  /**
   * Indica si el usuario está logueado.
   *
   * @type {boolean}
   */
  @Input() userLogueado: boolean = false;

  /**
   * Indica si se está cargando un proceso
   *
   * @type {boolean}
   */
  isLoading: boolean = false;

  /**
   * Información del usuario.
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
   * Lista de usuarios.
   *
   * @type {User[]}
   */
  users: User[] = [];

  /**
   * columnas que mostrará la tabla. deben coincidir con el nombre que viene del back
   *
   * @type {string[]}
   */
  displayedColumns: string[] = [
    'nombre',
    'apellidos',
    'fechanacimiento',
    'telefono',
    'email',
    'bailerol',
    'enabled',
    'notLocked',
    'role',
    'seleccionar',
  ];

  /**
   * Fuente de datos para la tabla.
   *
   * @type {*}
   */
  dataSource = new MatTableDataSource();

  /**
   * Indica si el formulario es editable.
   *
   * @type {boolean}
   */
  isNotEditable: boolean = true;

  /**
   * Indica si el usuario tiene el rol de líder.
   *
   * @type {boolean}
   */
  isLider: boolean = false;

  /**
   * Indica si el usuario tiene el rol de seguidor.
   *
   * @type {boolean}
   */
  isFollower: boolean = false;

  /**
   * Indica si se debe mostrar la tabla de usuarios.
   *
   * @type {boolean}
   */
  showTabla: boolean = false;

  /**
   * Crea una instancia del componente PerfilUsuarioComponent.
   *
   * @param authService
   * @param snackBarService
   * @param router
   * @param matDialog
   */
  constructor(
    private authService: AuthService,
    private snackBarService: CodigoCompartidoService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  /**
   *  Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Obtiene el perfil del usuario y su rol.
   */
  ngOnInit(): void {
    //averigua el rol de baile del usuario
    this.authService.getUserProfile().subscribe((user) => {
      const date = new Date(user.fechanacimiento);
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      this.user = user;
      this.user.fechanacimiento = `${day}-${month}-${year}`;
      if (user.bailerol === 'lider') {
        this.isLider = true;
      } else {
        this.isFollower = true;
      }
    });

    //si el el administrador está logueado, también será true que el usuario está logueado
    this.authService.adminLogueado$.subscribe((state) => {
      this.adminLogueado = state;
      this.userLogueado = state;
    });

    this.authService.userLogueado$.subscribe((state) => {
      this.userLogueado = state;
    });
  }

  /**
   * Actualiza la información del usuario.
   *
   * @param {number} userId - ID del usuario a actualizar.
   * @returns {void}
   */
  handleUpdateUser(userId: number): void {
    this.isLoading = true;

    const [day, month, year] = this.user.fechanacimiento.split('-');
    // Convierte a formato YYYY-MM-DD para enviarlo al back
    const formattedDate = `${year}-${month}-${day}`;
    this.user.fechanacimiento = formattedDate;

    this.authService.updateUser(userId, this.user).subscribe({
      next: (response) => {
        //vuelve a convertir la fecha a formato DD-MM-YYYY para mostrar en el front
        const date = new Date(response.fechanacimiento);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        this.user.fechanacimiento = `${day}-${month}-${year}`;

        this.handleCloseForm();
        this.snackBarService.openSnackBar(
          '¡Usuario actualizado con éxito!',
          'success'
        );

        this.isLoading = false;
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.message, 'error');
        this.isLoading = false;
      },
    });
  }

  /**
   * Cierra el formulario de edición.
   *
   * @returns {void}
   */
  handleCloseForm(): void {
    this.isNotEditable = true;
  }

  /**
   * Habilita la edición del usuario.
   *
   * @returns {void}
   */
  handleEditUser(): void {
    this.isNotEditable = false;
  }

  /**
   * Selecciona un usuario para editar.
   *
   * @param {any} usuario - El usuario seleccionado.
   * @returns {void}
   */
  selectUser(usuario: any): void {
    const date = new Date(usuario.fechanacimiento);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    this.user = usuario;
    this.user.fechanacimiento = `${day}-${month}-${year}`;
  }

  /**
   * Aplica un filtro a la tabla de usuarios.
   *
   * @param {Event} event - El evento de entrada del filtro.
   * @returns {void}
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Deshabilita el usuario seleccionado.
   *
   * @returns {void}
   */
  handleDeshabilitarUsuario(): void {
    this.authService.deshabilitarUsuario(this.user.id).subscribe({
      next: (response) => {
        this.snackBarService.openSnackBar(response.message, 'success');
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.message, 'error');
      },
    });
  }

  /**
   * Habilita el usuario seleccionado.
   *
   * @returns {void}
   */
  handleHabilitarUsuario(): void {
    this.authService.habilitarUsuario(this.user.id).subscribe({
      next: (response) => {
        this.snackBarService.openSnackBar(response.message, 'success');
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.message, 'error');
      },
    });
  }

  /**
   * Cambia el rol del usuario seleccionado.
   *
   * @param {number} userId - ID del usuario a actualizar.
   * @param {string} userRole - Nuevo rol del usuario.
   * @returns {void}
   */
  handleChangeUserRole(userId: number, userRole: string): void {
    this.authService.changeUserRole(userId, userRole).subscribe({
      next: (response) => {
        this.snackBarService.openSnackBar(response.message, 'success');
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.message, 'error');
      },
    });
  }

  /**
   * Navega a la página de restablecimiento de contraseña.
   *
   * @param {string} email - El correo electrónico del usuario.
   * @returns {void}
   */
  handleForgotPassword(email: string): void {
    this.router.navigate(['/forgotPassword'], {
      queryParams: { email: email },
    });
  }

  /**
   * Abre un diálogo para eliminar la cuenta del usuario.
   *
   * @returns {void}
   */
  handleEliminarUsuario(): void {
    const dialogData = {
      userId: this.user.id,
      isAdminLogged: this.adminLogueado,
    };
    this.matDialog.open(EliminarCuentaDialogComponent, { data: dialogData });

    this.authService.isUserAccountDeleted$.subscribe((value) => {
      if (value === true) {
        this.user = {
          id: 0,
          nombre: '',
          apellidos: '',
          fechanacimiento: '',
          email: '',
          telefono: '',
          bailerol: '',
          password: '',
        };
      }
    });
  }

  /**
   * Lista todos los usuarios.
   *
   * @returns {void}
   */
  handleListUsers(): void {
    this.authService.listarUsuarios().subscribe({
      next: (response) => {
        this.users = response;
        this.dataSource.data = this.users;
        this.showTabla = !this.showTabla;
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.message, 'error');
      },
    });
  }
}
