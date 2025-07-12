import { RegistrarSesionLectura } from "../../application/usecases/RegistrarSesionLectura";
import { SesionLecturaPrismaRepository } from "../repositories/SesionLecturaPrismaRepository";
import { RachaPrismaRepository } from "../repositories/RachaPrismaRepository";

const sesionRepo = new SesionLecturaPrismaRepository();
const rachaRepo = new RachaPrismaRepository();

export const registrarSesionLecturaUseCase = new RegistrarSesionLectura(
  sesionRepo,
  rachaRepo
); 