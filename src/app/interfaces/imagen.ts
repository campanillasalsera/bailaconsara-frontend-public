/**
 * Representa una imagen con una fuente y un texto alternativo.
 */
export interface Imagen {
  /** URL de la imagen */
  imgSrc: string;

  /** Texto del alt que describe la imagen para accesibilidad */
  imgAlt: string;
}
