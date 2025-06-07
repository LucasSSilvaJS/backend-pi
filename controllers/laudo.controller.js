import Laudo from '../models/laudo.model.js';
import Evidencia from '../models/evidencia.model.js';
import geminiService from '../services/gemini.service.js';

export const createLaudo = async (req, res) => {
    try {
        const { descricao, conclusao, peritoResponsavel, evidenciaId } = req.body;
        const laudo = new Laudo({ descricao, conclusao, peritoResponsavel });
        await laudo.save();

        const evidencia = await Evidencia.findByIdAndUpdate(evidenciaId, { $set: { laudo: laudo._id } }, { new: true });
        
        if (!evidencia) {
            return res.status(404).json({ error: 'Evidência n o encontrada' });
        }

        res.status(201).json({ message: 'Laudo criado com sucesso!', laudo });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar laudo' });
    }
};

export const getAllLaudos = async (req, res) => {
    try {
        const laudos = await Laudo.find().populate('peritoResponsavel');
        res.status(200).json(laudos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter laudos' });
    }
};

export const getLaudoById = async (req, res) => {
    try {
        const { id } = req.params;
        const laudo = await Laudo.findById(id).populate('peritoResponsavel');
        if (!laudo) {
            return res.status(404).json({ error: 'Laudo não encontrado' });
        }
        res.status(200).json(laudo);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter laudo' });
    }
};

export const updateLaudo = async (req, res) => {
    try {
        const { id } = req.params;
        const { descricao, conclusao, peritoResponsavel } = req.body;
        const laudo = await Laudo.findByIdAndUpdate(id, { descricao, conclusao, peritoResponsavel }, { new: true });
        if (!laudo) {
            return res.status(404).json({ error: 'Laudo não encontrado' });
        }
        res.status(200).json({ message: 'Laudo atualizado com sucesso!', laudo });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar laudo' });
    }
};

export const deleteLaudo = async (req, res) => {
    try {
        const { evidenciaId } = req.body;
        const { id } = req.params;
        const laudo = await Laudo.findByIdAndRemove(id);
        if (!laudo) {
            return res.status(404).json({ error: 'Laudo não encontrado' });
        }

        await Evidencia.findByIdAndUpdate(evidenciaId, { $set: { laudo: null } });

        res.status(200).json({ message: 'Laudo deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar laudo' });
    }
};

export const generateLaudoWithGemini = async (req, res) => {
    try {
        const { evidenciaId, peritoResponsavel } = req.body;

        // Busca a evidência e popula as relações necessárias
        const evidencia = await Evidencia.findById(evidenciaId)
            .populate('imagens')
            .populate('textos');

        if (!evidencia) {
            return res.status(404).json({ error: 'Evidência não encontrada' });
        }

        // Verifica se já existe um laudo para esta evidência
        if (evidencia.laudo) {
            return res.status(400).json({ error: 'Esta evidência já possui um laudo. Atualize o laudo existente ou remova-o primeiro.' });
        }

        // Prepara o prompt para o Gemini
        const promptLaudo = `Gere um laudo pericial detalhado com base nas seguintes informações:

EVIDÊNCIA:
Tipo: ${evidencia.tipo}
Data de Coleta: ${evidencia.dataColeta}
Status: ${evidencia.status}
Localização: ${evidencia.geolocalizacao ? `Lat: ${evidencia.geolocalizacao.latitude}, Long: ${evidencia.geolocalizacao.longitude}` : 'Não informada'}

IMAGENS:
${evidencia.imagens.map(imagem => `- ${imagem.imagemUrl}`).join('\n') || 'Nenhuma imagem registrada'}

TEXTOS:
${evidencia.textos.map(texto => `- ${texto.conteudo}`).join('\n') || 'Nenhum texto registrado'}

Por favor, gere um laudo pericial detalhado incluindo:
1. Introdução e contextualização da evidência
2. Descrição detalhada dos elementos encontrados
3. Análise técnica das evidências
4. Metodologia utilizada na análise
5. Conclusões técnicas
6. Data e assinatura do perito

O laudo deve seguir as normas técnicas de perícia e ser adequado para uso em processos legais.`;

        // Prompt específico para a conclusão
        const promptConclusao = `Com base nas seguintes informações da evidência, gere uma conclusão técnica concisa e objetiva para um laudo pericial:

EVIDÊNCIA:
Tipo: ${evidencia.tipo}
Data de Coleta: ${evidencia.dataColeta}
Status: ${evidencia.status}

IMAGENS:
${evidencia.imagens.map(imagem => `- ${imagem.imagemUrl}`).join('\n') || 'Nenhuma imagem registrada'}

TEXTOS:
${evidencia.textos.map(texto => `- ${texto.conteudo}`).join('\n') || 'Nenhum texto registrado'}

A conclusão deve:
1. Ser objetiva e direta
2. Resumir os principais achados técnicos
3. Apresentar as conclusões técnicas de forma clara
4. Ser adequada para uso em processos legais
5. Ter no máximo 3 parágrafos`;

        // Gera o laudo e a conclusão usando o Gemini
        const [conteudoLaudo, conclusao] = await Promise.all([
            geminiService.generateResponse(promptLaudo),
            geminiService.generateResponse(promptConclusao)
        ]);

        // Cria o novo laudo
        const laudo = new Laudo({
            descricao: conteudoLaudo,
            conclusao: conclusao,
            peritoResponsavel
        });

        const createdLaudo = await laudo.save();

        // Atualiza a evidência com o novo laudo
        await Evidencia.findByIdAndUpdate(
            evidenciaId,
            { laudo: createdLaudo._id },
            { new: true }
        );

        res.status(201).json({
            message: 'Laudo gerado com sucesso usando IA',
            laudo: createdLaudo
        });
    } catch (error) {
        console.error('Erro ao gerar laudo com IA:', error);
        res.status(500).json({ error: 'Erro ao gerar laudo com IA' });
    }
};
