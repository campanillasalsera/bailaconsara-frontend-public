import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

/**
 * Servicio para gestionar la autenticación de usuarios.
 *
 * @export
 * @class AuthService
 * @typedef {AuthService}
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * URL base para las llamadas al servidor.
   *
   * @type {string}
   */
  baseUrl = 'https://bailaconsara-backend.onrender.com/';
  // baseUrl = "http://localhost:8080/";

  //Hay que añadir HttpProvider en appConfig, para poder hacer uso del mismo

  /**
   * Constructor del servicio de autenticación.
   * @param http Instancia de HttpClient para realizar peticiones HTTP.
   * @param router Instancia de Router para navegar entre rutas.
   */
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Comportamiento del sujeto que almacena los valores de autenticación.
   *
   * @type {*}
   */
  authSubject = new BehaviorSubject<any>({
    user: null,
  });

  /**
   * Observable del sujeto de autenticación.
   *
   * @type {*}
   */
  authSubject$ = this.authSubject.asObservable();

  /**
   * Estado de logueo del administrador.
   *
   * @type {*}
   */
  adminLogueado = new BehaviorSubject<boolean>(false);

  /**
   * Observable para el estado de logueo del administrador.
   *
   * @type {*}
   */
  adminLogueado$ = this.adminLogueado.asObservable();

  /**
   * Estado de logueo del usuario.
   *
   * @type {*}
   */
  userLogueado = new BehaviorSubject<boolean>(false);

  /**
   * Observable para el estado de logueo del usuario.
   *
   * @type {*}
   */
  userLogueado$ = this.userLogueado.asObservable();

  /**
   * Estado de eliminación de la cuenta del usuario.
   *
   * @type {*}
   */
  isUserAccountDeleted = new BehaviorSubject<boolean>(false);

  /**
   * Observable para el estado de eliminación de la cuenta del usuario.
   *
   * @type {*}
   */
  isUserAccountDeleted$ = this.isUserAccountDeleted.asObservable();

  /**
   * Genera los headers con el token del usuario logueado para las peticiones.
   * @returns HttpHeaders con el token de autorización.
   */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  /**
   * Realiza el logueo del usuario en la aplicación.
   * @param userData Datos del usuario para loguearse.
   * @returns Observable con la respuesta del servidor.
   */
  login(userData: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}auth/authenticate`, userData)
      .pipe(tap(), catchError(this.handleError));
  }

  /**
   * Realiza el registro de un usuario en la aplicación.
   * @param userData Datos del usuario para registrarse.
   * @returns Observable con la respuesta del servidor.
   */
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}auth/register`, userData).pipe(
      tap(() => {
        this.router.navigate(['/home']);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Actualiza los datos de un usuario.
   * @param userId Identificador del usuario a actualizar.
   * @param userData Nuevos datos del usuario.
   * @returns Observable con la respuesta del servidor.
   */
  updateUser(userId: number, userData: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}user/update/${userId}`, userData, {
        headers: this.getHeaders(),
      })
      .pipe(tap(), catchError(this.handleError));
  }

  /**
   * Obtiene los datos del perfil del usuario.
   * @returns Observable con los datos del perfil del usuario.
   */
  getUserProfile(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http
      .get<any>(
        `${this.baseUrl}auth/userProfile?token=${localStorage.getItem(
          'token'
        )}`,
        { headers }
      )
      .pipe(
        tap((user) => {
          //cambia el valor de authSubect y le adjudica los valores de user
          if (!user.isNotLocked) {
            const currentSate = this.authSubject.value;
            this.authSubject.next({ ...currentSate, user });
          }
          //Si el usuario tiene rol ADMIN actualiza adminLogueado a true
          if (user.role === 'ADMIN') {
            this.adminLogueado.next(true);
          }
          //Si el usuario tiene rol USER actualiza userLogueado a true
          if (user.role === 'USER') {
            this.userLogueado.next(true);
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Realiza el deslogueo del usuario.
   * @returns Observable con la respuesta del servidor.
   */
  logout(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<any>(`${this.baseUrl}logout`, { headers }).pipe(
      tap(() => {
        //Una vez deslogueado en el back, limpia el localStorage y las variables authSubject y adminLogueado
        localStorage.clear();
        this.authSubject.next({});
        this.adminLogueado.next(false);
        this.userLogueado.next(false);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Maneja los posibles errores de las respuestas del servidor.
   * @param error Error devuelto por la respuesta HTTP.
   * @returns Observable que lanza el error manejado.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string = 'Ha ocurrido un error';

    // Extrae los mensajes de los errores de backend
    if (error.error && typeof error.error === 'object') {
      // Extrae mensajes de las propiedades del objeto de error
      const errorMessages = Object.values(error.error)
        .filter((value) => typeof value === 'string') // Filtra los valores que no sean string
        .join('\n');

      //Si hay errores lanza un error
      if (errorMessages) {
        errorMessage = errorMessages;
        return throwError(() => new Error(errorMessage));
      }
    }

    // Gestión de errores del cliente u otros errores desconocidos
    return throwError(
      () => new Error(`Error Code: ${error.status}\n${error.message}`)
    );
  }

  /**
   * Deshabilita un usuario.
   * @param userId Identificador del usuario a deshabilitar.
   * @returns Observable con la respuesta del servidor.
   */
  deshabilitarUsuario(userId: number): Observable<any> {
    return this.http
      .put(
        `${this.baseUrl}admin/user/disable/${userId}`,
        {},
        { headers: this.getHeaders() }
      )
      .pipe(tap(), catchError(this.handleError));
  }

  /**
   * Habilita un usuario.
   * @param userId Identificador del usuario a habilitar.
   * @returns Observable con la respuesta del servidor.
   */
  habilitarUsuario(userId: number): Observable<any> {
    return this.http
      .put(
        `${this.baseUrl}admin/user/enable/${userId}`,
        {},
        { headers: this.getHeaders() }
      )
      .pipe(tap(), catchError(this.handleError));
  }

  /**
   * Cambia el rol de un usuario.
   * @param userId Identificador del usuario cuyo rol se cambiará.
   * @param userRole Nuevo rol del usuario.
   * @returns Observable con la respuesta del servidor.
   */
  changeUserRole(userId: number, userRole: string): Observable<any> {
    //Añade el content type a headers para que sepa que espera un json.stringify
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.put(
      `${this.baseUrl}admin/role/${userId}`,
      JSON.stringify(userRole),
      { headers: headers }
    );
  }

  /**
   * Elimina un usuario.
   * @param userId Identificador del usuario a eliminar.
   * @returns Observable con la respuesta del servidor.
   */
  eliminarUsuario(userId: number): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}user/delete/${userId}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        tap(() => this.isUserAccountDeleted.next(true)),
        catchError(this.handleError)
      );
  }

  /**
   * Lista todos los usuarios de la aplicación.
   * @returns Observable con la lista de usuarios.
   */
  listarUsuarios(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}admin/listUsers`, { headers: this.getHeaders() })
      .pipe(tap(), catchError(this.handleError));
  }

  /**
   * Envía un email al usuario con una contraseña OTP.
   * @param email Email del usuario.
   * @returns Observable con la respuesta del servidor.
   */
  requestOTP(email: string): Observable<any> {
    return this.http
      .post(`${this.baseUrl}forgotPassword/verifyEmail/${email}`, {})
      .pipe(tap(), catchError(this.handleError));
  }

  /**
   * Confirma que la OTP introducida por el usuario es válida.
   * @param otp Código OTP introducido por el usuario.
   * @param email Email del usuario.
   * @returns Observable con la respuesta del servidor.
   */
  confirmOtp(otp: string, email: string): Observable<any> {
    return this.http
      .post(`${this.baseUrl}forgotPassword/verifyOtp/${otp}/${email}`, {})
      .pipe(tap(), catchError(this.handleError));
  }

  /**
   * Cambia la contraseña del usuario.
   * @param password Nueva contraseña del usuario.
   * @param email Email del usuario.
   * @returns Observable con la respuesta del servidor.
   */
  resetPassword(password: any, email: string): Observable<any> {
    return this.http
      .post(`${this.baseUrl}forgotPassword/changePassword/${email}`, password)
      .pipe(
        tap(() => {
          //Una vez reseteada la contraseña, limpia el localStorage y las variables authSubject y adminLogueado
          localStorage.clear();
          this.authSubject.next({});
          this.adminLogueado.next(false);
          this.userLogueado.next(false);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Establece el estado de logueo del usuario.
   * @param estado Nuevo estado de logueo.
   */
  setUserLogueado(estado: boolean): void {
    this.userLogueado.next(estado);
  }
}
