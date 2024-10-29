import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SalasBaileService } from '../../../services/salas-baile.service';
import { CodigoCompartidoService } from '../../../services/snack-bar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Sala } from '../../../interfaces/sala';

/**
 * Componente para actualizar la información de una sala de baile.
 *
 * @export
 * @class UpdateSalaFormComponent
 * @typedef {UpdateSalaFormComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-update-sala-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: './update-sala-form.component.html',
  styleUrl: './update-sala-form.component.scss',
})
export class UpdateSalaFormComponent implements OnInit {
  /**
   * Datos de la sala seleccionada para actualizar o borrar
   *
   * @type {Sala}
   */
  sala: Sala = {
    nombreSala: '',
    localidad: '',
    address: '',
    diasGeneros: [
      {
        dia: '',
        generos: [],
      },
    ],
  };

  /**
   * ID de la sala que se está actualizando.
   *
   * @type {number}
   */
  salaId: number = 0;

  /**
   * Días de la semana disponibles.
   *
   * @type {string[]}
   */
  diasSemana: string[] = [
    'LUNES',
    'MARTES',
    'MIERCOLES',
    'JUEVES',
    'VIERNES',
    'SABADO',
    'DOMINGO',
  ];

  /**
   * Días de la semana que están abiertos.
   *
   * @type {string[]}
   */
  diasAbiertos: string[] = [];

  /**
   * Géneros musicales disponibles.
   *
   * @type {string[]}
   */
  generosMusicales: string[] = ['SALSA', 'BACHATA', 'KIZOMBA'];

  /**
   * Constructor del componente que inyecta los servicios necesarios.
   * @param salasBaileService Servicio para gestionar las operaciones de las salas de baile.
   * @param dialogRef Referencia al diálogo de actualización.
   * @param snackBarService Servicio para mostrar notificaciones en pantalla.
   * @param salaData Datos de la sala a actualizar.
   */
  constructor(
    private salasBaileService: SalasBaileService,
    private dialogRef: MatDialogRef<UpdateSalaFormComponent>,
    private snackBarService: CodigoCompartidoService,
    @Inject(MAT_DIALOG_DATA) public salaData: any
  ) {}

  /**
   * Método de ciclo de vida que se ejecuta al inicializar el componente.
   * Obtiene el ID de la sala desde los datos inyectados y carga la información de la sala.
   */
  ngOnInit(): void {
    this.salaId = this.salaData;
    this.getSalaData(this.salaId);
  }

  /**
   * Cierra el formulario de actualización.
   */
  handleCloseForm(): void {
    this.dialogRef.close();
  }

  /**
   * Obtiene los datos de la sala por su ID.
   * @param salaId ID de la sala a obtener.
   */
  getSalaData(salaId: number): void {
    this.salasBaileService.getSalaById(salaId).subscribe({
      next: (response) => {
        this.sala = response;
      },
    });
  }

  /**
   * Devuelve true si el día ha sido seleccionado.
   * @param dia Día a verificar.
   * @returns Verdadero si el día está seleccionado, falso en caso contrario.
   */
  isDaySelected(dia: string): boolean {
    return this.sala.diasGeneros.some((d: { dia: string }) => d.dia === dia);
  }

  /**
   * Devuelve true si el género musical ha sido seleccionado.
   * @param dia Día al que pertenece el género musical.
   * @param generoMusical Género musical a verificar.
   * @returns Verdadero si el género está seleccionado, falso en caso contrario.
   */
  isGenreSelected(dia: string, generoMusical: string): boolean {
    const diaGenero = this.sala.diasGeneros.find(
      (d: { dia: string }) => d.dia === dia
    );
    return diaGenero ? diaGenero.generos.includes(generoMusical) : false;
  }

  /**
   * Actualiza la sala con la información del formulario.
   */
  onSubmit(): void {
    this.salasBaileService.updateSala(this.salaId, this.sala).subscribe({
      next: (response) => {
        this.snackBarService.openSnackBar(
          '¡Sala actualizada con éxito!',
          'success'
        );
        this.dialogRef.close(response);
      },
      error: () => {
        this.snackBarService.openSnackBar(
          '¡Ups... Ha ocurrido un error!',
          'error'
        );
      },
    });
  }

  /**
   * Maneja la selección de un día.
   * @param event Evento de selección.
   * @param dia Día que se está seleccionando.
   */
  onDaySelected(event: any, dia: string): void {
    if (event.checked) {
      this.sala.diasGeneros.push({ dia, generos: [] });
    } else {
      const index = this.sala.diasGeneros.findIndex(
        (d: { dia: string }) => d.dia === dia
      );
      if (index !== -1) {
        this.sala.diasGeneros.splice(index, 1);
      }
    }
  }

  /**
   * Maneja la selección de un género musical.
   * @param event Evento de selección.
   * @param dia Día al que pertenece el género musical.
   * @param generoMusical Género musical que se está seleccionando.
   */
  onGenreSelected(event: any, dia: string, generoMusical: string): void {
    const diaGenero = this.sala.diasGeneros.find(
      (d: { dia: string }) => d.dia === dia
    );
    if (diaGenero) {
      if (event.checked) {
        if (!diaGenero.generos.includes(generoMusical)) {
          diaGenero.generos.push(generoMusical);
        }
      } else {
        const index = diaGenero.generos.indexOf(generoMusical);
        if (index !== -1) {
          diaGenero.generos.splice(index, 1);
        }
      }
    }
  }
}
