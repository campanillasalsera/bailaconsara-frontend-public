import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Taller } from '../interfaces/taller';

/**
 * Servicio para gestionar talleres en la aplicación.
 *
 * @export
 * @class TalleresService
 * @typedef {TalleresService}
 */
@Injectable({
  providedIn: 'root'
})

export class TalleresService {

  /**
   * URL base para las llamadas al servidor
   *
   * @type {string}
   */
  baseUrl = "https://bailaconsara-backend.onrender.com/";
  // baseUrl = "http://localhost:8080/";

  /**
   * Almacena información sobre el taller seleccionado.
   *
   * @type {*}
   */
  tallerSubject = new BehaviorSubject <any>({
    nombre: "",
    modalidad: "",
    profesores: "",
    fecha: "",
    hora: "",
    lugar: "",
  });
  
  /**
   * Observable que emite los cambios en los talleres.
   *
   * @type {*}
   */
  tallerSubject$ = this.tallerSubject.asObservable();
  
  /**
   * Constructor del servicio.
   * @param http - Instancia de HttpClient para realizar peticiones HTTP.
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Genera los headers con el token del usuario logueado.
   * @returns HttpHeaders - Headers con el token de autorización.
   */
  private getHeaders(): HttpHeaders{
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    })
  }

  /**
   * Lista los talleres disponibles.
   * @returns Observable<any> - Observable que emite la lista de talleres.
   */
  listTalleres(): Observable<any> {
    return this.http.get(`${this.baseUrl}talleres/user/listTalleres`, {headers: this.getHeaders()})
    .pipe(
      tap((talleres) => {
        const currentState = this.tallerSubject.value;
        this.tallerSubject.next({...currentState, talleres});
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene un taller por su ID.
   * @param tallerId - ID del taller a obtener.
   * @returns Observable<any> - Observable que emite los datos del taller.
   */
  getTallerById(tallerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}talleres/user/getTaller/${tallerId}`, {headers: this.getHeaders()})
    .pipe(
      tap((taller) => {
        const currentState = this.tallerSubject.value;
        this.tallerSubject.next({...currentState, taller})
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Crea un nuevo taller.
   * @param taller - Datos del taller a crear.
   * @returns Observable<any> - Observable que emite la respuesta del servidor.
   */
  createTaller(taller: any): Observable<any> {
    return this.http.post(`${this.baseUrl}talleres/admin/addTaller`, taller, {headers: this.getHeaders()}).pipe(
      tap(),
      catchError(this.handleError)

    );
  }

  /**
   * Inscribe a un usuario en un taller.
   * @param tallerId - ID del taller.
   * @param userId - ID del usuario.
   * @returns Observable<any> - Observable que emite la respuesta del servidor.
   */
  signInUserTaller(tallerId: number, userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}talleres/user/signInTaller/${tallerId}/${userId}`,{}, {headers: this.getHeaders()}).pipe(
      tap(() => {
        this.isUserHasAPartner(tallerId, userId);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Añade una acompañante para el usuario en un taller.
   * @param tallerId - ID del taller.
   * @param userId - ID del usuario.
   * @param partnerEmail - Correo electrónico de la pareja.
   * @returns Observable<any> - Observable que emite la respuesta del servidor.
   */
  addPartnerTaller(tallerId: number, userId: number, partnerEmail: string): Observable<any> {
    return this.http.post(`${this.baseUrl}talleres/user/addPartnerTaller/${tallerId}/${userId}/${partnerEmail}`,{}, {headers: this.getHeaders()}).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  /**
   * Anula la inscripción de un usuario a un taller.
   * @param tallerId - ID del taller.
   * @param userId - ID del usuario.
   * @returns Observable<any> - Observable que emite la respuesta del servidor.
   */
  sigOutTaller(tallerId:number, userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}talleres/user/signOutTaller/${tallerId}/${userId}`, {headers: this.getHeaders()}).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  /**
   * Inscribe a una pareja (2 personas) en un taller.
   * @param tallerId - ID del taller.
   * @param userId - ID del usuario.
   * @param partnerEmail - Correo electrónico de la pareja.
   * @returns Observable<any> - Observable que emite la respuesta del servidor.
   */
  signInCoupleTaller(tallerId: number,userId: number, partnerEmail: string): Observable<any> {
    return this.http.post(`${this.baseUrl}talleres/user/signInParejaTaller/${tallerId}/${userId}/${partnerEmail}`,{}, {headers: this.getHeaders()}).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene una lista de todos los usuarios de un taller.
   * @param tallerId - ID del taller.
   * @returns Observable<any> - Observable que emite la lista de usuarios del taller.
   */
  listUsersTaller(tallerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}talleres/admin/listUserTaller/${tallerId}`, {headers: this.getHeaders()}).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  /**
   * Maneja los posibles errores de las respuestas.
   * @param error - Error recibido de la petición HTTP.
   * @returns Observable<never> - Observable que lanza un error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ha ocurrido un error';
  
    // Extrae los mensajes de los errores de backend
    if (error.error && typeof error.error === 'object') {
      // Extrae mensajes de las propiedades del objeto de error
      const errorMessages = Object.values(error.error)
        .filter(value => typeof value === 'string') // Filtra los valores que no sean string
        .join('\n');
      //Si hay errores lanza un error
      if (errorMessages) {
        errorMessage = errorMessages;
        return throwError(() => new Error(errorMessage));
      }
    }
    // Gestión de errores del cliente u otros errores desconocidos
    return throwError(() => new Error(`Error Code: ${error.status}\n${error.message}`));
  }

  /**
   * Elimina un taller.
   * @param tallerId - ID del taller a eliminar.
   * @returns Observable<any> - Observable que emite la respuesta del servidor.
   */
  deleteTaller(tallerId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}talleres/admin/deleteTaller/${tallerId}`, {headers: this.getHeaders()}).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  /**
   * Actualiza un taller.
   * @param tallerId - ID del taller a actualizar.
   * @param taller - Datos actualizados del taller.
   * @returns Observable<any> - Observable que emite la respuesta del servidor.
   */
  updateTaller(tallerId: number, taller: Taller): Observable<any> {
    return this.http.put(`${this.baseUrl}talleres/admin/updateTaller/${tallerId}`,taller, {headers: this.getHeaders()}).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  /**
   * Devuelve un booleano para saber si un usuario está suscrito o no.
   * @param tallerId - ID del taller.
   * @param userId - ID del usuario.
   * @returns Observable<boolean> - Observable que emite true si el usuario está suscrito, false en caso contrario.
   */
  isUserSuscribed(tallerId: number, userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}talleres/user/isUserSignedUp/${tallerId}/${userId}`, {headers: this.getHeaders()}).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  /**
   * devuelve un booleano para saber si el usuario ya se le ha asignado pareja
   * 
   * @param tallerId 
   * @param userId 
   * @returns 
   */
  isUserHasAPartner(tallerId: number, userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}talleres/user/isUserHasPartner/${tallerId}/${userId}`, {headers: this.getHeaders()}).pipe(
      tap(),
      catchError(this.handleError)
    );
  }
}
