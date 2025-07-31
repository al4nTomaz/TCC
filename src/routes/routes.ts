import { Router } from 'express';
import {uploadPdf, uploadPdfMiddleware} from '../controllers/apiController';

const router = Router();

// router.get('/ping', ApiController.ping);

// rota de upload
router.post('/uploads', uploadPdfMiddleware, uploadPdf);

export default router;
