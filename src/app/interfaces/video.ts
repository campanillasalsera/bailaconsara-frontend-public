/**
 * Representa un video con su fuente, descripción y detalles de imagen.
 */
export interface Video {
  /** URL del video que se desea reproducir */
  srcVideo: string;

  /** Descripción del contenido del video */
  descripcion: string;

  /** URL de la imagen de vista previa del video */
  imgSrc: string;

  /** Texto alternativo para la imagen de vista previa del video */
  imgAlt: string;
}
