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
exports.RachaPrismaRepository = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const RachaFactory_1 = require("../../domain/factories/RachaFactory");
class RachaPrismaRepository {
    save(racha) {
        return __awaiter(this, void 0, void 0, function* () {
            if (racha.idRacha) {
                yield client_1.default.racha.update({
                    where: { idRacha: racha.idRacha },
                    data: {
                        idUsuario: racha.idUsuario,
                        diasConsecutivos: racha.diasConsecutivos,
                        ultimaFechaLectura: racha.ultimaFechaLectura,
                    },
                });
            }
            else {
                yield client_1.default.racha.create({
                    data: {
                        idUsuario: racha.idUsuario,
                        diasConsecutivos: racha.diasConsecutivos,
                        ultimaFechaLectura: racha.ultimaFechaLectura,
                    },
                });
            }
        });
    }
    findByUsuario(idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = yield client_1.default.racha.findFirst({
                where: { idUsuario },
            });
            if (!r)
                return null;
            return RachaFactory_1.RachaFactory.reconstruirDesdeDB(r.idUsuario, r.diasConsecutivos, r.ultimaFechaLectura, r.idRacha);
        });
    }
}
exports.RachaPrismaRepository = RachaPrismaRepository;
