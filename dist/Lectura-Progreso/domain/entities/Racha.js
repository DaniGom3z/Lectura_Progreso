"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Racha = void 0;
class Racha {
    constructor(idUsuario, diasConsecutivos, ultimaFechaLectura, idRacha) {
        this.idUsuario = idUsuario;
        this.diasConsecutivos = diasConsecutivos;
        this.ultimaFechaLectura = ultimaFechaLectura;
        this.idRacha = idRacha;
        if (diasConsecutivos < 0) {
            throw new Error('Los días consecutivos no pueden ser negativos');
        }
    }
    incrementar(fechaLectura) {
        return new Racha(this.idUsuario, this.diasConsecutivos + 1, fechaLectura, this.idRacha);
    }
    resetear(fechaLectura) {
        return new Racha(this.idUsuario, 1, fechaLectura, this.idRacha);
    }
}
exports.Racha = Racha;
