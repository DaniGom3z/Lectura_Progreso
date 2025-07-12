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
// scripts/purgarSesionesAntiguas.ts
const client_1 = __importDefault(require("../src/Lectura-Progreso/infraestructure/prisma/client"));
function purgarSesiones() {
    return __awaiter(this, void 0, void 0, function* () {
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - 30);
        // 1️⃣ Agrupar por usuario y libro
        const resumen = yield client_1.default.sesionLectura.groupBy({
            by: ['idUsuario', 'idLibro'],
            where: { fechaInicio: { lt: fechaLimite } },
            _sum: {
                paginasLeidas: true,
                duracionMinutos: true
            }
        });
        // 2️⃣ Insertar resumen en tabla
        yield client_1.default.resumenLectura.createMany({
            data: resumen.map(r => {
                var _a, _b;
                return ({
                    idUsuario: r.idUsuario,
                    idLibro: r.idLibro,
                    paginasTotales: (_a = r._sum.paginasLeidas) !== null && _a !== void 0 ? _a : 0,
                    minutosTotales: (_b = r._sum.duracionMinutos) !== null && _b !== void 0 ? _b : 0,
                });
            }),
            skipDuplicates: true
        });
        // 3️⃣ Borrar sesiones antiguas
        const eliminadas = yield client_1.default.sesionLectura.deleteMany({
            where: { fechaInicio: { lt: fechaLimite } }
        });
        console.log(`📌 Resumen guardado de ${resumen.length} combinaciones usuario-libro`);
        console.log(`✅ ${eliminadas.count} sesiones eliminadas (anteriores a ${fechaLimite.toISOString()})`);
    });
}
purgarSesiones()
    .catch(console.error)
    .finally(() => process.exit());
