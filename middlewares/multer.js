import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "../uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname + path.extname(file.originalname)
    );
  },
});

const uploadPassport = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);
    if (extname && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, JPG, or PNG images are allowed"));
    }
  },
});

const uploadNormal = multer({
  storage: storage,
  limits: {
    fileSize: 7 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);
    if (extname && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, JPG, or PNG images are allowed"));
    }
  },
});

export { uploadPassport, uploadNormal };
