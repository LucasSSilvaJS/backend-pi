import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Odonto-legal",
            version: "1.0.0",
            description: "API de perícia criminal odonto-legal",
        },
        servers: [
            {
                url: "https://odontolegal-api.onrender.com/",
                description: "Produção"
            },
            {
                url: "http://localhost:88/",
                description: "Desenvolvimento local"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    required: ["username", "email", "password", "cargo"],
                    properties: {
                        username: {
                            type: "string",
                            description: "Nome de usuário único",
                        },
                        email: {
                            type: "string",
                            description: "E-mail único",
                        },
                        password: {
                            type: "string",
                            description: "Senha do usuário",
                        },
                        cargo: {
                            type: "string",
                            enum: ["perito", "assistente", "admin"],
                            description: "Cargo do usuário",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de criação do usuário",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data da última atualização do usuário",
                        }
                    },
                },
                Paciente: {
                    type: "object",
                    required: ["status", "caso"],
                    properties: {
                        nome: {
                            type: "string",
                            description: "Nome completo do paciente",
                        },
                        cpf: {
                            type: "string",
                            description: "CPF do paciente (único)",
                        },
                        rg: {
                            type: "string",
                            description: "RG do paciente (único)",
                        },
                        status: {
                            type: "string",
                            description: "Status do paciente",
                        },
                        caso: {
                            type: "string",
                            description: "ID do caso relacionado",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de criação do paciente",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data da última atualização do paciente",
                        }
                    },
                },
                Caso: {
                    type: "object",
                    required: ["titulo", "descricao", "status", "dataAbertura", "dataOcorrencia"],
                    properties: {
                        titulo: {
                            type: "string",
                            description: "Título do caso",
                        },
                        descricao: {
                            type: "string",
                            description: "Descrição do caso",
                        },
                        status: {
                            type: "string",
                            enum: ["Em andamento", "Finalizado", "Arquivado"],
                            description: "Status do caso",
                            default: "Em andamento"
                        },
                        dataAbertura: {
                            type: "string",
                            format: "date-time",
                            description: "Data de abertura do caso",
                        },
                        dataFechamento: {
                            type: "string",
                            format: "date-time",
                            description: "Data de fechamento do caso (opcional)",
                        },
                        dataOcorrencia: {
                            type: "string",
                            format: "date-time",
                            description: "Data da ocorrência",
                        },
                        paciente: {
                            type: "string",
                            description: "ID do paciente relacionado",
                        },
                        evidencia: {
                            type: "string",
                            description: "ID da evidência relacionada",
                        },
                        localizacao: {
                            type: "object",
                            properties: {
                                latitude: {
                                    type: "string",
                                    description: "Latitude do local",
                                },
                                longitude: {
                                    type: "string",
                                    description: "Longitude do local",
                                },
                            },
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de criação do caso",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data da última atualização do caso",
                        }
                    },
                },
                Evidencia: {
                    type: "object",
                    required: ["tipo", "dataColeta", "status", "coletadaPor", "urlEvidencia"],
                    properties: {
                        tipo: {
                            type: "string",
                            description: "Tipo de evidência",
                        },
                        dataColeta: {
                            type: "string",
                            format: "date-time",
                            description: "Data de coleta da evidência",
                        },
                        status: {
                            type: "string",
                            enum: ["Em análise", "Concluído"],
                            description: "Status da evidência",
                            default: "Em análise"
                        },
                        coletadaPor: {
                            type: "string",
                            description: "ID do usuário que coletou a evidência",
                        },
                        urlEvidencia: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            description: "URLs para acessar as evidências",
                        },
                        caso: {
                            type: "string",
                            description: "ID do caso relacionado",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de criação da evidência",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data da última atualização da evidência",
                        }
                    },
                },
                Laudo: {
                    type: "object",
                    required: ["titulo", "peritoResponsavel", "dataCriacao", "parecer", "detalhamento", "conclusao"],
                    properties: {
                        titulo: {
                            type: "string",
                            description: "Título do laudo",
                        },
                        peritoResponsavel: {
                            type: "string",
                            description: "ID do perito responsável",
                        },
                        dataCriacao: {
                            type: "string",
                            format: "date-time",
                            description: "Data de criação do laudo",
                        },
                        parecer: {
                            type: "object",
                            required: ["caso"],
                            properties: {
                                caso: {
                                    type: "string",
                                    description: "ID do caso relacionado",
                                },
                            },
                        },
                        detalhamento: {
                            type: "string",
                            description: "Detalhamento do laudo",
                        },
                        conclusao: {
                            type: "string",
                            description: "Conclusão do laudo",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de criação do laudo",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data da última atualização do laudo",
                        }
                    },
                },
            }
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./router/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);