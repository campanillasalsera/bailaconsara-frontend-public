import { Component, Input, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/es';
import { MatCardModule } from '@angular/material/card';
import { PostService } from '../../../services/post.service';
import { CodigoCompartidoService } from '../../../services/snack-bar.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { Router } from '@angular/router';
import { Post } from '../../../interfaces/post';

/**
 * Componente para actualizar un post existente.
 * Permite a los administradores modificar el contenido del post.
 *
 * @export
 * @class UpdatePostFormComponent
 * @typedef {UpdatePostFormComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-update-post-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    EditorModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-Es' },
    provideMomentDateAdapter(),
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  templateUrl: './update-post-form.component.html',
  styleUrl: './update-post-form.component.scss',
})
export class UpdatePostFormComponent implements OnInit {
  /**
   * Indica si el usuario administrador está logueado
   *
   * @type {boolean}
   */
  @Input() adminLogueado: boolean = false;

  /**
   * Indica si se ha subido una imagen.
   *
   * @type {boolean}
   */
  isFile: boolean = false;

  /**
   * Archivo de la imagen portada seleccionada.
   *
   * @type {(File | null)}
   */
  imagenportada: File | null = null;

  /**
   * Vista previa de la imagen seleccionada.
   *
   * @type {(string | ArrayBuffer)}
   */
  previewImage: string | ArrayBuffer = '';

  /**
   * ID del post que se está actualizando.
   *
   * @type {number}
   */
  postId: number = 0;

  /**
   * Objeto que representa el post a actualizar.
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
   * Configuración de TinyMCE (editor de texto enriquecido)
   *
   * @type {{ plugins: string; toolbar: string; menubar: boolean; branding: boolean; height: number; }}
   */
  tinyMceSettings = {
    plugins: 'link table wordcount',
    toolbar:
      'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | indent outdent | link | table | forecolor backcolor | removeformat | wordcount',
    menubar: false,
    branding: false,
    height: 200,
  };

  /**
   * Constructor del componente.
   * @param postService Servicio para gestionar publicaciones.
   * @param snackBarService Servicio para mostrar mensajes en snack bars.
   * @param activatedRoute Servicio para acceder a las rutas activadas.
   * @param authService Servicio para gestionar la autenticación.
   * @param router Servicio para la navegación.
   */
  constructor(
    private postService: PostService,
    private snackBarService: CodigoCompartidoService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
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
    //recoge el parámetro id que recibe en el path
    this.activatedRoute.params.subscribe((params) => {
      //con + convierte el string a number
      this.postId = +params['id'];
    });
    //actualiza el objeto post con el post recibido
    this.postService.getPostById(this.postId).subscribe((post: Post) => {
      this.post = post;
    });
  }

  /**
   * Maneja la selección de un archivo de imagen.
   * @param event Evento de cambio en el input de archivo.
   */
  getFile(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.imagenportada = file;
      this.isFile = true;
      //preview de la imagen seleccionada
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
        this.post.imagenportada = this.previewImage;
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Envía el formulario de actualización del post.
   */
  onSubmit(): void {
    if (this.post.created_at && this.post.created_at._isAMomentObject) {
      // Convertir el objeto Moment a una cadena de fecha en el formato "YYYY-MM-DD"
      this.post.created_at = this.post.created_at.format('YYYY-MM-DD');
    }

    this.postService.updatePost(this.imagenportada, this.post).subscribe({
      next: (response) => {
        this.snackBarService.openSnackBar(response.message, 'success');
        this.snackBarService.snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['/singlePostTemplate', this.postId]);
        });
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.message, 'error');
      },
    });
  }

  /**
   * Cierra el formulario y navega de vuelta a la lista de eventos.
   */
  handleCloseForm(): void {
    this.router.navigate(['/eventos']);
  }
}
