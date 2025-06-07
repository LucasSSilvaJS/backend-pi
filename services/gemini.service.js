import { GoogleGenerativeAI } from '@google/generative-ai';

// Configuração do Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class GeminiService {
    constructor() {
        // Inicializa o modelo com configurações padrão
        this.model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    }

    /**
     * Gera uma resposta do Gemini baseada no prompt fornecido
     * @param {string} prompt - O texto do prompt para o modelo
     * @returns {Promise<string>} - A resposta gerada pelo modelo
     */
    async generateResponse(prompt) {
        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Erro ao gerar resposta do Gemini:', error);
            throw new Error('Falha ao gerar resposta do modelo');
        }
    }

    /**
     * Gera uma resposta do Gemini com contexto específico
     * @param {string} prompt - O texto do prompt para o modelo
     * @param {string} context - Contexto adicional para a geração
     * @returns {Promise<string>} - A resposta gerada pelo modelo
     */
    async generateResponseWithContext(prompt, context) {
        try {
            const chat = this.model.startChat({
                history: [
                    {
                        role: "user",
                        parts: context,
                    }
                ],
            });

            const result = await chat.sendMessage(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Erro ao gerar resposta contextual do Gemini:', error);
            throw new Error('Falha ao gerar resposta contextual do modelo');
        }
    }
}

export default new GeminiService();
