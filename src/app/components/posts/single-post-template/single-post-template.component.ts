import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Post } from '../../../interfaces/post';
import { AuthService } from '../../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Componente para mostrar un post individual.
 * Permite a los administradores editar el post.
 *
 * @export
 * @class SinglePostTemplateComponent
 * @typedef {SinglePostTemplateComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-single-post-template',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './single-post-template.component.html',
  styleUrl: './single-post-template.component.scss',
})
export class SinglePostTemplateComponent implements OnInit {
  /**
   * Indicador de carga mientras se carga el post
   *
   * @type {boolean}
   */
  isLoading: boolean = false;

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
  post: Post = {
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
   * Contenido HTML marcado como seguro por DomSanitizer.
   *
   * @type {!SafeHtml}
   */
  postInfoContent!: SafeHtml;
  postPrograma1Content!: SafeHtml;
  postPrograma2Content!: SafeHtml;
  postDresscodeContent!: SafeHtml;
  postArtistasContent!: SafeHtml;
  postDjsContent!: SafeHtml;
  postPasesContent!: SafeHtml;

  /**
   * Constructor del componente.
   * @param activatedRoute Servicio para acceder a las rutas activadas.
   * @param postService Servicio para gestionar publicaciones.
   * @param domSanitizer Servicio para sanitizar contenido HTML.
   * @param authService Servicio para gestionar la autenticación.
   * @param router Servicio para la navegación.
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private domSanitizer: DomSanitizer,
    public authService: AuthService,
    private router: Router
  ) {}

  /**
   * Inicializa el componente.
   * Suscribe al estado de autenticación del administrador y carga el post por su ID.
   */
  ngOnInit(): void {
    this.authService.adminLogueado$.subscribe((state) => {
      this.adminLogueado = state;
    });

    this.activatedRoute.params.subscribe((params) => {
      const postId: number = +params['id'];
      this.loadPost(postId);
    });
  }

  /**
   * Carga el post completo a partir de su ID.
   * @param postId ID del post a cargar.
   */
  loadPost(postId: number): void {
    this.isLoading = true;
    this.postService.getPostById(postId).subscribe({
      next: (post) => {
        this.isLoading = false;
        this.post = post;
        //convierte el html de los textos enriquecidos en html seguro para poder renderizarlo
        this.postInfoContent = this.domSanitizer.bypassSecurityTrustHtml(
          this.post.textoinfo
        );
        this.postPrograma1Content = this.domSanitizer.bypassSecurityTrustHtml(
          this.post.textoprograma1
        );
        this.postPrograma2Content = this.domSanitizer.bypassSecurityTrustHtml(
          this.post.textoprograma2
        );
        this.postDresscodeContent = this.domSanitizer.bypassSecurityTrustHtml(
          this.post.textodresscode
        );
        this.postArtistasContent = this.domSanitizer.bypassSecurityTrustHtml(
          this.post.textoartistas
        );
        this.postDjsContent = this.domSanitizer.bypassSecurityTrustHtml(
          this.post.textodjs
        );
        this.postPasesContent = this.domSanitizer.bypassSecurityTrustHtml(
          this.post.textopases
        );
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  /**
   * Abre el formulario para actualizar el post.
   * @param postId ID del post a actualizar.
   */
  handleOpenUpdatePostForm(postId: number): void {
    this.router.navigate(['/updatePost', postId]);
  }

  /**
   * Vuelve a la vista de eventos.
   */
  handleCloseForm(): void {
    this.router.navigate(['/eventos']);
  }
}
