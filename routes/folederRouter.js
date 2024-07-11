const Router = require('express');
const router = new Router();
const folderController = require('../controllers/folderController');

router.get('/folder/:id',folderController.getFolder);
router.patch('/folder/:id',folderController.updateFolder);
router.delete('/folder/:id',folderController.deleteFolder);
router.post('/folder',folderController.createFolder);

module.exports = router;
