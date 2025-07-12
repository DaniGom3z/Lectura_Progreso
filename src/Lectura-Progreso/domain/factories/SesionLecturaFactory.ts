import { SesionLectura } from '../entities/SesionLectura';

export class SesionLecturaFactory {
  static crearNuevaSesion(
    idUsuario: number,
    idLibro: number,
    fechaInicio: Date,
    fechaFin: Date,
    paginasLeidas: number,
    ultimaPaginaLeida:number,
  ): SesionLectura {
    // Calcula la duración automáticamente
    const duracionMinutos = Math.floor((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60));
    if (duracionMinutos <= 0) {
      throw new Error('La duración calculada debe ser mayor a 0');
    }

    return new SesionLectura(
      idUsuario,
      idLibro,
      fechaInicio,
      fechaFin,
      paginasLeidas,
      ultimaPaginaLeida,
      duracionMinutos
    );
  }

  static reconstruirDesdeDB(
    idSesion: number,
    idUsuario: number,
    idLibro: number,
    fechaInicio: Date,
    fechaFin: Date,
    paginasLeidas: number,
    ultimaPaginaLeida:number,
    duracionMinutos: number
  ): SesionLectura {
    return new SesionLectura(
      idUsuario,
      idLibro,
      fechaInicio,
      fechaFin,
      paginasLeidas,
      ultimaPaginaLeida,
      duracionMinutos,
      idSesion
    );
  }
}
