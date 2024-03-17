import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    const timestamp = Date.now();
    cb(null, `${timestamp}-${name}${ext}`);
    // cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  // accept image files only
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg or .png format allowed!'), false);
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 * 10, // 5MB max file size
  },
  // fileFilter: fileFilter,
});
