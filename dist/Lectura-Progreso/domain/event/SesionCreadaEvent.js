"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SesionCreadaEvent = void 0;
class SesionCreadaEvent {
    constructor(idSesion, idUsuario, idLibro, fecha) {
        this.idSesion = idSesion;
        this.idUsuario = idUsuario;
        this.idLibro = idLibro;
        this.fecha = fecha;
    }
    static fromSesion(sesion) {
        return new SesionCreadaEvent(sesion.idSesion, sesion.idUsuario, sesion.idLibro, sesion.fechaFin);
    }
}
exports.SesionCreadaEvent = SesionCreadaEvent;
