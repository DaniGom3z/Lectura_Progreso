import { SesionLecturaRepository } from "../../domain/repositories/SesionLecturaRepository";
import { RachaRepository } from "../../domain/repositories/RachaRepository";
import { SesionLecturaFactory } from "../../domain/factories/SesionLecturaFactory";
import { RachaFactory } from "../../domain/factories/RachaFactory";
import { SesionCreadaEvent } from "../../domain/event/SesionCreadaEvent";

export class RegistrarSesionLectora {
  constructor(
    private readonly sesionRepo: SesionLecturaRepository,
    private readonly rachaRepo: RachaRepository
  ) {}

  async execute(params: {
    idUsuario: number;
    idLibro: number;
    fechaInicio: Date;
    fechaFin: Date;
    paginasLeidas: number;
    ultimaPaginaLeida: number;
  }): Promise<void> {
    const duracionMinutos =
      (params.fechaFin.getTime() - params.fechaInicio.getTime()) / (1000 * 60);

    // Crear y guardar sesión
    const sesion = SesionLecturaFactory.crearNuevaSesion(
      params.idUsuario,
      params.idLibro,
      params.fechaInicio,
      params.fechaFin,
      params.paginasLeidas,
      params.ultimaPaginaLeida
    );
    await this.sesionRepo.save(sesion);

    const event = SesionCreadaEvent.fromSesion(sesion);
    console.log(
      `📌 Evento: Sesión creada para usuario ${event.idUsuario} en libro ${event.idLibro}`
    );

    if (duracionMinutos < 5) {
      return;
    }

    console.log(`Buscando racha para usuario ${params.idUsuario}`);
    const rachaActual = await this.rachaRepo.findByUsuario(params.idUsuario);
    console.log("Racha actual:", rachaActual);

    if (!rachaActual) {
      const nuevaRacha = RachaFactory.crearNuevaRacha(params.idUsuario);
      await this.rachaRepo.save(nuevaRacha);
    } else {
      const ultima = new Date(rachaActual.ultimaFechaLectura);
      const diferenciaDias = this.calcularDiferenciaDias(
        ultima,
        params.fechaInicio
      );
      console.log(
        `Diferencia de días entre última lectura y nueva sesión: ${diferenciaDias}`
      );

      if (diferenciaDias === 1) {
        console.log("Incrementando racha...");
        const nuevaRacha = rachaActual.incrementar(params.fechaInicio);
        await this.rachaRepo.save(nuevaRacha);
      } else if (diferenciaDias > 1) {
        console.log("Reiniciando racha...");
        const reiniciada = rachaActual.resetear(params.fechaInicio);
        await this.rachaRepo.save(reiniciada);
      } else {
        console.log("Misma fecha o anterior, no se modifica la racha.");
      }
    }
  }

 private calcularDiferenciaDias(fecha1: Date, fecha2: Date): number {
  const f1 = Date.UTC(fecha1.getUTCFullYear(), fecha1.getUTCMonth(), fecha1.getUTCDate());
  const f2 = Date.UTC(fecha2.getUTCFullYear(), fecha2.getUTCMonth(), fecha2.getUTCDate());
  const diff = f2 - f1;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

}
