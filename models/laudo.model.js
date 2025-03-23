import mongoose from "mongoose";

const LaudoSchema = new mongoose.Schema({
    odonto_id: {type: String, required: true},
    paciente_id: {type: String, required: true},
    motivo: {type: String, required: true},
    historico_clinico: {type: String, required: true},
    exame_clinico: {
        descricao: {type: String, required: true},
        imagens_url: {type: [String], required: false},
    },
    descricao_lesoes: {
        detalhamento: {type: String, required: false},
        grau_de_gravidade: {type: String, required: false},
        sequelas_permanentes: {type: Boolean, required: false},
    },
    conclusao: {type: String, required: true}
}, {timestamps: true});

const Laudo = mongoose.model('Laudo', LaudoSchema);

export default Laudo;

// Identificação do paciente e do profissional:
// Nome completo do paciente.
// Identificação do profissional responsável pela emissão do laudo (dentista), com registro no conselho regional de odontologia (CRO).

// Motivo da solicitação:
// Explicação sobre a razão do exame, como acidente de trânsito, lesão corporal, agressão física, reconhecimento de cadáver, etc.

// Histórico clínico:
// Breve histórico sobre a condição de saúde do paciente e os eventos que motivaram a solicitação do exame.

// Exame clínico e radiográfico:
// Descrição detalhada dos exames realizados, incluindo observações sobre dentes, gengivas, maxilares, e estruturas adjacentes.
// Caso seja necessário, deve incluir imagens radiográficas (como radiografias periapicais, panorâmicas ou tomografias), sempre que relevantes para o caso.

// Descrição das lesões (se houver):
// Detalhamento das lesões bucais ou faciais observadas, como fraturas dentárias, luxações, hematomas, cortes, ou outras lesões relacionadas.
// A descrição deve incluir o grau de gravidade e a possibilidade de sequelas permanentes, quando aplicável.

// Conclusão:
// Resumo das observações feitas durante o exame e uma conclusão sobre o impacto das lesões, se há sequelas, necessidade de tratamento odontológico, e, eventualmente, a relação com o caso legal.

// Assinatura e carimbo:
// Assinatura do profissional que elaborou o laudo, acompanhada do número de registro no CRO e do carimbo oficial.