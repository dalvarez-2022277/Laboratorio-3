import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { crearEmpresa, actualizarEmpresa, obtenerEmpresas } from "./empresa.controller.js";
import { categoryExiste, nivelImpactoExiste} from "../middlewares/empresas-validators.js";

const routerEmpresa = Router();

routerEmpresa.post(
    '/',
    [
        check("nombreEmpresa", "El nombre de la empresa es un parámetro requerido").not().isEmpty(),
        check("categoriaEmpresa").custom(categoryExiste),
        check("nivelImpacto").custom(nivelImpactoExiste),
        validarCampos
    ],
    crearEmpresa
);

routerEmpresa.put(
    '/:id',
    [
        validarCampos
    ],
    actualizarEmpresa
);

routerEmpresa.get("/:orden?",
    [
        validarCampos
    ],
    obtenerEmpresas
);

export default routerEmpresa;
