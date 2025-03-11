const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router');
const errorMiddleware = require('./middlewares/error-middlewares');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api', router)
app.use(errorMiddleware);
app.use((req, res, next) => {
    console.log(`📥 Отримано запит: ${req.method} ${req.url}`);
    next();
});
const start =async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch(error){
        console.log(error)
    }
}
start();