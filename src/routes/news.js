const express = require('express');
const router = express.Router();
const newController = require('../app/controllers/NewsController.js');

router.get('/:slug', newController.show);

// Tuyến đường gốc luôn cuối cùng
router.get('/', newController.index);

module.exports = router;
