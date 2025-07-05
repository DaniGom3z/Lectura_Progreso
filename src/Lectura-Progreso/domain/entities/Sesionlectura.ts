export class SesionLectura {
  constructor(
    public readonly idUsuario: number,
    public readonly idLibro: number,
    public readonly fechaInicio: Date,
    public readonly fechaFin: Date,
    public readonly paginasLeidas: number,
    public readonly ultimaPaginaLeida: number,
    public readonly duracionMinutos: number,
    public readonly idSesion?: number 
  ) {
    if (paginasLeidas <= 0) {
      throw new Error('Las páginas leídas deben ser mayores a 0');
    }
    if (ultimaPaginaLeida <= 0) {
      throw new Error('Las páginas leídas deben ser mayores a 0');
    }

    if (duracionMinutos <= 0) {
      throw new Error('La duración debe ser mayor a 0');
    }

    if (fechaInicio > fechaFin) {
      throw new Error('La fecha de inicio no puede ser posterior a la fecha de fin');
    }

    const minsDiff = Math.floor((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60));
    if (minsDiff !== duracionMinutos) {
      throw new Error(`La duración declarada (${duracionMinutos}) no coincide con la calculada (${minsDiff})`);
    }
  }

  getDuracionCalculada(): number {
    return Math.floor((this.fechaFin.getTime() - this.fechaInicio.getTime()) / (1000 * 60));
  }
}
