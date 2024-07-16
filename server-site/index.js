const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 9000;
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



const corsOptions = {
    origin: ['http://localhost:5173',
        'http://localhost:5174'

    ],
    // credentials: true,
    // optionSuccessStatus: 2000
}
app.use(cors(corsOptions));
app.use(express.json());
// app.use(cookieParser())






app.get('/', (req, res) => {
    res.send("server is running");
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})