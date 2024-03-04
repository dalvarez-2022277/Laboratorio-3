import { Router } from "express";
import { check } from "express-validator";
import { registrarUsuarios } from "./admin.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existeAdminByCorreo } from "../middlewares/user-validar.js";

const userRouter = Router();

userRouter.post(
    "/",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "EL email es obligatorio").isEmail(),
        check("password", "La contraseña debe ser mayor a 6 caracteres").isLength({ min: 6, }),
        check('email').custom(existeAdminByCorreo),
        validarCampos
    ],
    registrarUsuarios
);

export default userRouter;