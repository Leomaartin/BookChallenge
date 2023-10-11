const multer = require("multer");
const path = require('path');
const crypto = require ('crypto');

function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images'))
    },
    filename: function (req, file, cb) {
      const imageName = generateRandomString(8) + path.extname(file.originalname)
      cb(null, imageName)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes('image')){
        cb(null, true)
    } else {
        req.fileError = true
        cb(null, false)
    }
}


const uploadFile = multer({ storage: storage, fileFilter: fileFilter });
module.exports = uploadFile;
