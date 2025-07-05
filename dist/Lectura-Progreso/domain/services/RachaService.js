"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RachaService = void 0;
class RachaService {
    static actualizarRacha(racha, fechaLectura) {
        const ultima = new Date(racha.ultimaFechaLectura);
        const diferenciaDias = this.calcularDiferenciaDias(ultima, fechaLectura);
        if (diferenciaDias === 1) {
            return racha.incrementar(fechaLectura);
        }
        else if (diferenciaDias > 1) {
            return racha.resetear(fechaLectura);
        }
        else {
            return racha;
        }
    }
    static calcularDiferenciaDias(fecha1, fecha2) {
        const f1 = new Date(fecha1.getFullYear(), fecha1.getMonth(), fecha1.getDate());
        const f2 = new Date(fecha2.getFullYear(), fecha2.getMonth(), fecha2.getDate());
        const diff = f2.getTime() - f1.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }
}
exports.RachaService = RachaService;
