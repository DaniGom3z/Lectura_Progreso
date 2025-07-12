import { Request, Response } from "express";
import { RegistrarSesionLectura } from "../../application/usecases/RegistrarSesionLectura";
import { SesionLecturaPrismaRepository } from "../repositories/SesionLecturaPrismaRepository";
import { RachaPrismaRepository } from "../repositories/RachaPrismaRepository";
import { registrarSesionLecturaUseCase } from "../di/config";

export class LecturaController {
  private static sesionRepo = new SesionLecturaPrismaRepository();
  private static rachaRepo  = new RachaPrismaRepository();

  private static registrarSesionUseCase = registrarSesionLecturaUseCase;

  // ───────── POST /lectura/sesion ─────────
  static async registrarSesion(req: Request, res: Response) {
    try {
      const { idLibro, fechaInicio, fechaFin, paginasLeidas,ultimaPaginaLeida } = req.body;
      const idUsuario = Number(req.user?.id);
      const libro     = Number(idLibro);
      const paginas   = Number(paginasLeidas);
      const ultimaPagina = Number(ultimaPaginaLeida)

      if (
        Number.isNaN(idUsuario) ||
        Number.isNaN(libro) ||
        !fechaInicio ||
        !fechaFin   ||
        Number.isNaN(paginas)
      ) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
      }

      await LecturaController.registrarSesionUseCase.execute({
        idUsuario,
        idLibro: libro,
        fechaInicio: new Date(fechaInicio),
        fechaFin:   new Date(fechaFin),
        paginasLeidas: paginas,
        ultimaPaginaLeida: ultimaPagina
      });

      res.status(201).json({ mensaje: "Sesión registrada y racha actualizada" });
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : "Error desconocido" });
    }
  }
}
