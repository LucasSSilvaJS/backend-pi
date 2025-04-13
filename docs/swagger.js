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
            },
        ],
    },
    apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);