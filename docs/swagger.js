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
                Vitima: {
                    type: "object",
                    properties: {
                        nic: {
                            type: "string",
                            description: "N mero de Identifica o Civil",
                            example: "12345678",
                        },
                        nome: {
                            type: "string",
                            description: "Nome da vitima",
                            example: "Fulano de Tal",
                        },
                        genero: {
                            type: "string",
                            description: "G nero da vitima (M/F)",
                            example: "M",
                        },
                        idade: {
                            type: "integer",
                            description: "Idade da vitima",
                            example: 25,
                        },
                        documento: {
                            type: "string",
                            description: "Documento da vitima (RG/CPF)",
                            example: "123456789",
                        },
                        endereco: {
                            type: "string",
                            description: "Endere o da vitima",
                            example: "Rua das Flores, 123",
                        },
                        corEtnia: {
                            type: "string",
                            description: "Cor/Etnia da vitima",
                            example: "Branca",
                        },
                        odontograma: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/Odontograma",
                            },
                            description: "Odontograma(s) relacionado(s)   vitima",
                        },
                    },
                },
                User: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "ID do usu rio",
                            example: "627b6a9c4f6f6e62d5c7b6a9",
                        },
                        username: {
                            type: "string",
                            description: "Nome de usu rio do usu rio",
                            example: "joao",
                        },
                        email: {
                            type: "string",
                            description: "E-mail do usu rio",
                            example: "joao@exemplo.com",
                        },
                        password: {
                            type: "string",
                            description: "Senha do usu rio",
                            example: "123456",
                            writeOnly: true,
                        },
                        cargo: {
                            type: "string",
                            description: "Cargo do usuario",
                            example: "admin",
                        },
                        casos: {
                            type: "array",
                            items: {
                                type: "string",
                                description: "ID do caso",
                                example: "627b6a9c4f6f6e62d5c7b6a9",
                            },
                            description: "Casos relacionados ao usu rio",
                        },
                        relatorios: {
                            type: "array",
                            items: {
                                type: "string",
                                description: "ID do relatorio",
                                example: "627b6a9c4f6f6e62d5c7b6a9",
                            },
                            description: "Relat rios relacionados ao usu rio",
                        },
                        evidencias: {
                            type: "array",
                            items: {
                                type: "string",
                                description: "ID da evid ncia",
                                example: "627b6a9c4f6f6e62d5c7b6a9",
                            },
                            description: "Evid ncias relacionadas ao usu rio",
                        },
                    },
                },
                TextoEvidencia: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "ID do texto de evid ncia",
                            example: "627b6a9c4f6f6e62d5c7b6a9",
                        },
                        conteudo: {
                            type: "string",
                            description: "Conte do do texto de evid ncia",
                            example: "Texto de evid ncia",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de cria o do texto de evid ncia",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de atualiza o do texto de evid ncia",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                    },
                },
                Relatorio: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "ID do relatorio",
                            example: "627b6a9c4f6f6e62d5c7b6a9",
                        },
                        titulo: {
                            type: "string",
                            description: "T tulo do relatorio",
                            example: "Relat rio de teste",
                        },
                        conteudo: {
                            type: "string",
                            description: "Conte do do relatorio",
                            example: "Conte do do relatorio de teste",
                        },
                        peritoResponsavel: {
                            type: "string",
                            description: "ID do perito respons vel pelo relatorio",
                            example: "627b6a9c4f6f6e62d5c7b6a9",
                        },
                        dataCriacao: {
                            type: "string",
                            format: "date-time",
                            description: "Data de cria o do relatorio",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de cria o do relatorio",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de atualiza o do relatorio",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                    },
                },
                Odontograma: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "ID do odontograma",
                            example: "627b6a9c4f6f6e62d5c7b6a9",
                        },
                        identificacao: {
                            type: "number",
                            description: "Identifica o do odontograma",
                            example: 1,
                        },
                        observacao: {
                            type: "string",
                            description: "Observa o do odontograma",
                            example: "Observa o do odontograma",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de cria o do odontograma",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de atualiza o do odontograma",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                    },
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
                            description: "Descri o do laudo",
                            example: "Descri o do laudo",
                        },
                        conclusao: {
                            type: "string",
                            description: "Conclus o do laudo",
                            example: "Conclus o do laudo",
                        },
                        peritoResponsavel: {
                            type: "string",
                            description: "ID do perito respons vel",
                            example: "627b6a9c4f6f6e62d5c7b6a9",
                        },
                        dataCriacao: {
                            type: "string",
                            format: "date-time",
                            description: "Data de cria o do laudo",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                    },
                },
                ImagemEvidencia: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "ID da imagem de evid ncia",
                            example: "627b6a9c4f6f6e62d5c7b6a9",
                        },
                        imagemUrl: {
                            type: "string",
                            description: "URL da imagem de evid ncia",
                            example: "https://exemplo.com/imagem.jpg",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de cria o da imagem de evid ncia",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de atualiza o da imagem de evid ncia",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                    },
                },
                Evidencia: {
                    type: "object",
                    properties: {
                        tipo: {
                            type: "string",
                            description: "Tipo da evidência",
                            example: "FOTO",
                        },
                        dataColeta: {
                            type: "string",
                            format: "date-time",
                            description: "Data de coleta da evidência",
                            example: "2022-01-01T00:00:00.000Z",
                        },
                        status: {
                            type: "string",
                            description: "Status da evidência",
                            enum: ["Em análise", "Concluído"],
                            example: "Em análise",
                        },
                        coletadaPor: {
                            type: "string",
                            description: "ID do usuário que coletou a evidência",
                            example: "627b6a9c4f6f6e62d5c7b6a9",
                        },
                        geolocalizacao: {
                            type: "object",
                            properties: {
                                latitude: {
                                    type: "string",
                                    description: "Latitude da localização da evidência",
                                    example: "-23.555555",
                                },
                                longitude: {
                                    type: "string",
                                    description: "Longitude da localização da evidência",
                                    example: "-46.645645",
                                },
                            },
                        },
                        imagens: {
                            type: "array",
                            items: {
                                type: "string",
                                description: "ID da imagem de evidência",
                                example: "627b6a9c4f6f6e62d5c7b6a9",
                            },
                        },
                        textos: {
                            type: "array",
                            items: {
                                type: "string",
                                description: "ID do texto de evidência",
                                example: "627b6a9c4f6f6e62d5c7b6a9",
                            },
                        },
                        laudo: {
                            type: "string",
                            description: "ID do laudo associado à evidência",
                            example: "627b6a9c4f6f6e62d5c7b6a9",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de criação da evidência",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Data de atualização da evidência",
                            example: "2022-01-01T12:00:00.000Z",
                        },
                    },
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
            },
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./router/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);