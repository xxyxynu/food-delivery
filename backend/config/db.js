const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect('mongodb://127.0.0.1:27017/food-delivery');
        console.log('MongoDB connected:', connect.connection.name);
    } catch (err) {
        console.log('DB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
