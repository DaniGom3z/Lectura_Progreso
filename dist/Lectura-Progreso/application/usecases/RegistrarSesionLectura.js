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
exports.RegistrarSesionLectora = void 0;
const SesionLecturaFactory_1 = require("../../domain/factories/SesionLecturaFactory");
const RachaFactory_1 = require("../../domain/factories/RachaFactory");
const SesionCreadaEvent_1 = require("../../domain/event/SesionCreadaEvent");
class RegistrarSesionLectora {
    constructor(sesionRepo, rachaRepo) {
        this.sesionRepo = sesionRepo;
        this.rachaRepo = rachaRepo;
    }
    execute(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const duracionMinutos = (params.fechaFin.getTime() - params.fechaInicio.getTime()) / (1000 * 60);
            // Crear y guardar sesión
            const sesion = SesionLecturaFactory_1.SesionLecturaFactory.crearNuevaSesion(params.idUsuario, params.idLibro, params.fechaInicio, params.fechaFin, params.paginasLeidas, params.ultimaPaginaLeida);
            yield this.sesionRepo.save(sesion);
            const event = SesionCreadaEvent_1.SesionCreadaEvent.fromSesion(sesion);
            console.log(`📌 Evento: Sesión creada para usuario ${event.idUsuario} en libro ${event.idLibro}`);
            if (duracionMinutos < 5) {
                return;
            }
            console.log(`Buscando racha para usuario ${params.idUsuario}`);
            const rachaActual = yield this.rachaRepo.findByUsuario(params.idUsuario);
            console.log("Racha actual:", rachaActual);
            if (!rachaActual) {
                const nuevaRacha = RachaFactory_1.RachaFactory.crearNuevaRacha(params.idUsuario);
                yield this.rachaRepo.save(nuevaRacha);
            }
            else {
                const ultima = new Date(rachaActual.ultimaFechaLectura);
                const diferenciaDias = this.calcularDiferenciaDias(ultima, params.fechaInicio);
                console.log(`Diferencia de días entre última lectura y nueva sesión: ${diferenciaDias}`);
                if (diferenciaDias === 1) {
                    console.log("Incrementando racha...");
                    const nuevaRacha = rachaActual.incrementar(params.fechaInicio);
                    yield this.rachaRepo.save(nuevaRacha);
                }
                else if (diferenciaDias > 1) {
                    console.log("Reiniciando racha...");
                    const reiniciada = rachaActual.resetear(params.fechaInicio);
                    yield this.rachaRepo.save(reiniciada);
                }
                else {
                    console.log("Misma fecha o anterior, no se modifica la racha.");
                }
            }
        });
    }
    calcularDiferenciaDias(fecha1, fecha2) {
        const f1 = Date.UTC(fecha1.getUTCFullYear(), fecha1.getUTCMonth(), fecha1.getUTCDate());
        const f2 = Date.UTC(fecha2.getUTCFullYear(), fecha2.getUTCMonth(), fecha2.getUTCDate());
        const diff = f2 - f1;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }
}
exports.RegistrarSesionLectora = RegistrarSesionLectora;
