const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController.js');

router.get('/stored/employee', meController.storeemployee);
router.get('/trash/employee', meController.trashemployee);
module.exports = router;
