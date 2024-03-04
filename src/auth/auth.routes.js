import { Router } from 'express';
import { login } from './auth.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { check } from 'express-validator';

const routerLogin = Router();

routerLogin.post(
    '/',
    [
        check("password", "La contraseña debe es obligatoria").not().isEmpty(),
        check("email", "the email is an a caracter obligatory").isEmail(),
        validarCampos
    ],
    login
);

export default routerLogin;