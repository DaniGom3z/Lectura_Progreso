import { Racha } from "../entities/Racha";

export interface RachaRepository{
    save(racha : Racha): Promise <void>;
    findByUsuario(idUsuario:number):Promise<Racha | null>;
}