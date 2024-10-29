import { Component, Input, OnInit } from '@angular/core';
import { PostTemplateComponent } from '../../components/posts/post-template/post-template.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Post } from '../../interfaces/post';

/**
 * Componente que muestra una lista de posts.
 *
 * @export
 * @class EventosComponent
 * @typedef {EventosComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-eventos',
  standalone: true,
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss',
  imports: [
    MatProgressSpinnerModule,
    PostTemplateComponent,
    MatIconModule,
    MatButtonModule,
  ],
})
export class EventosComponent implements OnInit {
  /**
   * Lista de posts obtenidos.
   *
   * @type {Post[]}
   */
  posts: Post[] = [];

  /**
   * Indica si el administrador está logueado.
   *
   * @type {boolean}
   */
  @Input() adminlogueado: boolean = false;

  /**
   * Constructor del componente.
   * @param authService Servicio de autenticación.
   * @param postService Servicio para gestionar los posts.
   * @param router Router para navegación entre componentes.
   */
  constructor(
    public authService: AuthService,
    public postService: PostService,
    public router: Router
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene los posts y se suscribe a los cambios en el estado de los posts y el estado de autenticación del administrador.
   */
  ngOnInit(): void {
    //llama al servicio para coger los posts
    this.postService.getPosts().subscribe();
    //se suscribe a postSubject y guarda los posts obtenidos
    this.postService.postSubject$.subscribe((state) => {
      this.posts = state.posts;
    });
    //suscrito a si el administrador está logueado
    this.authService.adminLogueado$.subscribe((state) => {
      this.adminlogueado = state;
    });
  }

  /**
   * Navega al formulario para crear un nuevo post.
   */
  handleOpenCreatePostForm(): void {
    this.router.navigate(['/crearPost']);
  }

  /**
   * Abre el post seleccionado por su ID.
   * @param post Post a abrir.
   */
  handleGetPostById(post: Post): void {
    //envía el id del post por parámetro.
    this.router.navigate(['/singlePostTemplate', post.id]);
  }
}
