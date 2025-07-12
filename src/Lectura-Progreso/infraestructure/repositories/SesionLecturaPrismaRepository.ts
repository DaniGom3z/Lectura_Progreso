import { SesionLecturaRepository } from "../../domain/repositories/SesionLecturaRepository";
import { SesionLectura } from "../../domain/entities/SesionLectura";
import prisma from "../prisma/client";
import { SesionLecturaFactory } from "../../domain/factories/SesionLecturaFactory";

export class SesionLecturaPrismaRepository implements SesionLecturaRepository {
  async save(sesion: SesionLectura): Promise<void> {
    if (sesion.idSesion) {
      await prisma.sesionLectura.update({
        where: { idSesion: sesion.idSesion },
        data: {
            idUsuario :sesion.idUsuario,
            idLibro : sesion.idLibro,
            fechaInicio : sesion.fechaInicio,
            fechaFin : sesion.fechaFin,
            paginasLeidas : sesion.paginasLeidas,
            ultimaPaginaLeida : sesion.ultimaPaginaLeida,
            duracionMinutos : sesion.duracionMinutos
        },
      });
    }else{
        await prisma.sesionLectura.create({
            data: {
                idUsuario:sesion.idUsuario,
                idLibro :sesion.idLibro,
                fechaInicio: sesion.fechaInicio,
                fechaFin: sesion.fechaFin,
                paginasLeidas: sesion.paginasLeidas,
                ultimaPaginaLeida:sesion.ultimaPaginaLeida,
                duracionMinutos: sesion.duracionMinutos
            }
        })
    }
  }

  async findByUsuario(idUsuario: number): Promise<SesionLectura[]> {
    const sesionesDB = await prisma.sesionLectura.findMany({
        where: {idUsuario}
    })

    return sesionesDB.map(s=>
        SesionLecturaFactory.reconstruirDesdeDB(
            s.idSesion,
            s.idUsuario,
            s.idLibro,
            s.fechaInicio,
            s.fechaFin,
            s.paginasLeidas,
            s.ultimaPaginaLeida,
            s.duracionMinutos
        )
    )
  }

  async findById(idSesion : number):Promise<SesionLectura | null>{
    const s = await prisma.sesionLectura.findUnique({
        where : {idSesion}
    })

    if (!s) return null;

    return SesionLecturaFactory.reconstruirDesdeDB(
        s.idSesion,
        s.idUsuario,
        s.idLibro,
        s.fechaInicio,
        s.fechaFin,
        s.paginasLeidas,
        s.ultimaPaginaLeida,
        s.duracionMinutos
    )
  }
}
