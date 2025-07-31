import express, { Request, Response, ErrorRequestHandler } from 'express';

export class PDFController {
    async store(req: Request, res: Response) {
        const upload = req.files as Express.Multer.File[];
        try { 
            // Verifica se o arquivo foi enviado
            if (!req.file) {
                res.status(400).json({ error: 'Nenhum arquivo enviado.' });
                return;
            }

            // Retorna o caminho do arquivo salvo
            res.status(200).json({ filePath: `/pdf/${req.file.filename}` });
        } catch (error) {
            console.error('Erro ao fazer upload do PDF:', error);
            res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
    static async getPDF(req: Request, res: Response): Promise<void> {}
}