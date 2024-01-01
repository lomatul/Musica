import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const fileFilter = (req, file, cb) => {
  const allowedType = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedType.includes(file.mimetype)) {
    cb(null, true);
  } else cb(null, false);
};

const audioFileFilter = (req, file, cb) => {
  const allowedTypes = ["audio/mpeg", "audio/wav", "audio/ogg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const profileImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`);
  },
});



const playlisticon = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`);
  },
});


const uploadPlaylisticon = multer({ storage: playlisticon, fileFilter });


const uploadProfileImage = multer({ storage: profileImage, fileFilter });

const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now().toString(16)}-${file.originalname}.mp3`);
  },
});

const uploadAudioFile = multer({
  preservePath: true,
  storage: audioStorage,
  audioFileFilter,
});

export { uploadProfileImage, uploadAudioFile , uploadPlaylisticon };
