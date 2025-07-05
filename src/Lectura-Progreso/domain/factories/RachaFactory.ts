import { Racha } from '../entities/Racha';

export class RachaFactory {
  static crearNuevaRacha(idUsuario: number): Racha {
    return new Racha(
      idUsuario,
      1, 
      new Date()
    );
  }

  static reconstruirDesdeDB(
    idUsuario: number,
    diasConsecutivos: number,
    ultimaFechaLectura: Date,
    idRacha: number
  ): Racha {
    return new Racha(
      idUsuario,
      diasConsecutivos,
      ultimaFechaLectura,
      idRacha
    );
  }
}
