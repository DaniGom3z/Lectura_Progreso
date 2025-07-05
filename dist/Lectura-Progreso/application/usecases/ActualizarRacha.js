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
exports.ActualizarRacha = void 0;
const RachaService_1 = require("../../domain/services/RachaService");
class ActualizarRacha {
    constructor(rachaRepo) {
        this.rachaRepo = rachaRepo;
    }
    execute(idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const rachaActual = yield this.rachaRepo.findByUsuario(idUsuario);
            if (!rachaActual) {
                throw new Error('No existe racha para este usuario');
            }
            const nuevaRacha = RachaService_1.RachaService.actualizarRacha(rachaActual, new Date());
            yield this.rachaRepo.save(nuevaRacha);
            console.log('Nueva racha guardada:', nuevaRacha);
        });
    }
}
exports.ActualizarRacha = ActualizarRacha;
