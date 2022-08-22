const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController.js');

router.get('/create', userController.create);
router.post('/store', userController.store);
router.put('/:id', userController.Update);
// Route sửa theo id
router.get('/:id/edit', userController.edit);
router.get('/:slug', userController.show);

module.exports = router;
