import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

/**
 * Servicio para gestionar las operaciones relacionadas con los posts.
 *
 * @export
 * @class PostService
 * @typedef {PostService}
 */
@Injectable({
  providedIn: 'root',
})
export class PostService {
  /**
   * URL base para las llamadas al servidor.
   *
   * @type {string}
   */
  baseUrl = 'https://bailaconsara-backend.onrender.com/';
  // baseUrl = "http://localhost:8080/";

  /**
   * Variable que guarda todos los valores de los posts y es accesible en toda la aplicación a través de su observable.
   *
   * @type {*}
   */
  postSubject = new BehaviorSubject<any>({
    posts: [],
    newPost: null,
  });

  /**
   * Observable que emite los cambios en los posts.
   *
   * @type {*}
   */
  postSubject$ = this.postSubject.asObservable();

  /**
   * Constructor del servicio.
   * @param http - Instancia de HttpClient para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene los headers con el token del usuario logueado para enviar en la cabecera de las peticiones.
   * @returns HttpHeaders - Headers configurados con el token de autorización.
   */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  /**
   * Recupera todos los posts de la base de datos.
   * @returns Observable<any> - Observable que emite la lista de posts.
   */
  getPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}posts/getPosts`).pipe(
      tap((posts) => {
        const currentState = this.postSubject.value;
        this.postSubject.next({ ...currentState, posts });
      })
    );
  }

  /**
   * Crea un nuevo post.
   * @param imagenportada - La imagen de portada del post.
   * @param post - Los datos del post a crear.
   * @returns Observable<any> - Observable que emite la respuesta del servidor.
   */
  createPost(imagenportada: File, post: any): Observable<any> {
    const headers = this.getHeaders();
    //en el formData espera 2 objetos: la imagen y los datos del post
    const formData = new FormData();
    formData.append('imagenportada', imagenportada);
    formData.append('data', JSON.stringify(post));

    return this.http
      .post(`${this.baseUrl}posts/createPost`, formData, { headers })
      .pipe(
        tap((response: any) => {
          const currentState = this.postSubject.value;
          this.postSubject.next({
            ...currentState,
            posts: [response.data, ...currentState.posts],
          });
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Actualiza un post existente.
   * @param imagenportada - La nueva imagen de portada del post (opcional).
   * @param post - Los datos del post a actualizar.
   * @returns Observable<any> - Observable que emite la respuesta del servidor.
   */
  updatePost(imagenportada: File | null, post: any): Observable<any> {
    const headers = this.getHeaders();
    const formData = new FormData();
    //si hay imagen, se incluye en el formData
    if (imagenportada) {
      formData.append('imagenportada', imagenportada);
    }
    formData.append('data', JSON.stringify(post));

    return this.http
      .put(`${this.baseUrl}posts/updatePost`, formData, { headers })
      .pipe(
        tap((response: any) => {
          const currentState = this.postSubject.value;
          //actualizamos solo el post que coincida con la id del post actualizado, dentro del array de posts
          const updatedPosts = currentState.posts.map((item: any) =>
            item.id === response.data.id ? response.data : item
          );
          this.postSubject.next({ ...currentState, posts: updatedPosts });
        })
      );
  }

  /**
   * Elimina un post por su ID.
   * @param id - El ID del post a eliminar.
   * @returns Observable<any> - Observable que emite la respuesta del servidor.
   */
  deletePost(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .delete(`${this.baseUrl}posts/deletePost/${id}`, { headers })
      .pipe(
        tap(() => {
          const currentState = this.postSubject.value;
          const updatedPosts = currentState.posts.filter(
            (item: any) => item.id !== id
          );
          this.postSubject.next({ ...currentState, posts: updatedPosts });
        })
      );
  }

  /**
   * Recupera un post por su ID.
   * @param id - El ID del post a recuperar.
   * @returns Observable<any> - Observable que emite el post correspondiente.
   */
  getPostById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}posts/getPost/${id}`).pipe(
      tap((post) => {
        const currentState = this.postSubject.value;
        this.postSubject.next({ ...currentState, post });
      })
    );
  }

  /**
   * Recupera un post por su slug.
   * @param slug - El slug del post a recuperar.
   * @returns Observable<any> - Observable que emite el post correspondiente.
   */
  getPostBySlug(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}posts/${slug}`).pipe(
      tap((post) => {
        const currentState = this.postSubject.value;
        this.postSubject.next({ ...currentState, post });
      })
    );
  }

  /**
   * Recupera un post por su título.
   * @param titulo - El título del post a recuperar.
   * @returns Observable<any> - Observable que emite el post correspondiente.
   */
  getPostByTitle(titulo: string): Observable<any> {
    return this.http.get(`${this.baseUrl}posts/post/${titulo}`).pipe(
      tap((post) => {
        const currentState = this.postSubject.value;
        this.postSubject.next({ ...currentState, post });
      })
    );
  }
}
