import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SalasBaileService } from '../../../services/salas-baile.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CodigoCompartidoService } from '../../../services/snack-bar.service';

/**
 * Componente para crear una nueva sala de baile.
 * Permite seleccionar días de la semana y géneros musicales asociados.
 *
 * @export
 * @class CreateSalaFormComponent
 * @typedef {CreateSalaFormComponent}
 */
@Component({
  selector: 'app-create-sala-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    CommonModule,
    MatCheckboxModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-sala-form.component.html',
  styleUrl: './create-sala-form.component.scss',
})
export class CreateSalaFormComponent {
  /**
   * Mensaje de error
   *
   * @type {string}
   */
  errorMessage: string = '';

  /**
   * Días de la semana
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
   * Géneros musicales
   *
   * @type {string[]}
   */
  generosMusicales: string[] = ['SALSA', 'BACHATA', 'KIZOMBA'];

  /**
   * Indica si el submenu está abierto
   *
   * @type {boolean}
   */
  openSubmenu: boolean = false;

  /**
   * Array de días seleccionados
   *
   * @type {string[]}
   */
  diasAbiertos: string[] = [];

  /**
   * Formulario para añadir una nueva sala
   *
   * @type {*}
   */
  addSalaForm = new FormGroup({
    nombreSala: new FormControl('', [Validators.required]),
    localidad: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    diasGeneros: new FormArray([]),
  });

  /**
   * Constructor que inyecta el servicio para gestionar las salas de baile,
   * la referencia al diálogo y el servicio para mostrar mensajes emergentes.
   * @param salasBaileService Servicio para gestionar las salas de baile.
   * @param createSalaDialogRef Referencia al diálogo del formulario para crear una sala.
   * @param snackBarService Servicio para mostrar mensajes emergentes.
   */
  constructor(
    private salasBaileService: SalasBaileService,
    private createSalaDialogRef: MatDialogRef<CreateSalaFormComponent>,
    private snackBarService: CodigoCompartidoService
  ) {}

  /**
   * Devuelve un mensaje de error si el control tiene un error de validación.
   * @param control Control de formulario a evaluar.
   * @returns Mensaje de error.
   */
  getErrorMessage(control: FormControl): string {
    return control.hasError('required') ? 'Este campo es obligatorio' : '';
  }

  /**
   * Maneja la selección de un día de la semana.
   * Si se selecciona, añade el día y su grupo de géneros al formulario.
   * Si se deselecciona, lo elimina del formulario.
   * @param event Evento del checkbox.
   * @param dia Día de la semana seleccionado.
   */
  onDaySelected(event: any, dia: string): void {
    //añade el dia con los generos de musica al array diasGeneros si el evento recibido es de
    //que se ha seleccionado, si no, elimina el dia con los generos del array diasGeneros
    const diasGenerosArray: FormArray<any> = this.addSalaForm.get(
      'diasGeneros'
    ) as FormArray;
    if (event.checked) {
      this.diasAbiertos.push(dia);
      diasGenerosArray.push(
        new FormGroup({
          dia: new FormControl(dia),
          generos: new FormArray([]),
        })
      );
    } else {
      this.diasAbiertos = this.diasAbiertos.filter(
        (diaAbierto) => diaAbierto !== dia
      );
      const index: number = diasGenerosArray.controls.findIndex(
        (indexDia) => indexDia.get('dia')?.value === dia
      );
      diasGenerosArray.removeAt(index);
    }
  }

  /**
   * Maneja la selección de un género musical para un día específico.
   * Si se selecciona, añade el género al array correspondiente; si no, lo elimina.
   * @param event Evento del checkbox.
   * @param dia Día de la semana correspondiente.
   * @param genero Género musical seleccionado.
   */
  onGenreSelected(event: any, dia: string, genero: string): void {
    const diasGenerosArray: FormArray<any> = this.addSalaForm.get(
      'diasGeneros'
    ) as FormArray;
    const dayGroup: FormGroup<any> = diasGenerosArray.controls.find(
      (day) => day.get('dia')?.value === dia
    ) as FormGroup;
    const generosArray: FormArray<any> = dayGroup.get('generos') as FormArray;
    //añade el genero musical al array de generos musicales para ese dia si ha sido seleccionado,
    //si no, lo elimina del array
    if (event.checked) {
      generosArray.push(new FormControl(genero));
    } else {
      const index = generosArray.controls.findIndex(
        (indexGenero) => indexGenero.value === genero
      );
      generosArray.removeAt(index);
    }
  }

  /**
   * Llama al servicio para añadir una nueva sala al sistema.
   * Muestra un mensaje de éxito o error según el resultado de la operación.
   */
  handleAddSala(): void {
    if (this.addSalaForm.valid) {
      this.salasBaileService.createSala(this.addSalaForm.value).subscribe({
        next: () => {
          this.snackBarService.openSnackBar(
            'Se ha añadido la sala con Éxito',
            'success'
          );
          this.createSalaDialogRef.close();
        },
        error: (error) => {
          this.snackBarService.openSnackBar(error.message, 'error');
        },
      });
    }
  }

  /**
   * Cierra el formulario de creación de sala.
   */
  handleCloseForm(): void {
    this.createSalaDialogRef.close();
  }
}
