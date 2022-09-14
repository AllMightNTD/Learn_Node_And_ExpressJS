const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController.js');
const { route } = require('./news.js');

router.get('/create', userController.create);
router.post('/store', userController.store);

router.post('/handle-form-action' , userController.handleFormAction)

// Sửa
router.put('/:id', userController.Update);

// Khôi phục 
router.patch('/:id/restore', userController.restore);
// Xóa
router.delete('/:id', userController.Delete);
// Xóa vĩnh viễn
router.delete('/:id/forever' , userController.DeletedForever)
// Route sửa theo id
router.get('/:id/edit', userController.edit);
router.get('/:slug', userController.show);

module.exports = router;
