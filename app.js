import express from "express";
import mongoose from "mongoose";

import bodyParser from "body-parser";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";

import laudoRoutes from "./router/laudo.router.js";
import pacienteRoutes from "./router/paciente.router.js";
import odontoRoutes from "./router/odonto.router.js";

config();

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/';

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

//consumindo rotas
app.use('/odontos', odontoRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/laudos', laudoRoutes);

app.get('/', (req, res) => {
    res.json({
        objetivo: 'Backend para o projeto de PI Odonto-legal',
        rotas: [
            '/odontos',
            '/pacientes',
            '/laudos',
        ]
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
});