export class SesionCreadaEvent {
  constructor(
    public readonly idSesion: number | undefined,
    public readonly idUsuario: number,
    public readonly idLibro: number,
    public readonly fecha: Date
  ) {}

  static fromSesion(sesion: { idSesion?: number; idUsuario: number; idLibro: number; fechaFin: Date }): SesionCreadaEvent {
    return new SesionCreadaEvent(
      sesion.idSesion,
      sesion.idUsuario,
      sesion.idLibro,
      sesion.fechaFin
    );
  }
}
