import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { SlantComponent } from '../../components/slant/slant.component';
import { MatListModule } from '@angular/material/list';
import { NivelesComponent } from '../../components/niveles/niveles.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PostService } from '../../services/post.service';

/**
 * Componente que muestra los horarios de clases, niveles y preguntas frecuentes.
 *
 * @export
 * @class HorariosComponent
 * @typedef {HorariosComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-horarios',
  standalone: true,
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.scss',
  imports: [
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatDividerModule,
    RouterLink,
    SlantComponent,
    MatListModule,
    NivelesComponent,
    MatExpansionModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorariosComponent implements OnInit {
  /**
   * Color de fondo del componente Niveles, personalizable.
   *
   * @type {string}
   */
  nivelesBackgroundColor: string = 'black';

  /**
   * Color de las letras del componente Niveles, personalizable.
   *
   * @type {string}
   */
  nivelesTitleColor: string = 'white';

  /**
   * Icono a mostrar en el componente Niveles.
   *
   * @type {string}
   */
  iconNivelesSrc: string = 'assets/img/kizomba.png';

  /**
   * Color de fondo del slant motivador, personalizable.
   *
   * @type {string}
   */
  slantBackgroundColor: string = 'red';

  /**
   * Color de la letra del slant motivador, personalizable.
   *
   * @type {string}
   */
  slantTextColor: string = 'white';

  /**
   * Frases a mostrar en el slant motivador.
   *
   * @type {string}
   */
  slantText1: string = 'NO TE PIERDAS NINGUNA CLASE';
  slantText2: string = 'ELIGE TU NIVEL';
  //maneja el estdo del acordeon
  readonly panelOpenState = signal(false);

  /**
   * Id del post de principiantes.
   *
   * @type {string}
   */
  principiantesPostId: string = '';

  /**
   * Constructor del componente.
   * @param postService Servicio para obtener los posts.
   */
  constructor(private postService: PostService) {}

  /**
   * Método de inicialización del componente.
   * Obtiene el post correspondiente a "Clases iniciales de salsa, bachata y kizomba"
   * y guarda su id en la variable `principiantesPostId`.
   */
  ngOnInit(): void {
    this.postService
      .getPostByTitle('Clases iniciales de salsa, bachata y kizomba')
      .subscribe((post) => {
        this.principiantesPostId = post.id;
      });
  }
}
