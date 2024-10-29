import { Component, Input, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/es';
import { MatCardModule } from '@angular/material/card';
import { PostService } from '../../../services/post.service';
import { CodigoCompartidoService } from '../../../services/snack-bar.service';
import { AuthService } from '../../../services/auth.service';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { Router } from '@angular/router';
import { Post } from '../../../interfaces/post';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Componente para crear un nuevo post.
 * Permite a los administradores ingresar información sobre un evento,
 * incluyendo texto, imagen de portada y detalles adicionales.
 *
 * @export
 * @class CreatePostFormComponent
 * @typedef {CreatePostFormComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-create-post-form',
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
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-Es' },
    provideMomentDateAdapter(),
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  templateUrl: './create-post-form.component.html',
  styleUrl: './create-post-form.component.scss',
})
export class CreatePostFormComponent implements OnInit {
  /**
   * Indicador de carga mientras se envía el formulario
   *
   * @type {boolean}
   */
  isLoading: boolean = false;

  /**
   * Indica si el usuario administrador está logueado
   *
   * @type {boolean}
   */
  @Input() adminLogueado: boolean = false;

  /**
   * Estado para verificar si se ha subido un archivo
   *
   * @type {boolean}
   */
  isFile: boolean = false;

  /**
   * Archivo de imagen de portada
   *
   * @type {!File}
   */
  imagenportada!: File;

  /**
   * Vista previa de la imagen de portada
   *
   * @type {(string | ArrayBuffer)}
   */
  previewImage: string | ArrayBuffer = '';

  /**
   * Datos del post a crear
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
   * Configuración para el editor TinyMCE
   *
   * @type {Object}
   */
  tinyMceSettings: Object = {
    plugins: 'link table textcolor wordcount placeholder',
    toolbar:
      'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | indent outdent | link | table | forecolor backcolor | removeformat | wordcount',
    menubar: false,
    branding: false,
    height: 200,
  };

  /**
   * Formulario para agregar un nuevo post
   *
   * @type {*}
   */
  addPostForm = new FormGroup({
    fraseclave: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    textoinfo: new FormControl('', [Validators.required]),
    textoprograma1: new FormControl(''),
    textoprograma2: new FormControl(''),
    textodresscode: new FormControl(''),
    textoartistas: new FormControl(''),
    textodjs: new FormControl(''),
    textopases: new FormControl(''),
    created_at: new FormControl(''),
    tituloseo: new FormControl('', [Validators.required]),
    slug: new FormControl('', [Validators.required]),
    metadescripcion: new FormControl('', [Validators.required]),
    altportada: new FormControl('', [Validators.required]),
  });

  /**
   * Constructor del componente
   * @param postService Servicio para gestionar publicaciones
   * @param snackBarservice Servicio para mostrar mensajes
   * @param authService Servicio de autenticación
   * @param router Router de Angular para navegación
   */
  constructor(
    private postService: PostService,
    private snackBarservice: CodigoCompartidoService,
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Método de ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe al estado de autenticación del usuario administrador.
   */
  ngOnInit(): void {
    this.authService.adminLogueado$.subscribe((state) => {
      this.adminLogueado = state;
    });
  }

  /**
   * Maneja la selección de un archivo de imagen.
   * @param event Evento de entrada de archivo
   */
  getFile(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.imagenportada = file;
      this.isFile = true;
      const reader: FileReader = new FileReader();
      reader.onload = (event: any) => {
        this.previewImage = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Envía el formulario para crear un nuevo post.
   * Si el formulario es válido y se ha subido una imagen,
   * se llama al servicio para crear el post.
   */
  onSubmit(): void {
    if (this.addPostForm.valid) {
      const post = this.addPostForm.value;
      if (this.post.created_at && this.post.created_at._isAMomentObject) {
        // Convertir el objeto Moment a una cadena de fecha en el formato "YYYY-MM-DD"
        this.post.created_at = this.post.created_at.format('YYYY-MM-DD');
      }

      if (this.isFile) {
        this.isLoading = true;
        this.postService.createPost(this.imagenportada, post).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.snackBarservice.openSnackBar(
              response.message,
              'success',
              3000
            );
            this.router.navigate(['eventos']);
          },
          error: (error) => {
            this.isLoading = false;
            this.snackBarservice.openSnackBar(
              error.error.message,
              'error',
              5000
            );
          },
        });
      } else {
        this.snackBarservice.openSnackBar(
          'Añade una imagen de portada',
          'error'
        );
      }
    }
  }

  /**
   * Cierra el formulario y navega a la página de eventos.
   */
  handleCloseForm(): void {
    this.router.navigate(['/eventos']);
  }
}
