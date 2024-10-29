/**
 * Representa una reseña realizada por un usuario o cliente.
 */
export interface Review {
  /** URL de la imagen del cliente que realizó la reseña */
  imgSrc: string;

  /** Texto alternativo para la imagen, usado para accesibilidad */
  imgAlt: string;

  /** Texto de la reseña */
  text: string;

  /** Nombre del cliente que realizó la reseña */
  nombre: string;
}
