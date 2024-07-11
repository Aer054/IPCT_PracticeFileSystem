const Router = require('express');
const router = new Router();
const folderController = require('../controllers/folderController');

/**
 * @swagger
 * tags:
 *   name: Folders
 *   description: API to manage folders
 */

/**
 * @swagger
 * /folder/{id}:
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

router.get('/folder/:id',folderController.getFolder);

/**
 * @swagger
 * /folder/{id}:
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
 *     responses:
 *       '200':
 *         description: Successfully updated folder
 *       '404':
 *         description: Folder not found
 */

router.patch('/folder/:id',folderController.updateFolder);

/**
 * @swagger
 * /folder/{id}:
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
 *       '404':
 *         description: Folder not found
 */

router.delete('/folder/:id',folderController.deleteFolder);

/**
 * @swagger
 * /folder:
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
 *     responses:
 *       '201':
 *         description: Successfully created folder
 *       '400':
 *         description: Bad request
 */
router.post('/folder',folderController.createFolder);

module.exports = router;
