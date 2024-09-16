import multer from 'multer';
import path from 'path';

// Configure storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save the file
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`); // Generate a unique filename
  },
});

// Initialize Multer with storage configuration
const upload = multer({ storage });

export { upload };
