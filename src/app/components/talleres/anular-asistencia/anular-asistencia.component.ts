import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/**
 * Componente para anular la asistencia a un taller.
 *
 * @export
 * @class AnularAsistenciaComponent
 * @typedef {AnularAsistenciaComponent}
 */
@Component({
  selector: 'app-anular-asistencia',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './anular-asistencia.component.html',
  styleUrl: './anular-asistencia.component.scss'
})

export class AnularAsistenciaComponent {
  /**
   * Crea una instancia del componente AnularAsistencia.
   * @param tallerNombre Nombre del taller cuya asistencia se va a anular.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public tallerNombre: string,
  ){}


}
