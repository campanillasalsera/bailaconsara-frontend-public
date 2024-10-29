import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { Nivel } from '../../interfaces/nivel';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

/**
 * Componente que muestra los niveles de habilidad y permite seleccionar un nivel para evaluación o contenido.
 *
 * @export
 * @class NivelesComponent
 * @typedef {NivelesComponent}
 */
@Component({
  selector: 'app-niveles',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatTabsModule,
  ],
  templateUrl: './niveles.component.html',
  styleUrl: './niveles.component.scss',
})
export class NivelesComponent {
  /**
   * Color de fondo del componente, se puede personalizar desde el componente padre.
   *
   * @type {string}
   */
  @Input() backgroundColor: string = 'black';

  /**
   * Color del título de los niveles, se puede personalizar desde el componente padre.
   *
   * @type {string}
   */
  @Input() nivelesTitleColor: string = 'black';

  /**
   * Ruta del icono a mostrar, se personaliza desde el componente padre.
   *
   * @type {string}
   */
  @Input() iconNivelesSrc: string = 'assets/img/kizomba-black.png';

  /**
   * Nivel seleccionado por el usuario para el test de aptitud.
   *
   * @type {string}
   */
  nivelSelected: string = '';

  /**
   * Nivel seleccionado por el usuario para visualizar contenido del curso.
   *
   * @type {string}
   */
  contenidoNivelSelected: string = '';

  /**
   * Controla la visibilidad del resultado.
   *
   * @type {boolean}
   */
  mostrarResultado: boolean = false;

  /**
   * Lista de ítems seleccionados por el usuario.
   *
   * @type {string[]}
   */
  itemsList: string[] = [];

  /**
   * Resultado evaluado para mostrar al usuario.
   *
   * @type {string}
   */
  resultado: string = '';

  /**
   * Lista de niveles con sus atributos y requisitos de cada nivel.
   *
   * @type {Nivel[]}
   */
  niveles: Nivel[] = [
    {
      nombre: 'test',
      title: 'POR DETERMINAR',
      number: 0,
      subtitle:
        'Selecciona según tus conocimientos para saber a qué nivel debes acudir:',
      listTest: [
        'Paso básico',
        'Giro derecha',
        'Cross',
        'Cross con giro',
        'Copa',
        'Figuras complejas',
      ],
      listTemario: [],
    },
    {
      nombre: 'principiantes',
      title: 'PRINCIPIANTES',
      number: 1,
      subtitle: 'Nivel de aptitud:',
      listTest: [
        'Deseo aprender',
        'Quiero divertirme',
        'Soy constante',
        'Presto atención',
        'Soy paciente',
      ],
      listTemario: [
        'Básicos de bachata',
        'Básicos de kizomba',
        'Giros pivotados',
        'Cross con giro',
        'Copa',
      ],
    },
    {
      nombre: 'intermedio',
      title: 'INTERMEDIO',
      number: 2,
      subtitle: 'Lo que sé hacer:',
      listTest: [
        'Paso básico',
        'Giros pivotados',
        'Cross',
        'Cross con giro',
        'Copa',
      ],
      listTemario: [
        'Figuras simples',
        'Ondas en Bachata',
        'Contragiros',
        'Cross giro frenado',
        'Figuras con Copa',
      ],
    },
    {
      nombre: 'avanzado',
      title: 'AVANZADO',
      number: 3,
      subtitle: 'Lo que sé hacer:',
      listTest: [
        'Vueltas rápidas',
        'Giros dobles',
        '360',
        'Cross con giro',
        'Copa',
      ],
      listTemario: [
        'Figuras complejas',
        'Corporales en Bachata',
        'Pasos libres',
        'Cross giro frenado',
        '360',
      ],
    },
    {
      nombre: 'kizomba',
      title: 'KIZOMBA',
      number: 4,
      subtitle: 'Nivel de aptitud:',
      listTest: [
        'No tengo ni idea',
        'Tengo nivel medio',
        'Se los pasos básicos',
        'Escucho con atención',
        'Soy paciente',
      ],
      listTemario: [
        'Figuras de kizomba',
        'Figuras de urban-kizz',
        'Técnicas de control del eje',
        'Técnicas para lideres',
        'Técnicas para followers',
      ],
    },
  ];

  /**
   * Activa el resultado basado en los ítems seleccionados y el nivel seleccionado.
   */
  activarResultado(): void {
    const test = this.niveles[0];
    const intermedio = this.niveles[2];
    const avanzado = this.niveles[3];
    const kizomba = this.niveles[4];

    if (this.nivelSelected == 'test') {
      if (this.itemsList.length === 0) {
        this.resultado =
          'No has seleccionado ninguna casilla. El nivel que mejor se adapta a ti es: PRINCIPIANTES';
      } else {
        if (
          !this.itemsList.includes(test.listTest[3]) &&
          !this.itemsList.includes(test.listTest[4]) &&
          !this.itemsList.includes(test.listTest[5])
        ) {
          this.resultado =
            'El nivel que mejor se adapta a ti es: PRINCIPIANTES';
        } else if (
          this.itemsList.includes(test.listTest[3]) &&
          !this.itemsList.includes(test.listTest[4]) &&
          !this.itemsList.includes(test.listTest[5])
        ) {
          this.resultado =
            'El nivel que mejor se adapta a ti es: PRINCIPIANTES.' +
            ' Ahí te enseñaremos la copa, para que puedas asistir al nievel intermedio.';
        } else if (
          this.itemsList.includes(test.listTest[3]) &&
          this.itemsList.includes(test.listTest[4]) &&
          !this.itemsList.includes(test.listTest[5])
        ) {
          this.resultado = 'El nivel que mejor se adapta a ti es: INTERMEDIO';
        } else if (
          this.itemsList.includes(test.listTest[3]) &&
          this.itemsList.includes(test.listTest[4]) &&
          this.itemsList.includes(test.listTest[5])
        ) {
          this.resultado = 'El nivel que mejor se adapta a ti es: AVANZADO';
        } else if (
          this.itemsList.includes(test.listTest[5]) &&
          !this.itemsList.includes(test.listTest[3]) &&
          !this.itemsList.includes(test.listTest[4])
        ) {
          this.resultado =
            'El nivel que mejor se adapta a ti es: AVANZADO' +
            ' Pero habría que evaluar antes si sabes hacer la Copa.';
        } else if (
          this.itemsList.includes(test.listTest[5]) &&
          this.itemsList.includes(test.listTest[4])
        ) {
          this.resultado = 'El nivel que mejor se adapta a ti es: AVANZADO';
        } else if (
          this.itemsList.includes(test.listTest[4]) &&
          !this.itemsList.includes(test.listTest[5])
        ) {
          this.resultado = 'El nivel que mejor se adapta a ti es: INTERMEDIO';
        }
      }
    } else if (this.nivelSelected == 'principiantes') {
      if (this.itemsList.length === 0) {
        this.resultado = 'No has seleccionado ninguna casilla.';
      } else if (this.itemsList.length > 3) {
        this.resultado =
          '¡Genial! Este es tu momento, con esa actitud vas a disfrutar de cada clase y aprenderás a buen ritmo.';
      } else {
        this.resultado =
          'Aprovecha tu motivación para unirte a nuestras clases, donde el aprendizaje y la diversión van de la mano.';
      }
    } else if (this.nivelSelected == 'intermedio') {
      if (this.itemsList.length === 0) {
        this.resultado = 'No has seleccionado ninguna casilla.';
      } else if (
        (this.itemsList.includes(intermedio.listTest[3]) &&
          this.itemsList.includes(intermedio.listTest[4])) ||
        this.itemsList.length === 5
      ) {
        this.resultado =
          '¡Genial! Sabes los pasos necesarios para atender a este nivel.';
      } else {
        this.resultado =
          'El cross con giro es un paso indispensable para poder seguir el ritmo de la clase,' +
          ' y la copa es aconsejable saber hacerla aunque no sea perfecta, pues la trabajamos mucho.' +
          ' Ambos pasos te los enseñamos en el nivel principiantes.';
      }
    } else if (this.nivelSelected == 'avanzado') {
      if (this.itemsList.length === 0) {
        this.resultado = 'No has seleccionado ninguna casilla.';
      } else if (
        (this.itemsList.includes(avanzado.listTest[3]) &&
          this.itemsList.includes(avanzado.listTest[4])) ||
        this.itemsList.length === 5
      ) {
        this.resultado =
          '¡Genial! Sabes los pasos necesarios para atender a este nivel.';
      } else {
        this.resultado =
          'El cross con giro y la copa son pasos indispensables para poder seguir el ritmo de la clase,' +
          ' Ambos pasos te los enseñamos en el nivel principiantes.';
      }
    } else if (this.nivelSelected == 'kizomba') {
      if (this.itemsList.length === 0) {
        this.resultado = 'No has seleccionado ninguna casilla.';
      } else if (this.itemsList.includes(kizomba.listTest[0])) {
        this.resultado =
          'No te preocupes, no es necesario tener conocimientos previos.';
      } else {
        this.resultado =
          'Cada mes empezamos con combinaciones nuevas, si te unes a principios de mes no tendrás problema para ponerte al día.';
      }
    }

    this.mostrarResultado = true;
  }

  /**
   * Cierra y reinicia el resultado mostrado.
   */
  cerrarResultado() {
    this.mostrarResultado = false;
    this.resultado = '';
  }

  /**
   * Añade o elimina un ítem de la lista seleccionada, según su estado.
   * @param item Ítem seleccionado por el usuario.
   */
  pushSelectedItem(item: string): void {
    if (!this.itemsList.includes(item)) {
      this.itemsList.push(item);
    } else {
      this.itemsList = this.itemsList.filter((elemento) => elemento !== item);
    }
  }

  /**
   * Resetea la lista de ítems seleccionados y oculta el resultado.
   */
  resetItemList(): void {
    this.itemsList = [];
    this.cerrarResultado();
  }
}
