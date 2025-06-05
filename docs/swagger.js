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
                url: "https://backend-pi-26cz.onrender.com/",
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
                Vitima: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "ID da vítima",
                            example: "627b6a9c4f6f6e62d5c7b6a9"
                        },
                        nic: {
                            type: "string",
                            description: "Número de Identificação Civil",
                            example: "12345678",
                            nullable: true
                        },
                        nome: {
                            type: "string",
                            description: "Nome da vítima",
                            example: "Fulano de Tal",
                            nullable: true
                        },
                        genero: {
                            type: "string",
                            description: "Gênero da vítima (M/F)",
                            example: "M",
                            nullable: true
                        },
                        idade: {
                            type: "number",
                            description: "Idade da vítima",
                            example: 25,
                            nullable: true
                        },
                        documento: {
                            type: "string",
                            description: "Documento da vítima (RG/CPF) - Único",
                            example: "123456789",
                            nullable: true,
                            unique: true
                        },
                        endereco: {
                            type: "string",
                            description: "Endereço da vítima",
                            example: "Rua das Flores, 123",
                            nullable: true
                        },
                        corEtnia: {
                            type: "string",
                            description: "Cor/Etnia da vítima",
                            example: "Branca",
                            nullable: true
                        },
                        odontograma: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/Odontograma"
                            },
                            description: "Odontograma(s) relacionado(s) à vítima",
                            nullable: true
                        }
                    }
                },
                User: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "ID do usuário",
                            example: "627b6a9c4f6f6e62d5c7b6a9",
                        },
                        username: {
                            type: "string",
                            description: "Nome de usuário",
                            example: "joao",
                        },
                        email: {
                            type: "string",
                            description: "E-mail do usuário",
                            example: "joao@exemplo.com",
                        },
                        password: {
                            type: "string",
                            description: "Senha do usuário",
                            example: "123456",
                            writeOnly: true,
                        },
                        cargo: {
                            type: "string",
                            description: "Cargo do usuário",
                            example: "admin",
                        },
                        fotoPerfil: {
                            type: "string",
                            description: "URL da foto de perfil do usuário",
                            example: "https://res.cloudinary.com/example/image/upload/v1234567890/profile.jpg",
                            nullable: true
                        },
                        casos: {
                            type: "array",
                            items: {
                                type: "string",
                                description: "ID do caso",
                                example: "627b6a9c4f6f6e62d5c7b6a9",
                            },
                            description: "Casos relacionados ao usuário",
                        },
                        relatorios: {
                            type: "array",
                            items: {
                                type: "string",
                                description: "ID do relatório",
                                example: "627b6a9c4f6f6e62d5c7b6a9",
                            },
                            description: "Relatórios relacionados ao usuário",
                        },
                        evidencias: {
                            type: "array",
                            items: {
                                type: "string",
                                description: "ID da evidência",
                                example: "627b6a9c4f6f6e62d5c7b6a9",
                            },
                            description: "Evidências relacionadas ao usuário",
                        },
                    },
                },
                TextoEvidencia: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "ID do texto de evidência",
                            example: "627b6a9c4f6f6e62d5c7b6a9",
                        },
                        conteudo: {
                            type: "string",
                            description: "Conteúdo do texto de evidência",
                            example: "Texto de evidência",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de criação do texto de evidência",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de atualização do texto de evidência",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                    },
                },
                Relatorio: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "ID do relatório",
                            example: "627b6a9c4f6f6e62d5c7b6a9",
                        },
                        titulo: {
                            type: "string",
                            description: "Título do relatório",
                            example: "Relatório de teste",
                        },
                        conteudo: {
                            type: "string",
                            description: "Conteúdo do relatório",
                            example: "Conteúdo do relatório de teste",
                        },
                        peritoResponsavel: {
                            type: "string",
                            description: "ID do perito responsável pelo relatório",
                            example: "627b6a9c4f6f6e62d5c7b6a9",
                        },
                        dataCriacao: {
                            type: "string",
                            format: "date-time",
                            description: "Data de criação do relatório",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de criação do relatório",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de atualização do relatório",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                    }
                },
                Odontograma: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "ID do odontograma",
                            example: "627b6a9c4f6f6e62d5c7b6a9"
                        },
                        identificacao: {
                            type: "number",
                            description: "Identificação do odontograma",
                            example: 1
                        },
                        observacao: {
                            type: "string",
                            description: "Observação do odontograma",
                            example: "Observação do odontograma"
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de criação do odontograma",
                            example: "2022-01-01T12:00:00.000Z"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de atualização do odontograma",
                            example: "2022-01-01T12:00:00.000Z"
                        }
                    }
                },
                Laudo: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "ID do laudo",
                            example: "627b6a9c4f6f6e62d5c7b6a9",
                        },
                        descricao: {
                            type: "string",
                            description: "Descrição do laudo",
                            example: "Descrição do laudo",
                        },
                        conclusao: {
                            type: "string",
                            description: "Conclusão do laudo",
                            example: "Conclusão do laudo",
                        },
                        peritoResponsavel: {
                            type: "string",
                            description: "ID do perito responsável",
                            example: "627b6a9c4f6f6e62d5c7b6a9",
                        },
                        dataCriacao: {
                            type: "string",
                            format: "date-time",
                            description: "Data de criação do laudo",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                    },
                },
                ImagemEvidencia: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "ID da imagem de evidência",
                            example: "627b6a9c4f6f6e62d5c7b6a9",
                        },
                        imagemUrl: {
                            type: "string",
                            description: "URL da imagem de evidência",
                            example: "https://exemplo.com/imagem.jpg",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de criação da imagem de evidência",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de atualização da imagem de evidência",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                    },
                },
                Evidencia: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "ID da evidência",
                            example: "627b6a9c4f6f6e62d5c7b6a9"
                        },
                        tipo: {
                            type: "string",
                            description: "Tipo da evidência",
                            example: "FOTO"
                        },
                        dataColeta: {
                            type: "string",
                            format: "date-time",
                            description: "Data de coleta da evidência",
                            example: "2022-01-01T00:00:00.000Z"
                        },
                        status: {
                            type: "string",
                            description: "Status da evidência",
                            enum: ["Em análise", "Concluído"],
                            example: "Em análise",
                            default: "Em análise"
                        },
                        coletadaPor: {
                            type: "string",
                            description: "ID do usuário que coletou a evidência",
                            example: "627b6a9c4f6f6e62d5c7b6a9"
                        },
                        geolocalizacao: {
                            type: "object",
                            required: true,
                            properties: {
                                latitude: {
                                    type: "string",
                                    description: "Latitude da localização da evidência",
                                    example: "-23.555555"
                                },
                                longitude: {
                                    type: "string",
                                    description: "Longitude da localização da evidência",
                                    example: "-46.645645"
                                }
                            }
                        },
                        imagens: {
                            type: "array",
                            items: {
                                type: "string",
                                description: "ID da imagem de evidência",
                                example: "627b6a9c4f6f6e62d5c7b6a9"
                            },
                            minItems: 1
                        },
                        textos: {
                            type: "array",
                            items: {
                                type: "string",
                                description: "ID do texto de evidência",
                                example: "627b6a9c4f6f6e62d5c7b6a9"
                            },
                            minItems: 1
                        },
                        laudo: {
                            type: "string",
                            description: "ID do laudo associado à evidência",
                            example: "627b6a9c4f6f6e62d5c7b6a9",
                            nullable: true
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de criação da evidência",
                            example: "2022-01-01T12:00:00.000Z"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de atualização da evidência",
                            example: "2022-01-01T12:00:00.000Z"
                        }
                    }
                },
                Caso: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "ID do caso",
                            example: "627b6a9c4f6f6e62d5c7b6a9",
                        },
                        titulo: {
                            type: "string",
                            description: "Título do caso",
                            example: "Caso de teste",
                        },
                        descricao: {
                            type: "string",
                            description: "Descrição do caso",
                            example: "Descrição do caso de teste",
                        },
                        status: {
                            type: "string",
                            description: "Status do caso",
                            enum: ["Em andamento", "Finalizado", "Arquivado"],
                            default: "Em andamento",
                            example: "Em andamento",
                        },
                        dataAbertura: {
                            type: "string",
                            format: "date-time",
                            description: "Data de abertura do caso",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                        dataFechamento: {
                            type: "string",
                            format: "date-time",
                            description: "Data de fechamento do caso",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                        evidencias: {
                            type: "array",
                            items: {
                                type: "string",
                                description: "ID da evidência",
                                example: "627b6a9c4f6f6e62d5c7b6a9",
                            },
                        },
                        relatorios: {
                            type: "array",
                            items: {
                                type: "string",
                                description: "ID do relatório",
                                example: "627b6a9c4f6f6e62d5c7b6a9",
                            },
                        },
                        vitimas: {
                            type: "array",
                            items: {
                                type: "string",
                                description: "ID da vítima",
                                example: "627b6a9c4f6f6e62d5c7b6a9",
                            },
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de criação do caso",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de atualização do caso",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                    },
                },
            }
        },
    },
    apis: ["./router/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);