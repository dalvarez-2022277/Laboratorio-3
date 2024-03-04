import { response, request } from 'express';
import user from '../user/user.model.js';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generar-jwt.js';

export const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        let usuarioinfo = null;
        const emailvalid = email.includes('@kinal.edu.gt');
        if (emailvalid) {

            if (email) {
                usuarioinfo = await user.findOne({ email });
            } else {
                return res.status(500).json({
                    msg: 'Debe proporcionar un correo valido'
                });
            }

            if (!usuarioinfo) {
                return res.status(400).json({
                    msg: 'Usuario no encontrado'
                });
            }

            const passwordvalido = await bcryptjs.compare(password, usuarioinfo.password);

            if (!passwordvalido) {
                return res.status(400).json({
                    msg: 'Contraseña incorrecta'
                });
            }

            const token = await generarJWT(usuarioinfo.id);

            return res.status(200).json({
                msg: 'Bienvenido al sistema!',
                usuarioinfo,
                token
            });

        }

        return res.status(400).json({
            msg: 'Debes ingresar un correo que tenga @kinal.edu.gt'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno del servidor',
            error
        });
    }
}
