import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import 'moment/locale/es';
import { TalleresService } from '../../../services/talleres.service';
import { CodigoCompartidoService } from '../../../services/snack-bar.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AuthService } from '../../../services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Taller } from '../../../interfaces/taller';
import { MatCardModule } from '@angular/material/card';
import { AnularAsistenciaComponent } from '../anular-asistencia/anular-asistencia.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteTallerComponent } from '../delete-taller/delete-taller.component';
import { combineLatest } from 'rxjs';

/**
 * Componente para la edición de talleres. Permite modificar la información
 * del taller, gestionar la inscripción de usuarios, y administrar parejas en el taller.
 *
 * @export
 * @class EditTallerComponent
 * @typedef {EditTallerComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-edit-taller',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-Es' },
    provideMomentDateAdapter(),
  ],
  templateUrl: './edit-taller.component.html',
  styleUrl: './edit-taller.component.scss',
})
export class EditTallerComponent implements OnInit {
  /**
   * Indica si el usuario logueado es administrador.
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
   * Id del usuario logueado.
   *
   * @type {number}
   */
  userId: number = 0;

  /**
   * Controla si se muestra la tabla con los asistentes.
   *
   * @type {boolean}
   */
  showTabla: boolean = false;

  /**
   * Columnas de la tabla de asistentes.
   *
   * @type {string[]}
   */
  displayedColumns: string[] = [
    'nombre',
    'apellidos',
    'user_taller_estado',
    'userPartner',
    'telefono',
    'email',
  ];

  /**
   * Datos mostrados en la tabla.
   *
   * @type {*}
   */
  dataSource = new MatTableDataSource();

  /**
   * Controla la visualización de un campo de entrada.
   *
   * @type {boolean}
   */
  showInput: boolean = false;

  /**
   * Controla la visualización del campo para añadir pareja.
   *
   * @type {boolean}
   */
  showInputPareja: boolean = false;

  /**
   * Guarda el email cuando se añade una pareja.
   *
   * @type {string}
   */
  partnerEmail: string = '';

  /**
   * Id del taller.
   *
   * @type {number}
   */
  tallerId: number = 0;

  /**
   * Lista de usuarios registrados en el taller.
   *
   * @type {any[]}
   */
  usersTaller: any[] = [];

  /**
   *  Indica si se muestra el indicador de carga.
   *
   * @type {boolean}
   */
  isLoading: boolean = false;

  /**
   * Indica si el usuario está inscrito en el taller.
   *
   * @type {boolean}
   */
  isUserSignedUp: boolean = false;

  /**
   * Indica si el usuario tiene una pareja registrada en el taller.
   *
   * @type {boolean}
   */
  isUserHasPartner: boolean = false;

  /**
   * Indica si el formulario del taller es editable.
   *
   * @type {boolean}
   */
  isNotEditable: boolean = true;

  /**
   * Información del taller.
   *
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
   * Inyección de MatDialog para gestionar los diálogos de confirmación.
   *
   * @readonly
   * @type {*}
   */
  readonly dialog = inject(MatDialog);

  /**
   * Constructor del componente
   *
   * @param tallerService
   * @param snackBarService
   * @param authService
   * @param activatedRoute
   * @param router
   */
  constructor(
    private tallerService: TalleresService,
    private snackBarService: CodigoCompartidoService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Inicializa el componente, cargando el perfil de usuario y datos del taller.
   */
  ngOnInit(): void {
    //si el usuario logueado es administrador, por ende también es usuario
    this.authService.adminLogueado$.subscribe((state) => {
      this.adminLogueado = state;
      this.userLogueado = state;
    });

    //array de observables para usar con combineLatest
    const sources = [
      this.authService.getUserProfile(),
      this.activatedRoute.params,
    ];

    //uso combineLatest para combinar las suscripciones antes de continuar
    combineLatest(sources).subscribe(([userProfile, params]) => {
      this.userId = userProfile?.id;
      //recoge el parámetro del path
      this.tallerId = +params['id'];

      //coge los datos del taller
      this.tallerService.getTallerById(this.tallerId).subscribe((taller) => {
        this.taller = taller;

        //comprueba si el usuario está inscrito y si tiene pareja
        this.tallerService
          .isUserSuscribed(this.tallerId, this.userId)
          .subscribe((value) => (this.taller.isSignedUp = value));
        this.tallerService
          .isUserHasAPartner(this.tallerId, this.userId)
          .subscribe((value) => (this.taller.hasPartner = value));
      });
    });

    //actualiza la variable si el usuario está logueado
    this.authService.userLogueado$.subscribe(
      (value) => (this.userLogueado = value)
    );
  }

  /**
   * Actualiza la información del taller.
   */
  handleUpdateTaller(): void {
    //activa el spinner-progress mientras se recibe la respuesta
    this.isLoading = true;

    //actualiza la fecha para que no cambie el día al transformarla en Date
    let fecha: string = this.taller.fecha;
    const fechaDate = new Date(fecha);
    // Ajustar la fecha a la zona horaria local sin cambiar la hora
    const adjustedDate = new Date(
      fechaDate.getTime() - fechaDate.getTimezoneOffset() * 60000
    );
    const formattedDate = adjustedDate.toISOString().split('T')[0];

    //enviamos un taller sin las variables isSignedUp y hasPartner, pues el back no sabe que hacer con ellas
    let tallerDto: Taller = {
      id: this.taller.id,
      nombre: this.taller.nombre,
      modalidad: this.taller.modalidad,
      profesores: this.taller.profesores,
      fecha: formattedDate,
      hora: this.taller.hora,
      lugar: this.taller.lugar,
    };
    this.tallerService.updateTaller(this.taller.id, tallerDto).subscribe({
      next: (response) => {
        //una vez recibida la respuesta quita el spinner
        this.isLoading = false;
        this.snackBarService.openSnackBar(response.message, 'success');
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.message, 'error');
      },
    });
  }

  /**
   * Cierra el formulario y navega a la página de talleres.
   */
  handleCloseForm(): void {
    this.router.navigate(['/talleres']);
  }

  /**
   * Inscribe al usuario logueado en el taller.
   * @param tallerId - Identificador del taller.
   */
  handleSignInTaller(tallerId: number): void {
    //pone is Loading a true, para que muestre el spinner mientras se espera a la respuesta
    this.isLoading = true;
    this.tallerService.signInUserTaller(tallerId, this.userId).subscribe({
      next: (response) => {
        this.userHasPartner(tallerId, this.userId);
        //Una vez recibida la respuesta quita el spinner
        this.isLoading = false;
        this.snackBarService.openSnackBar(response.message, 'success', 5000);
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.message, 'error', 3000);
        this.isLoading = false;
      },
    });
  }

  /**
   * Anula la inscripción del usuario logueado en el taller.
   * @param tallerId - Identificador del taller.
   * @param userId - Identificador del usuario.
   */
  handleSignOutTaller(tallerId: number, userId: number): void {
    const dialogRef = this.dialog.open(AnularAsistenciaComponent, {
      data: this.taller.nombre,
    });
    //se suscribe al resultaedo del dialogo, si es true, llama al servicio para anular asistencia
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        //pone is Loading a true, para que muestre el spinner mientras se espera a la respuesta
        this.isLoading = true;
        this.tallerService.sigOutTaller(tallerId, userId).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.snackBarService.openSnackBar(
              response.message,
              'success',
              3000
            );
            this.isUserSignedUp = false;
            this.isUserHasPartner = false;
          },
          error: (error) => {
            this.snackBarService.openSnackBar(error.message, 'error', 3000);
            this.isLoading = false;
          },
        });
      }
    });
  }

  /**
   * Añade una pareja al usuario logueado.
   * @param tallerId - Identificador del taller.
   * @param partnerEmail - Email de la pareja a añadir.
   */
  handleAddPartner(tallerId: number, partnerEmail: string): void {
    //pone is Loading a true, para que muestre el spinner mientras se espera a la respuesta
    this.isLoading = true;
    this.tallerService
      .addPartnerTaller(tallerId, this.userId, partnerEmail)
      .subscribe({
        next: (response) => {
          this.snackBarService.openSnackBar(response.message, 'success', 3000);
          this.isLoading = false;
          this.showInput = false;
          this.isUserHasPartner = true;
        },
        error: (error) => {
          this.snackBarService.openSnackBar(error.message, 'error', 3000);
          this.isLoading = false;
        },
      });
  }
  //envía los datos del taller, el usuario y su pareja para que el servicio los inscriba como pareja
  handleSignInCouple(
    tallerId: number,
    userId: number,
    partnerEmail: string
  ): void {
    this.isLoading = true;
    this.tallerService
      .signInCoupleTaller(tallerId, userId, partnerEmail)
      .subscribe({
        next: (response) => {
          this.snackBarService.openSnackBar(response.message, 'success', 3000);
          this.isLoading = false;
          //como ya tiene pareja se oculta el boton añadir pareja
          this.showInputPareja = false;
          this.isUserSignedUp = true;
          this.isUserHasPartner = true;
        },
        error: (error) => {
          this.snackBarService.openSnackBar(error.message, 'error', 3000);
          this.isLoading = false;
        },
      });
  }
  //elimina un taller
  handleDeleteTaller(tallerId: number): void {
    const dialogRef = this.dialog.open(DeleteTallerComponent, {
      data: this.taller,
    });
    //se suscribe al resultaedo del dialogo, si es true, llama al servicio para anular asistencia
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.isLoading = true;
        this.tallerService.deleteTaller(tallerId).subscribe({
          next: (response) => {
            this.snackBarService.openSnackBar(
              response.message,
              'success',
              3000
            );
            this.isLoading = false;
            this.router.navigate(['/talleres']);
          },
          error: (error) => {
            this.snackBarService.openSnackBar(error.message, 'error', 3000);
            this.isLoading = false;
          },
        });
      }
    });
  }
  //muestra una lista de usuarios
  handleListUsersTaller(tallerId: number): void {
    this.tallerService.listUsersTaller(tallerId).subscribe({
      next: (response) => {
        this.usersTaller = response;
        //guarda los datos de los usuarios del taller en la variable dataSource para que la tabla pueda acceder a ellos
        this.dataSource.data = this.usersTaller;
        this.showTabla = !this.showTabla;
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.message, 'error', 3000);
      },
    });
  }
  //obtiene un boleano que indica si el usuario está inscrito o no en el taller
  isUserSuscribed(tallerId: number, userId: number): void {
    this.tallerService.isUserSuscribed(tallerId, userId).subscribe({
      next: (response) => {
        this.isUserSignedUp = response;
      },
    });
  }

  //obtiene un boleano que indica si el usuario tiene o no pareja
  userHasPartner(tallerId: number, userId: number): void {
    this.tallerService.isUserHasAPartner(tallerId, userId).subscribe({
      next: (response) => {
        this.isUserHasPartner = response;
      },
    });
  }

  //filtro de la tabla de listado de usuarios
  applyFilter(event: Event) {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
