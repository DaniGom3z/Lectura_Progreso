"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LecturaController = void 0;
const RegistrarSesionLectura_1 = require("../../application/usecases/RegistrarSesionLectura");
const SesionLecturaPrismaRepository_1 = require("../repositories/SesionLecturaPrismaRepository");
const RachaPrismaRepository_1 = require("../repositories/RachaPrismaRepository");
class LecturaController {
    // ───────── POST /lectura/sesion ─────────
    static registrarSesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { idLibro, fechaInicio, fechaFin, paginasLeidas, ultimaPaginaLeida } = req.body;
                const idUsuario = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                const libro = Number(idLibro);
                const paginas = Number(paginasLeidas);
                const ultimaPagina = Number(ultimaPaginaLeida);
                if (Number.isNaN(idUsuario) ||
                    Number.isNaN(libro) ||
                    !fechaInicio ||
                    !fechaFin ||
                    Number.isNaN(paginas)) {
                    return res.status(400).json({ error: "Faltan datos obligatorios" });
                }
                yield LecturaController.registrarSesionUseCase.execute({
                    idUsuario,
                    idLibro: libro,
                    fechaInicio: new Date(fechaInicio),
                    fechaFin: new Date(fechaFin),
                    paginasLeidas: paginas,
                    ultimaPaginaLeida: ultimaPagina
                });
                res.status(201).json({ mensaje: "Sesión registrada y racha actualizada" });
            }
            catch (err) {
                res.status(400).json({ error: err instanceof Error ? err.message : "Error desconocido" });
            }
        });
    }
}
exports.LecturaController = LecturaController;
LecturaController.sesionRepo = new SesionLecturaPrismaRepository_1.SesionLecturaPrismaRepository();
LecturaController.rachaRepo = new RachaPrismaRepository_1.RachaPrismaRepository();
LecturaController.registrarSesionUseCase = new RegistrarSesionLectura_1.RegistrarSesionLectora(LecturaController.sesionRepo, LecturaController.rachaRepo);
