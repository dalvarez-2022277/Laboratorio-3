import { Router } from "express";
import { validarCampos } from "../middlewares/validar-campos.js";
import { generarReporte } from "./empresa.controller.js";
const router  = Router();

router .get(
    "/",
    [
        validarCampos
    ],
    generarReporte
)

export default router ;