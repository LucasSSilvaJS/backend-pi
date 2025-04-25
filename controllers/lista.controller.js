import Caso from '../models/caso.model.js';
import Evidencia from '../models/evidencia.model.js';
import Paciente from '../models/paciente.model.js';

export const listarCasos = async (req, res) => {
    try {
        const casos = await Caso.findAll({
            attributes: ['id', 'titulo'],
            include: [
                {
                    model: Evidencia,
                    attributes: ['id'],
                    as: 'evidencias'
                },
                {
                    model: Paciente,
                    attributes: ['id'],
                    as: 'paciente'
                }
            ]
        });

        const casosFormatados = casos.map(caso => ({
            id: caso.id,
            titulo: caso.titulo,
            evidencias: caso.evidencias.map(ev => ev.id),
            pacienteId: caso.paciente ? caso.paciente.id : null
        }));

        return res.status(200).json({
            success: true,
            data: casosFormatados
        });
    } catch (error) {
        console.error('Erro ao listar casos:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao listar casos',
            error: error.message
        });
    }
};
