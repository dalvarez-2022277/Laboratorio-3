import mongoose from "mongoose";

const nivelesImpacto = ['Alto', 'Medio', 'Bajo'];
const categorias = ['Tecnología', 'Salud', 'Finanzas', 'Educación', 'Comercio', 'Manufactura', 'Otro']

const EsquemaEmpresa  = mongoose.Schema({
    nombreEmpresa: {
        type: String,
        required: [true, "El nombre es un parámetro requerido"],
    },
    nivelImpacto: {
        type: String,
        enum: nivelesImpacto,
        required: [true, "El nivel de impacto es un parámetro requerido"],
    },
    añosExperiencia: {
        type: Number,
        required: [true, "Los años de experiencia son un parámetro requerido"],
    },
    categoriaEmpresa: {
        type: String,
        enum: categorias,
        required: [true, "La categoría es un parámetro requerido"],
    }
});

EsquemaEmpresa.methods.toJSON = function () {
    const { __v, _id, ...empresa } = this.toObject();
    empresa.uid = _id;
    return empresa;
}

export default mongoose.model('Empresa', EsquemaEmpresa )
