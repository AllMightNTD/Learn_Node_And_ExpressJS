const express = require('express');
const router = express.Router();
const handleAccount = require('../app/controllers/HandleAccountUser.js');

router.get('/logins', handleAccount.logins);
router.get('/change-password' , handleAccount.changePasswords)
router.get('/registers', handleAccount.registers);
router.post('/api/login', handleAccount.Handlelogin);
router.post('/api/change-password' ,handleAccount.handleChangePassword);
router.post('/api/register', handleAccount.Handleregister);
module.exports = router;
