import Evidencia from "../models/evidencia.model.js";
import Caso from "../models/caso.model.js";
import Laudo from "../models/laudo.model.js";
import Paciente from "../models/paciente.model.js";
import User from "../models/user.model.js";

export const limparBanco = async (req, res) => {
    try {
        // Deletar todos os documentos de cada coleção
        await Evidencia.deleteMany({});
        await Caso.deleteMany({});
        await Laudo.deleteMany({});
        await Paciente.deleteMany({});
        // Não deletamos usuários para manter o acesso ao sistema
        // await User.deleteMany({});

        res.status(200).json({
            message: 'Banco de dados limpo com sucesso!',
            detalhes: {
                evidencias: 'Todas as evidências foram removidas',
                casos: 'Todos os casos foram removidos',
                laudos: 'Todos os laudos foram removidos',
                pacientes: 'Todos os pacientes foram removidos'
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            error: 'Erro ao limpar banco de dados',
            detalhes: err.message 
        });
    }
}; 