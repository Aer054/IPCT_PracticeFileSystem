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
/**
 * @swagger
 * tags:
 *   name: Files
 *   description: APIs related to file operations
 */

/**
 * @swagger
 * /api/file/{id}:
 *   delete:
 *     summary: Delete file by ID
 *     tags: [Files]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File ID
 *     responses:
 *       '200':
 *         description: Successfully deleted file
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: File not found
 */
router.delete('/file/:id',fileController.deleteFile);
/**
 * @swagger
 * /api/file:
 *   post:
 *     summary: Upload a file
 *     tags: [Files]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *               name:
 *                 type: string
 *                 description: File name
 *               folderId:
 *                 type: string
 *                 description: ID of the folder to upload the file to
 *     responses:
 *       '201':
 *         description: File successfully uploaded
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
router.post('/file',upload.single('file'),fileController.uploadFile);

module.exports = router;
