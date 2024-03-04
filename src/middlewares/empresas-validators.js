import EmpresaModel from '../empresas/empresa.model.js';

export const categoryExiste = async (categoriaEmpresa = '') => {
    const categoriasExistentes = [
        'Tecnología', 'Salud', 'Finanzas', 'Educación', 'Comercio', 'Manufactura', 'Otro'
    ];

    if (!categoriasExistentes.includes(categoriaEmpresa)) {
        const mensajeError = `La categoría debe ser una de las siguientes categorías: ${categoriasExistentes.join(', ')}.`;
        throw new Error(mensajeError);
    }
}

export const nivelImpactoExiste = async (nivelImpacto = '') => {
    const nivelesImpacto = [
        'Alto', 'Medio', 'Bajo'
    ];

    if (!nivelesImpacto.includes(nivelImpacto)) {
        const mensajeError = `El nivel de impacto debe ser uno de los siguientes: ${nivelesImpacto.join(', ')}.`;
        throw new Error(mensajeError);
    }
}

export const existeEmpresaPorNombre = async (nombreEmpresa = '') => {
    const nombreEmpresaMin = nombreEmpresa.toLowerCase();

    const existeEmpresa = await EmpresaModel.findOne({
        nombreEmpresa: {
            $regex: new RegExp(`^${nombreEmpresaMin}$`, 'i')
        }
    });

    if (existeEmpresa) {
        throw new Error(`El nombre "${nombreEmpresa}" de la empresa ya existe.`);
    }
}
