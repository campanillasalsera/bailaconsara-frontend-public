import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PostService } from '../../../services/post.service';

/**
 * Componente de pulsadores que representa botones o tarjetas de acceso directo a contenido de baile.
 * Cada pulsador se relaciona con una publicación específica sobre Salsa, Bachata o Kizomba.
 *
 * @export
 * @class PulsadoresComponent
 * @typedef {PulsadoresComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-pulsadores',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './pulsadores.component.html',
  styleUrl: './pulsadores.component.scss',
})
export class PulsadoresComponent implements OnInit {
  /**
   * Identificador de la publicación sobre Salsa.
   *
   * @type {string}
   */
  salsaPostId: string = '';

  /**
   * Identificador de la publicación sobre Bachata.
   *
   * @type {string}
   */
  bachataPostId: string = '';

  /**
   * Identificador de la publicación sobre Kizomba.
   *
   * @type {string}
   */
  kizombaPostId: string = '';

  /**
   * Constructor que inyecta el servicio de publicaciones para obtener los ID de las publicaciones de baile.
   * @param postService Servicio para obtener publicaciones por título.
   */
  constructor(private postService: PostService) {}

  /**
   * Ciclo de vida de inicialización del componente. Obtiene los IDs de publicaciones
   * de Salsa, Bachata y Kizomba llamando al servicio `postService`.
   */
  ngOnInit(): void {
    this.postService.getPostByTitle('SALSA').subscribe((post) => {
      this.salsaPostId = post.id;
    });
    this.postService.getPostByTitle('BACHATA').subscribe((post) => {
      this.bachataPostId = post.id;
    });
    this.postService.getPostByTitle('KIZOMBA').subscribe((post) => {
      this.kizombaPostId = post.id;
    });
  }
}
