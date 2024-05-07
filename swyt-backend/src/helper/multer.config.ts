import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const fileExtName = extname(file.originalname);
      callback(null, `${file.fieldname}-${Date.now()}${fileExtName}`);
    },
  }),
};
