import user from '../user/user.model.js'

export const existeAdminByCorreo = async (email = '') => {
    const emailreq = email.toLowerCase();

    const emailexist = await user.findOne({
        emailAdmin: {
            $regex: new RegExp(`^${emailreq}$`, 'i')
        }
    });

    if(emailexist){
        throw new Error(`el usuario con el correo: ${emailAdmin} ya esta registrado`);
    }
}