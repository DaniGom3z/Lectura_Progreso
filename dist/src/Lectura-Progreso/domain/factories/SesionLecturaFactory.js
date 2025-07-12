"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SesionLecturaFactory = void 0;
const SesionLectura_1 = require("../entities/SesionLectura");
class SesionLecturaFactory {
    static crearNuevaSesion(idUsuario, idLibro, fechaInicio, fechaFin, paginasLeidas, ultimaPaginaLeida) {
        // Calcula la duración automáticamente
        const duracionMinutos = Math.floor((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60));
        if (duracionMinutos <= 0) {
            throw new Error('La duración calculada debe ser mayor a 0');
        }
        return new SesionLectura_1.SesionLectura(idUsuario, idLibro, fechaInicio, fechaFin, paginasLeidas, ultimaPaginaLeida, duracionMinutos);
    }
    static reconstruirDesdeDB(idSesion, idUsuario, idLibro, fechaInicio, fechaFin, paginasLeidas, ultimaPaginaLeida, duracionMinutos) {
        return new SesionLectura_1.SesionLectura(idUsuario, idLibro, fechaInicio, fechaFin, paginasLeidas, ultimaPaginaLeida, duracionMinutos, idSesion);
    }
}
exports.SesionLecturaFactory = SesionLecturaFactory;
