import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

/**
 * Servicio para gestionar las operaciones relacionadas con las salas de baile.
 *
 * @export
 * @class SalasBaileService
 * @typedef {SalasBaileService}
 */
@Injectable({
  providedIn: 'root',
})
export class SalasBaileService {
  /**
   * URL base para las llamadas al servidor.
   *
   * @type {string}
   */
  baseUrl = 'https://bailaconsara-backend.onrender.com/';
  // baseUrl = "http://localhost:8080/";

  /**
   * Variable para guardar los datos de las salas.
   *
   * @type {*}
   */
  salaSubject = new BehaviorSubject<any>({
    nombreSala: '',
    localidad: '',
    address: '',
    diasGeneros: [
      {
        dia: '',
        generos: [],
      },
    ],
  });

  /**
   *  Observable que emite los cambios en las salas.
   *
   * @type {*}
   */
  salaSubject$ = this.salaSubject.asObservable();

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
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  /**
   * Obtiene las salas que abren un determinado día.
   * @param dia - El día para el que se desean obtener las salas.
   * @returns Observable<any> - Observable que emite la lista de salas.
   */
  getSalasByDia(dia: string): Observable<any> {
    return this.http
      .get(`${this.baseUrl}salas/horarios/${dia.toUpperCase()}`)
      .pipe(
        tap((salas) => {
          const currentState = this.salaSubject.value;
          this.salaSubject.next({ ...currentState, salas });
        })
      );
  }

  /**
   * Obtiene una sala por su ID.
   * @param id - El ID de la sala a recuperar.
   * @returns Observable<any> - Observable que emite los datos de la sala correspondiente.
   */
  getSalaById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}salas/horarios/getSala/${id}`).pipe(
      tap((sala) => {
        const currentState = this.salaSubject.value;
        this.salaSubject.next({ ...currentState, sala });
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Crea una nueva sala.
   * @param salaBaile - Los datos de la sala a crear.
   * @returns Observable<any> - Observable que emite la respuesta del servidor.
   */
  createSala(salaBaile: any): Observable<any> {
    return this.http.post(`${this.baseUrl}salas/create`, salaBaile, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Actualiza una sala por su ID.
   * @param salaBaileId - El ID de la sala a actualizar.
   * @param salaBaile - Los nuevos datos de la sala.
   * @returns Observable<any> - Observable que emite la respuesta del servidor.
   */
  updateSala(salaBaileId: number, salaBaile: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}salas/updateSala/${salaBaileId}`,
      salaBaile,
      { headers: this.getHeaders() }
    );
  }

  /**
   * Elimina una sala por su ID.
   * @param salaBileId - El ID de la sala a eliminar.
   * @returns Observable<any> - Observable que emite la respuesta del servidor.
   */
  deleteSala(salaBileId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}salas/deleteSala/${salaBileId}`, {
      headers: this.getHeaders(),
    });
  }
}
