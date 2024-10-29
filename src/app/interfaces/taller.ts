/**
 * Representa un taller con su información básica y estado de inscripción.
 */
export interface Taller {
  /** Id del taller */
  id: number;

  /** Nombre del taller */
  nombre: string;

  /** Modalidad de baile que se enseñará en el taller */
  modalidad: string;

  /** Nombre(s) del o de los profesores que imparten el taller */
  profesores: string;

  /** Fecha del taller en formato de cadena */
  fecha: string;

  /** Hora de inicio del taller */
  hora: string;

  /** Lugar donde se llevará a cabo el taller */
  lugar: string;

  /** Indica si el usuario está inscrito en el taller */
  isSignedUp?: boolean;

  /** Indica si el usuario tiene pareja asignada para el taller */
  hasPartner?: boolean;
}
