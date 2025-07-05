import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import { LecturaController } from "./Lectura-Progreso/infraestructure/adapters/LecturaController";
import { jwtMiddleware } from "./Lectura-Progreso/infraestructure/http/middleware/jwtMiddleware";

const app = express();

/*──────────  Middlewares globales  ──────────*/
app.use(helmet());          // Seguridad HTTP headers
app.use(cors());            // CORS
app.use(morgan("combined"));// Logging
app.use(express.json());    // Body-parser JSON

/*──────────  Rutas protegidas  ──────────*/
app.use(jwtMiddleware);     // 🛡️  Valida JWT y pone req.user.id

app.post(
  "/lectura/sesion",
  LecturaController.registrarSesion as express.RequestHandler
);

/*──────────  404 y manejo de errores  ──────────*/
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use(
  (err: Error, req: Request, res: Response, _next: NextFunction) => {
    console.error("💥 Error no capturado:", err.stack);
    res.status(500).json({ error: "Error interno del servidor" });
  }
);

/*──────────  Levantar servidor  ──────────*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Lectura Progreso service corriendo en el puerto ${PORT}`);
});
