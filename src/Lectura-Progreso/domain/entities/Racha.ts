export class Racha {
  constructor(
    public readonly idUsuario: number,
    public readonly diasConsecutivos: number,
    public readonly ultimaFechaLectura: Date,
    public readonly idRacha?: number
  ) {
    if (diasConsecutivos < 0) {
      throw new Error('Los días consecutivos no pueden ser negativos');
    }

  }

  incrementar(fechaLectura: Date): Racha {
    return new Racha(this.idUsuario, this.diasConsecutivos + 1, fechaLectura, this.idRacha);
  }

  resetear(fechaLectura: Date): Racha {
    return new Racha(this.idUsuario, 1, fechaLectura, this.idRacha);
  }
}
