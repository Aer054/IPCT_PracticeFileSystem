const Router = require('express');
const router = new Router();
const folderController = require('../controllers/folderController');
const ApiError = require("../error/ApiError");

/**
 * @swagger
 * tags:
 *   name: Folders
 *   description: API to manage folders
 */

/**
 * @swagger
 * /api/folder/folder/{id}:
 *   get:
 *     summary: Get folder by ID
 *     tags: [Folders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Folder ID
 *     responses:
 *       '200':
 *         description: Successfully retrieved folder
 *       '404':
 *         description: Folder not found
 */
router.get('/folder/:id', folderController.getFolder);

/**
 * @swagger
 * /api/folder/folder/{id}:
 *   patch:
 *     summary: Update folder by ID
 *     tags: [Folders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Folder ID
 *       - in: requestBody
 *         name: body
 *         required: true
 *         description: Updated folder data
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: New folder name
 *             parentId:
 *               type: string
 *               description: ID of the new parent folder
 *     responses:
 *       '200':
 *         description: Successfully updated folder
 *       '400':
 *         description: Bad request
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Folder not found
 */
router.patch('/folder/:id', folderController.updateFolder);

/**
 * @swagger
 * /api/folder/folder/{id}:
 *   delete:
 *     summary: Delete folder by ID
 *     tags: [Folders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Folder ID
 *     responses:
 *       '200':
 *         description: Successfully deleted folder
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Folder not found
 */
router.delete('/folder/:id', folderController.deleteFolder);

/**
 * @swagger
 * /api/folder/folder:
 *   post:
 *     summary: Create a new folder
 *     tags: [Folders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Folder name
 *               parentId:
 *                 type: string
 *                 description: Optional ID of the parent folder
 *     responses:
 *       '201':
 *         description: Successfully created folder
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/folder', folderController.createFolder);

module.exports = router;
