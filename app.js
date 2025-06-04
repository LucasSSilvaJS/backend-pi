import express from "express";
import mongoose from "mongoose";

import bodyParser from "body-parser";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import authRoutes from "./router/auth.router.js";
import casoRoutes from "./router/caso.router.js";
import dashboardRoutes from "./router/dashboard.router.js";
import evidenciaRoutes from "./router/evidencia.router.js";
import imagemEvidenciaRoutes from "./router/imagem.evidencia.router.js";
import laudoRoutes from "./router/laudo.router.js";
import odontogramaRoutes from "./router/odontograma.router.js";
import relatorioRoutes from "./router/relatorio.router.js";
import textoEvidenciaRoutes from "./router/texto.evidencia.router.js";
import vitimaRoutes from "./router/vitima.router.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";

config();

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/';

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//consumindo rotas - reorganizando a ordem
app.use('/auth', authRoutes);
app.use('/vitimas', vitimaRoutes);
app.use('/casos', casoRoutes);
app.use('/laudos', laudoRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/relatorios', relatorioRoutes);
app.use('/odontogramas', odontogramaRoutes);
app.use('/evidencias-imagens', imagemEvidenciaRoutes);
app.use('/evidencias-textos', textoEvidenciaRoutes);
app.use('/evidencias', evidenciaRoutes);

app.get('/', (req, res) => {
    res.json({
        objetivo: 'Backend para o projeto de PI Odonto-legal',
        rotas: [
            '/auth',
            '/vitimas',
            '/casos',
            '/evidencias',
            '/laudos',
            '/dashboard',
            '/relatorios',
            '/odontogramas',
            '/evidencias-imagens',
            '/evidencias-textos'          
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