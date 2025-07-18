const foodModel = require('../models/foodModel');
const fs = require('fs');

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category,
    });

    try {
        await food.save();
        res.status(201).json({
            success: true,
            data: food,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}

const allFoods = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({
            success: true,
            data: foods,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const removeFood = async (req, res) => {
    const { id } = req.params;
    try {
        const food = await foodModel.findById(id);
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.error("Error deleting image:", err);
            }
        });
        await foodModel.findByIdAndDelete(id);
        res.json({
            success: true,
            message: "Food item removed successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    addFood,
    allFoods,
    removeFood,
}
