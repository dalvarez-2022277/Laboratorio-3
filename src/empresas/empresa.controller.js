import { response, request } from "express";
import Empresa from '../empresas/empresa.model.js';
import { existeEmpresaPorNombre } from "../middlewares/empresas-validators.js";
import Excel from 'exceljs';

export const crearEmpresa = async (req = request, res = response) => {
    const { nombreEmpresa, nivelImpacto, añosExperiencia, categoriaEmpresa } = req.body;
    const empresa = new Empresa({ nombreEmpresa, nivelImpacto, añosExperiencia, categoriaEmpresa });
    console.log(empresa);

    await empresa.save();

    res.status(200).json({
        empresa
    });
}

export const actualizarEmpresa = async (req, res) => {
    const { id } = req.params;
    const { nombreEmpresa, nivelImpacto, categoriaEmpresa, añosExperiencia } = req.body;

    try {
        if (nombreEmpresa) {
            await existeEmpresaPorNombre(nombreEmpresa);
        }

        if (categoriaEmpresa) {
            const categoriasExistentes = ['Tecnología', 'Salud', 'Finanzas', 'Educación', 'Comercio', 'Manufactura', 'Otro'];
            if (!categoriasExistentes.includes(categoriaEmpresa)) {
                throw new Error(`La categoría empresarial "${categoriaEmpresa}" no es válida. Debe ser una de: ${categoriasExistentes.join(", ")}`);
            }
        }

        if (nivelImpacto) {
            const nivelesImpacto = ['Alto', 'Medio', 'Bajo'];
            if (!nivelesImpacto.includes(nivelImpacto)) {
                const mensajeError = `El nivel de impacto debe ser uno de los siguientes: ${nivelesImpacto.join(', ')}.`;
                throw new Error(mensajeError);
            }
        }

        const camposActualizados = {
            nombreEmpresa,
            nivelImpacto,
            categoriaEmpresa,
            añosExperiencia
        };

        await Empresa.findByIdAndUpdate(id, camposActualizados);

        const empresaActualizada = await Empresa.findOne({ _id: id });

        res.status(200).json({
            msg: 'La empresa se actualizó correctamente.',
            empresa: empresaActualizada
        });
    } catch (error) {
        console.error('Error al actualizar la empresa:', error);
        res.status(400).json({ error: error.message });
    }
};

export const obtenerEmpresas = async (req, res) => {
    const { orden } = req.params;
    let criterioOrdenamiento = {};

    const descripcionesOrden = {
        "1": "Ordenar por nombre ascendente",
        "2": "Ordenar por nombre descendente",
        "3": "Ordenar por años de experiencia ascendente",
        "4": "Ordenar por años de experiencia descendente",
        "5": "Ordenar por categoría ascendente",
        "6": "Ordenar por categoría descendente",
        "default": "Ordenar por nombre ascendente"  
    };

        switch (orden) {
        case "1":
            criterioOrdenamiento["nombreEmpresa"] = 1;
            break;
        case "2":
            criterioOrdenamiento["nombreEmpresa"] = -1;
            break;
        case "3":
            criterioOrdenamiento["añosExperiencia"] = 1;
            break;
        case "4":
            criterioOrdenamiento["añosExperiencia"] = -1;
            break;
        case "5":
            criterioOrdenamiento["categoriaEmpresa"] = 1;
            break;
        case "6":
            criterioOrdenamiento["categoriaEmpresa"] = -1;
            break;
        default:
            criterioOrdenamiento["nombreEmpresa"] = 1;
            break;
    }

    try {
        const empresas = await Empresa.find().sort(criterioOrdenamiento);
        res.status(200).json({
            orden: descripcionesOrden[orden] || descripcionesOrden["default"],
            empresas,
        });
    } catch (error) {
        console.error("Error al obtener empresas:", error);
        res.status(500).json({
            message: "Error al obtener empresas",
            error: error.message,
        });
    }
};

export const generarReporte = async (req, res) => {

    try {

        const empresas = await Empresa.find();

        const workbook = new Excel.Workbook();

        const worksheet = workbook.addWorksheet('Empresas');

        worksheet.columns = [
            { header: 'Nombre', key: 'nombreEmpresa', width: 30 },
            { header: 'Impacto', key: 'nivelImpacto', width: 20 },
            { header: 'Años Experiencia', key: 'añosExperiencia', width: 20 },
            { header: 'Categoría', key: 'categoriaEmpresa', width: 25 },
        ];

        empresas.forEach(empresa => {
            worksheet.addRow({
                nombreEmpresa: empresa.nombreEmpresa,
                nivelImpacto: empresa.nivelImpacto,
                añosExperiencia: empresa.añosExperiencia,
                categoriaEmpresa: empresa.categoriaEmpresa
            })
        });

        const buffer = await workbook.xlsx.writeBuffer();

        res.attachment('reporte-gestorEmpresas.xlsx');

        res.send(buffer);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }

}
