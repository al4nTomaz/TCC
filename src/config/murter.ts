import multer, { Options } from 'multer';
import path from 'path';

export default {
    Storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename(req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`);
        },
    }),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
    },
    fileFilter: (req, file, callback) => {
        const mimeType = "application/pdf";

        if (!mimeType.includes(file.mimetype)) {
            return callback(null, false);
        } else {
            return callback(null, true);
        }
    }
} as Options;