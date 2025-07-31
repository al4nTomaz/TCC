import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/routes';

dotenv.config();

const server = express();

// Habilita CORS e JSON
server.use(cors());
server.use(express.json());

// Servir frontend (HTML, JS, CSS) da pasta 'views'
server.use(express.static(path.join(__dirname, 'views')));

// Servir arquivos enviados (PDFs)
server.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Rotas da API
server.use(apiRoutes);

// Rota fallback para caminhos inexistentes
server.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Endpoint não encontrado.' });
});

// Middleware de erro
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);
    res.status(400).json({ error: 'Ocorreu algum erro.' });
};
server.use(errorHandler);

// Iniciar o servidor
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
