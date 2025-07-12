import { SesionLectura } from "../entities/SesionLectura";

export interface SesionLecturaRepository{
    save(sesion: SesionLectura):Promise<void>;
    findByUsuario(idUsuario : number):Promise<SesionLectura[]>;
    findById(idSesion:number):Promise<SesionLectura | null>;
}