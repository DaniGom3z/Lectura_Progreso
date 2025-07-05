import { Racha } from "../../domain/entities/Racha";
import { RachaRepository } from "../../domain/repositories/RachaRepository";
import prisma from "../prisma/client";
import { RachaFactory } from "../../domain/factories/RachaFactory";

export class RachaPrismaRepository implements RachaRepository {
  async save(racha: Racha): Promise<void> {
    if (racha.idRacha) {
      await prisma.racha.update({
        where: { idRacha: racha.idRacha },
        data: {
          idUsuario: racha.idUsuario, 
          diasConsecutivos: racha.diasConsecutivos,
          ultimaFechaLectura: racha.ultimaFechaLectura,
        },
      });
    } else {
      await prisma.racha.create({
        data: {
          idUsuario: racha.idUsuario,
          diasConsecutivos: racha.diasConsecutivos,
          ultimaFechaLectura: racha.ultimaFechaLectura,
        },
      });
    }
  }

  async findByUsuario(idUsuario: number): Promise<Racha | null> {
    const r = await prisma.racha.findFirst({
      where: { idUsuario },
    });

    if (!r) return null;

    return RachaFactory.reconstruirDesdeDB(
      r.idUsuario,
      r.diasConsecutivos,
      r.ultimaFechaLectura,
      r.idRacha
    );
  }
}
