import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { PostService } from '../../../services/post.service';
import { Router } from '@angular/router';
import { Post } from '../../../interfaces/post';
import { DeletePostComponent } from '../delete-post/delete-post.component';

/**
 * Componente para mostrar un post en la interfaz de usuario.
 * Permite a los administradores actualizar o eliminar posts.
 *
 * @export
 * @class PostTemplateComponent
 * @typedef {PostTemplateComponent}
 */
@Component({
  selector: 'app-post-template',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './post-template.component.html',
  styleUrl: './post-template.component.scss',
})
export class PostTemplateComponent {
  /**
   * Indica si el usuario es un administrador.
   *
   * @type {boolean}
   */
  @Input() adminLogueado: boolean = false;

  /**
   * Post a mostrar en el componente.
   *
   * @type {Post}
   */
  @Input() post: Post = {
    id: 0,
    title: '',
    textoinfo: '',
    textoprograma1: '',
    textoprograma2: '',
    textodresscode: '',
    textoartistas: '',
    textodjs: '',
    textopases: '',
    created_at: '',
    fraseclave: '',
    tituloseo: '',
    slug: '',
    metadescripcion: '',
    altportada: '',
    imagenportada: '',
  };

  /**
   * Constructor del componente.
   * @param dialog Servicio para manejar diálogos.
   * @param authService Servicio para gestionar la autenticación.
   * @param postService Servicio para gestionar publicaciones.
   * @param router Servicio para la navegación.
   */
  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    public postService: PostService,
    private router: Router
  ) {}

  /**
   * Inicializa el componente.
   * Suscribe al estado de autenticación del administrador.
   */
  ngOnInit(): void {
    this.authService.adminLogueado$.subscribe((state) => {
      this.adminLogueado = state;
    });
  }

  /**
   * Abre el formulario para actualizar un post.
   * @param postId ID del post a actualizar.
   */
  handleOpenUpdatePostForm(postId: number): void {
    this.router.navigate(['/updatePost', postId]);
  }

  /**
   * Abre un diálogo para confirmar la eliminación del post.
   * @param postId ID del post a eliminar.
   */
  handleDeletePost(postId: number): void {
    this.dialog.open(DeletePostComponent, { data: postId });
    //una vez cerrado el dialogo vuelve a cargar los posts
    this.dialog.afterAllClosed.subscribe(() =>
      this.postService.getPosts().subscribe()
    );
  }
}
