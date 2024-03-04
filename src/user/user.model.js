import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    email: {
        type: String,
        required: [true, "El emal es obligatorio"],
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

UserSchema.methods.toJSON = function (){
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
};

export default mongoose.model('User', UserSchema);