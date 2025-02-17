const express = require('express');
const { register, login, current } = require('../controllers/usercontroller');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.post('/register',register);
router.post('/login', login)
router.get('/current',validateToken,current)  // this is private route
module.exports = router;