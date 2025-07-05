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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SesionLecturaPrismaRepository = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const SesionLecturaFactory_1 = require("../../domain/factories/SesionLecturaFactory");
class SesionLecturaPrismaRepository {
    save(sesion) {
        return __awaiter(this, void 0, void 0, function* () {
            if (sesion.idSesion) {
                yield client_1.default.sesionLectura.update({
                    where: { idSesion: sesion.idSesion },
                    data: {
                        idUsuario: sesion.idUsuario,
                        idLibro: sesion.idLibro,
                        fechaInicio: sesion.fechaInicio,
                        fechaFin: sesion.fechaFin,
                        paginasLeidas: sesion.paginasLeidas,
                        ultimaPaginaLeida: sesion.ultimaPaginaLeida,
                        duracionMinutos: sesion.duracionMinutos
                    },
                });
            }
            else {
                yield client_1.default.sesionLectura.create({
                    data: {
                        idUsuario: sesion.idUsuario,
                        idLibro: sesion.idLibro,
                        fechaInicio: sesion.fechaInicio,
                        fechaFin: sesion.fechaFin,
                        paginasLeidas: sesion.paginasLeidas,
                        ultimaPaginaLeida: sesion.ultimaPaginaLeida,
                        duracionMinutos: sesion.duracionMinutos
                    }
                });
            }
        });
    }
    findByUsuario(idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const sesionesDB = yield client_1.default.sesionLectura.findMany({
                where: { idUsuario }
            });
            return sesionesDB.map(s => SesionLecturaFactory_1.SesionLecturaFactory.reconstruirDesdeDB(s.idSesion, s.idUsuario, s.idLibro, s.fechaInicio, s.fechaFin, s.paginasLeidas, s.ultimaPaginaLeida, s.duracionMinutos));
        });
    }
    findById(idSesion) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = yield client_1.default.sesionLectura.findUnique({
                where: { idSesion }
            });
            if (!s)
                return null;
            return SesionLecturaFactory_1.SesionLecturaFactory.reconstruirDesdeDB(s.idSesion, s.idUsuario, s.idLibro, s.fechaInicio, s.fechaFin, s.paginasLeidas, s.ultimaPaginaLeida, s.duracionMinutos);
        });
    }
}
exports.SesionLecturaPrismaRepository = SesionLecturaPrismaRepository;
