/**
 * Representa una publicación con detalles de contenido y metadatos para SEO.
 */
export interface Post {
  /** Id de la publicación */
  id: number;

  /** Título de la publicación */
  title: string;

  /** Texto informativo general sobre la publicación */
  textoinfo: string;

  /** Información sobre el programa relacionado */
  textoprograma1: string;

  /** Continuación de nformación sobre el programa relacionado */
  textoprograma2: string;

  /** Detalles sobre el dress code */
  textodresscode: string;

  /** Información sobre los artistas */
  textoartistas: string;

  /** Información sobre los DJs participantes */
  textodjs: string;

  /** Información sobre los pases */
  textopases: string;

  /** Fecha y hora de creación de la publicación */
  created_at: any;

  /** Frase clave para el SEO de la publicación */
  fraseclave: string;

  /** Título optimizado para SEO */
  tituloseo: string;

  /** Identificador único legible en la URL */
  slug: string;

  /** Meta descripción para motores de búsqueda */
  metadescripcion: string;

  /** Texto alternativo para la imagen de portada */
  altportada: string;

  /** Imagen de portada de la publicación */
  imagenportada: any;
}
