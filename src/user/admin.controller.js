import bcryptjs from 'bcryptjs';
import Admin from './user.model.js';

export const registrarUsuarios = async (req, res) => {
    const { name, email, password } = req.body;

    const usuario = new Admin({ name, email, password });

    const encript = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, encript);

    await usuario.save();
    res.status(200).json({
        usuario
    });
}