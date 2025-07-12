"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SesionLectura = void 0;
class SesionLectura {
    constructor(idUsuario, idLibro, fechaInicio, fechaFin, paginasLeidas, ultimaPaginaLeida, duracionMinutos, idSesion) {
        this.idUsuario = idUsuario;
        this.idLibro = idLibro;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.paginasLeidas = paginasLeidas;
        this.ultimaPaginaLeida = ultimaPaginaLeida;
        this.duracionMinutos = duracionMinutos;
        this.idSesion = idSesion;
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
    getDuracionCalculada() {
        return Math.floor((this.fechaFin.getTime() - this.fechaInicio.getTime()) / (1000 * 60));
    }
}
exports.SesionLectura = SesionLectura;
