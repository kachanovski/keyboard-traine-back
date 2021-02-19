const multer  = require('multer');


const upload = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads/quiz');
    },
    limits:{
        fileSize: 3*1024 * 1024
    },
    filename: function (req, file, callback) {
        const ext = file.mimetype.split('/')[1];
        callback(null, `${Date.now()}-${file.fieldname}.${ext}`);
    }
});

module.exports = upload



export const fileFilter = (req, file, cb) => {
    console.log(file)
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('Not an image! Please upload an image.', false);
    }
};
