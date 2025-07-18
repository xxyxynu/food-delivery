const express = require('express');
const { addFood, allFoods, removeFood } = require('../controllers/foodController');
const multer = require('multer');

const router = express.Router();

//image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, callback) => {
        return callback(null, `${Date.now()}_${file.originalname}`);
    }
})

const upload = multer({ storage: storage });

router.post('/add', upload.single('image'), addFood);
router.get('/all', allFoods);
router.post('/remove/:id', removeFood);
module.exports = router;