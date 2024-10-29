/**
 * Representa la información de una sala de eventos.
 */
export interface Sala {
  /** Nombre de la sala */
  nombreSala: string;

  /** Localidad donde se encuentra la sala */
  localidad: string;

  /** Dirección completa de la sala */
  address: string;

  /** Días que abre y géneros musicales disponibles en la sala */
  diasGeneros: [
    {
      /** Día de la semana que abre */
      dia: string;

      /** Lista de géneros musicales que se presentan en el día especificado */
      generos: string[];
    }
  ];
}
