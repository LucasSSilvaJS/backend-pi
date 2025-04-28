import express from "express";
import mongoose from "mongoose";

import bodyParser from "body-parser";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import laudoRoutes from "./router/laudo.router.js";
import pacienteRoutes from "./router/paciente.router.js";
import evidenciaRoutes from "./router/evidencia.router.js";
import casoRoutes from "./router/caso.router.js";
import authRoutes from "./router/auth.router.js";
import dashboardRoutes from "./router/dashboard.router.js";
import adminRoutes from "./router/admin.router.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";

config();

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/';

const app = express();

const allowedOrigins = ['http://localhost:3000']

//middlewares
app.use(morgan('dev'));
app.use(cors({
    origin: (origin, callback) => {
        if(allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        }else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: true
}));
app.use(helmet());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//consumindo rotas
app.use('/evidencias', evidenciaRoutes);
app.use('/casos', casoRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/laudos', laudoRoutes);
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.json({
        objetivo: 'Backend para o projeto de PI Odonto-legal',
        rotas: [
            '/evidencias',
            '/casos',
            '/pacientes',
            '/laudos',
            '/auth',
            '/dashboard',
            '/admin',
            '/api-docs'            
        ],
        documentacao: 'https://odontolegal-api.onrender.com/api-docs'
    });
});

app.use((req, res) => {
    res.status(404).json({message: 'Essa rota não existe'});
});

//conectando ao mongoose
mongoose.connect(DB_URL)
.then(() => console.log('Conectado ao MongoDB!'))
.catch(err => console.error('Erro ao conectar:', err));

app.listen(PORT, () => {
    console.log(`Servidor conectado na porta ${PORT}`);
    console.log(`Documentação: https://odontolegal-api.onrender.com/api-docs`);
});