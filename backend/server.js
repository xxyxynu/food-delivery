const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const foodRouter = require('./routes/foodRoute');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const dotenv = require('dotenv').config(); //加载 .env 文件中的环境变量

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});