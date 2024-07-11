const Router = require('express');
const router = new Router();
const fileController = require('../controllers/fileController');

const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.delete('/file/:id',fileController.deleteFile);
router.post('/file',upload.single('file'),fileController.uploadFile);

module.exports = router;
