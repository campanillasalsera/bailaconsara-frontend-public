/**
 * Representa un nivel con información detallada sobre su contenido.
 */
export interface Nivel {
  /** Nombre del nivel */
  nombre: string;

  /** Título descriptivo del nivel */
  title: string;

  /** Número que indica la posición o secuencia del nivel */
  number: number;

  /** Subtítulo que ofrece más contexto sobre el nivel */
  subtitle: string;

  /** Lista de identificadores o nombres de pruebas asociadas al nivel */
  listTest: string[];

  /** Lista de temas o contenidos del temario asociados al nivel */
  listTemario: string[];
}
