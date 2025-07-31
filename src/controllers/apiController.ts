import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

// Configuração do multer para salvar os arquivos na pasta /uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

export const uploadPdfMiddleware = upload.single('pdfFile');

export const uploadPdf = async (req: Request, res: Response) : Promise<any> => {
    if (!req.file) {
        return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ pdfUrl: fileUrl });
};

export const ping = (req: Request, res: Response) => {
    res.json({ pong: true });
};
