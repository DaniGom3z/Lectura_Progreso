"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarSesionLecturaUseCase = void 0;
const RegistrarSesionLectura_1 = require("../../application/usecases/RegistrarSesionLectura");
const SesionLecturaPrismaRepository_1 = require("../repositories/SesionLecturaPrismaRepository");
const RachaPrismaRepository_1 = require("../repositories/RachaPrismaRepository");
const sesionRepo = new SesionLecturaPrismaRepository_1.SesionLecturaPrismaRepository();
const rachaRepo = new RachaPrismaRepository_1.RachaPrismaRepository();
exports.registrarSesionLecturaUseCase = new RegistrarSesionLectura_1.RegistrarSesionLectura(sesionRepo, rachaRepo);
