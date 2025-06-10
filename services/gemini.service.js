import { GoogleGenerativeAI } from '@google/generative-ai';

// Configuração do Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class GeminiService {
    constructor() {
        // Inicializa o modelo com configurações padrão
        this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }

    /**
     * Remove formatação HTML e markdown do texto
     * @param {string} text - Texto com possível formatação
     * @returns {string} - Texto limpo sem formatação
     */
    cleanText(text) {
        if (!text) return '';
        
        return text
            // Remove tags HTML
            .replace(/<[^>]*>/g, '')
            // Remove markdown headers
            .replace(/^#{1,6}\s+/gm, '')
            // Remove markdown bold
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/__(.*?)__/g, '$1')
            // Remove markdown italic
            .replace(/\*(.*?)\*/g, '$1')
            .replace(/_(.*?)_/g, '$1')
            // Remove markdown code blocks
            .replace(/```[\s\S]*?```/g, '')
            .replace(/`([^`]+)`/g, '$1')
            // Remove markdown links
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            // Remove markdown lists
            .replace(/^[\s]*[-*+]\s+/gm, '')
            .replace(/^[\s]*\d+\.\s+/gm, '')
            // Remove múltiplas quebras de linha
            .replace(/\n\s*\n\s*\n/g, '\n\n')
            // Remove espaços extras no início e fim
            .trim();
    }

    /**
     * Gera uma resposta do Gemini baseada no prompt fornecido
     * @param {string} prompt - O texto do prompt para o modelo
     * @returns {Promise<string>} - A resposta gerada pelo modelo (texto puro)
     */
    async generateResponse(prompt) {
        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const rawText = response.text();
            
            // Retorna o texto limpo sem formatação
            return this.cleanText(rawText);
        } catch (error) {
            console.error('Erro ao gerar resposta do Gemini:', error);
            throw new Error('Falha ao gerar resposta do modelo');
        }
    }

    /**
     * Gera uma resposta do Gemini com contexto específico
     * @param {string} prompt - O texto do prompt para o modelo
     * @param {string} context - Contexto adicional para a geração
     * @returns {Promise<string>} - A resposta gerada pelo modelo (texto puro)
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
            const rawText = response.text();
            
            // Retorna o texto limpo sem formatação
            return this.cleanText(rawText);
        } catch (error) {
            console.error('Erro ao gerar resposta contextual do Gemini:', error);
            throw new Error('Falha ao gerar resposta contextual do modelo');
        }
    }
}

export default new GeminiService();
