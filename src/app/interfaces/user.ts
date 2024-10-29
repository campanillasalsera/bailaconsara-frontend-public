/**
 * Representa un usuario con su información personal y de contacto.
 */
export interface User {
  /** Id del usuario */
  id: number;

  /** Nombre del usuario */
  nombre: string;

  /** Apellidos del usuario */
  apellidos: string;

  /** Fecha de nacimiento del usuario en formato de cadena */
  fechanacimiento: string;

  /** Dirección de correo electrónico del usuario */
  email: string;

  /** Número de teléfono de contacto del usuario */
  telefono: string;

  /** Rol de baile del usuario (líder o seguidor) */
  bailerol: string;

  /** Contraseña del usuario para autenticación */
  password: string;
}
