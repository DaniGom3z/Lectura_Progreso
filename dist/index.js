"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const LecturaController_1 = require("./Lectura-Progreso/infraestructure/adapters/LecturaController");
const jwtMiddleware_1 = require("./Lectura-Progreso/infraestructure/http/middleware/jwtMiddleware");
const app = (0, express_1.default)();
/*──────────  Middlewares globales  ──────────*/
app.use((0, helmet_1.default)()); // Seguridad HTTP headers
app.use((0, cors_1.default)()); // CORS
app.use((0, morgan_1.default)("combined")); // Logging
app.use(express_1.default.json()); // Body-parser JSON
/*──────────  Rutas protegidas  ──────────*/
app.use(jwtMiddleware_1.jwtMiddleware); // 🛡️  Valida JWT y pone req.user.id
app.post("/lectura/sesion", LecturaController_1.LecturaController.registrarSesion);
/*──────────  404 y manejo de errores  ──────────*/
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});
app.use((err, req, res, _next) => {
    console.error("💥 Error no capturado:", err.stack);
    res.status(500).json({ error: "Error interno del servidor" });
});
/*──────────  Levantar servidor  ──────────*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Lectura Progreso service corriendo en el puerto ${PORT}`);
});
