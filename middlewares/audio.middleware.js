const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const audioFileFilter = (req, file, cb) => {
    const allowedTypes = ["audio/mpeg", "audio/wav", "audio/ogg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  


let uploadProfileImage = multer({ storage: profileImage, fileFilter });

const audioStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString(16) + "-" + file.originalname + ".mp3");
  },
});

const uploadAudioFile = multer({
  preservePath: true,
  storage: audioStorage,
});
module.exports = { uploadProfileImage, uploadAudioFile };
