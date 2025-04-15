import Caso from '../models/caso.model.js';
import Evidencia from '../models/evidencia.model.js';

export const getDashboardCaso = async (req, res) => {
    try {
        const casos = await Caso.find();

        if (!casos) {
            return res.status(404).json({ error: 'Nenhum caso encontrado' });
        }

        const quantidadeCasos = casos.length;
        const quantidadeStatus = {};

        casos.forEach(caso => {
            if (!quantidadeStatus[caso.status]) {
                quantidadeStatus[caso.status] = 1;
            } else {
                quantidadeStatus[caso.status]++;
            }
        });

        const agora = new Date();
        const inicioDoMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
        const fimDoMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 0);

        let quantidadeCasosNoMes = await Caso.countDocuments({
            dataAbertura: {
                $gte: inicioDoMes,
                $lte: fimDoMes
            }
        });

        if (!quantidadeCasosNoMes) {
            quantidadeCasosNoMes = 0;
        }

        res.status(200).json({
            quantidadeCasos,
            quantidadeStatus,
            quantidadeCasosNoMes
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export const getDashboardEvidencia = async (req, res) => {
    try {
        const evidencias = await Evidencia.find();
        if (!evidencias) {
            return res.status(404).json({ error: 'Nenhuma evidência encontrada' });
        }
        const quantidadeEvidencias = evidencias.length;
        const quantidadeStatus = {};
        evidencias.forEach(evidencia => {
            if (!quantidadeStatus[evidencia.status]) {
                quantidadeStatus[evidencia.status] = 1;
            } else {
                quantidadeStatus[evidencia.status]++;
            }
        });
        const agora = new Date();
        const inicioDoMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
        const fimDoMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 0);
        let quantidadeEvidenciasNoMes = await Evidencia.countDocuments({
            dataColeta: {
                $gte: inicioDoMes,
                $lte: fimDoMes
            }
        });
        if (!quantidadeEvidenciasNoMes) {
            quantidadeEvidenciasNoMes = 0;
        }
        res.status(200).json({
            quantidadeEvidencias,
            quantidadeStatus,
            quantidadeEvidenciasNoMes
        });
    } catch (error) {
        console.error(error);
        return res.status(505).json({ error: 'Erro interno do servidor' });
    }
};
