const express = require('express');
const authMiddleware = require('../middleware/auth');
const { placeOrder, verifyOrder } = require('../controllers/orderController');

const router = express.Router();

router.post('/place', authMiddleware, placeOrder);
router.post('/verify', verifyOrder);

module.exports = router;

