import Relatorio from '../models/relatorio.model.js';
import User from '../models/user.model.js';
import Caso from '../models/caso.model.js';
import Vitima from '../models/vitima.model.js';
import Odontograma from '../models/odontograma.model.js';
import Evidencia from '../models/evidencia.model.js';
import geminiService from '../services/gemini.service.js';

export const createRelatorio = async (req, res) => {
    try {
        const { titulo, conteudo, peritoResponsavel, userId, casoId } = req.body;

        // Verifica se o caso já tem um relatório
        const caso = await Caso.findById(casoId);
        if (!caso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }

        if (caso.relatorio) {
            return res.status(400).json({ error: 'Este caso já possui um relatório. Atualize o relatório existente ou remova-o primeiro.' });
        }

        const relatorio = new Relatorio({
            titulo,
            conteudo,
            peritoResponsavel
        });
        const createdRelatorio = await relatorio.save();

        // Atualiza o usuário com o novo relatório
        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { relatorios: createdRelatorio._id } },
            { new: true }
        );

        // Atualiza o caso com o novo relatório
        await Caso.findByIdAndUpdate(
            casoId,
            { relatorio: createdRelatorio._id },
            { new: true }
        );

        res.status(201).json(createdRelatorio);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar relatório' });
    }
};

export const getAllRelatorios = async (req, res) => {
    try {
        const relatorios = await Relatorio.find().populate('peritoResponsavel');
        res.status(200).json(relatorios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar relatórios' });
    }
};

export const getRelatorioById = async (req, res) => {
    try {
        const relatorio = await Relatorio.findById(req.params.id).populate('peritoResponsavel');
        if (!relatorio) {
            return res.status(404).json({ error: 'Relatório não encontrado' });
        }
        res.status(200).json(relatorio);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar relatório por ID' });
    }
};

export const updateRelatorio = async (req, res) => {
    try {
        const { titulo, conteudo, peritoResponsavel } = req.body;
        const relatorio = await Relatorio.findByIdAndUpdate(
            req.params.id,
            { titulo, conteudo, peritoResponsavel },
            { new: true }
        );
        if (!relatorio) {
            return res.status(404).json({ error: 'Relatório não encontrado' });
        }
        res.status(200).json(relatorio);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar relatório' });
    }
};

export const deleteRelatorio = async (req, res) => {
    try {
        const { userId, casoId } = req.body;
        const relatorio = await Relatorio.findByIdAndDelete(req.params.id);
        if (!relatorio) {
            return res.status(404).json({ error: 'Relatório não encontrado' });
        }

        // Remove o relatório do usuário
        await User.findByIdAndUpdate(
            userId,
            { $pull: { relatorios: relatorio._id } },
            { new: true }
        );

        // Remove o relatório do caso
        await Caso.findByIdAndUpdate(
            casoId,
            { $unset: { relatorio: 1 } },
            { new: true }
        );

        res.status(200).json({ message: 'Relatório deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar relatório' });
    }
};

export const generateRelatorioWithGemini = async (req, res) => {
    try {
        const { casoId, userId } = req.body;

        // Busca o caso e popula todas as relações necessárias
        const caso = await Caso.findById(casoId)
            .populate({
                path: 'vitimas',
                populate: {
                    path: 'odontograma'
                }
            })
            .populate({
                path: 'evidencias',
                populate: [
                    { path: 'imagens' },
                    { path: 'textos' },
                    { path: 'coletadaPor' }
                ]
            });

        if (!caso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }

        if (caso.relatorio) {
            return res.status(400).json({ error: 'Este caso já possui um relatório. Atualize o relatório existente ou remova-o primeiro.' });
        }

        // Prepara o prompt para o Gemini
        const prompt = `Gere um relatório de perícia odontolegal detalhado com base nas seguintes informações:

CASO:
Título: ${caso.titulo}
Descrição: ${caso.descricao}
Status: ${caso.status}
Data de Abertura: ${caso.dataAbertura}

VÍTIMAS:
${caso.vitimas.map(vitima => `
Vítima ${vitima.nic}:
- Nome: ${vitima.nome || 'Não informado'}
- Gênero: ${vitima.genero || 'Não informado'}
- Idade: ${vitima.idade || 'Não informada'}
- Documento: ${vitima.documento || 'Não informado'}
- Endereço: ${vitima.endereco || 'Não informado'}
- Cor/Etnia: ${vitima.corEtnia || 'Não informada'}
- Odontogramas: ${vitima.odontograma.map(odonto => `
  * Identificação: ${odonto.identificacao}
  * Observações: ${odonto.observacao}`).join('\n') || 'Nenhum odontograma registrado'}
`).join('\n')}

EVIDÊNCIAS:
${caso.evidencias.map(evidencia => `
Evidência ${evidencia._id}:
- Tipo: ${evidencia.tipo}
- Data de Coleta: ${evidencia.dataColeta}
- Status: ${evidencia.status}
- Localização: ${evidencia.geolocalizacao ? `Lat: ${evidencia.geolocalizacao.latitude}, Long: ${evidencia.geolocalizacao.longitude}` : 'Não informada'}
- Imagens:
${evidencia.imagens.map(imagem => `  * ${imagem.imagemUrl}`).join('\n') || '  * Nenhuma imagem registrada'}
- Textos:
${evidencia.textos.map(texto => `  * ${texto.conteudo}`).join('\n') || '  * Nenhum texto registrado'}
`).join('\n')}

Por favor, gere um relatório detalhado incluindo:
1. Introdução e contextualização do caso
2. Descrição das vítimas e suas características
3. Análise dos odontogramas e achados odontológicos
4. Análise das evidências coletadas
5. Conclusões e recomendações
6. Data e assinatura do perito

O relatório deve seguir as normas técnicas de perícia odontolegal e ser adequado para uso em processos legais.`;

        // Gera o relatório usando o Gemini
        const conteudoRelatorio = await geminiService.generateResponse(prompt);

        // Cria o novo relatório
        const relatorio = new Relatorio({
            titulo: `Relatório de Perícia Odontolegal - Caso ${caso.titulo}`,
            conteudo: conteudoRelatorio,
            peritoResponsavel: userId
        });

        const createdRelatorio = await relatorio.save();

        // Atualiza o usuário com o novo relatório
        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { relatorios: createdRelatorio._id } },
            { new: true }
        );

        // Atualiza o caso com o novo relatório
        await Caso.findByIdAndUpdate(
            casoId,
            { relatorio: createdRelatorio._id },
            { new: true }
        );

        res.status(201).json(createdRelatorio);
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        res.status(500).json({ error: 'Erro ao gerar relatório com Gemini' });
    }
};

