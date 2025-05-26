const mongoose = require('mongoose');

const LaudoSchema = new mongoose.Schema({
    // Preâmbulo (local, data e hora da perícia, autoridade requisitante, peritos designados, identificação da pessoa a ser periciada, exame a ser realizado e finalidade, as perguntas a serem respondidos)
    preambulo: {
        type: {
            local: { type: String, required: true },
            data: { type: Date, required: true },
            hora: { type: String, required: true },
            autoridadeRequisitante: { type: String, required: true },
            peritosDesignados: [{ type: String, required: true }],
            identificacaoPessoaPericiada: { type: String, required: true },
            exameRealizado: { type: String, required: true },
            finalidade: { type: String, required: true },
            perguntas: [{ type: String, required: true }],
        },
        required: true,
    },
    // Histórico (relato sucinto do caso)
    historico: { type: String, required: true },
    // Descrição (achados encontrados durante o exame pericial, todos os detalhes. É a parte mais importante)
    descricao: { type: String, required: true },
    // Discussão (parte que o perito faz as análises que achar necessário, é o debate, a análise científica do caso e possíveis hipóteses)
    discussao: { type: String, required: true },
    // Conclusão: É a síntese da análise dos dados descritos e discutidos. Posição final do perito
    conclusao: { type: String, required: true },
    // Resposta aos quesitos: resposta sucinta às perguntas feitas pela autoridade que solicitou a perícia
    respostasQuesitos: { type: String, required: true },
    peritoResponsavel: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dataCriacao: { type: Date, required: true, default: Date.now},
}, { timestamps: true });

const Laudo = mongoose.model('Laudo', LaudoSchema);

module.exports = Laudo;