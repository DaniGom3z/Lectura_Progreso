"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RachaFactory = void 0;
const Racha_1 = require("../entities/Racha");
class RachaFactory {
    static crearNuevaRacha(idUsuario) {
        return new Racha_1.Racha(idUsuario, 1, new Date());
    }
    static reconstruirDesdeDB(idUsuario, diasConsecutivos, ultimaFechaLectura, idRacha) {
        return new Racha_1.Racha(idUsuario, diasConsecutivos, ultimaFechaLectura, idRacha);
    }
}
exports.RachaFactory = RachaFactory;
