const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const app = express();
const port = process.env.PORT || 9000;
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');



const corsOptions = {
    origin: ['http://localhost:5173',
        'http://localhost:5174'

    ],
    credentials: true,
    optionSuccessStatus: 2000
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.psgygfs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
}

async function run() {
    try {
        const dataBase = client.db('jobTaskAssignment');
        const usersCollection = dataBase.collection("userData");



        // JWT function
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1h'
            })

            res.cookie("token", token, cookieOption)
                .send({ success: true })
        })


        //   user functionality
        app.post('/user', async (req, res) => {
            try {
                const user = req.body;
                const query = {
                    userEmail: user?.userEmail,

                    userPhoneNum: user?.userPhoneNum
                };
                const existUser = await usersCollection.findOne(query);
                if (existUser) {
                    return res.send({ message: "this email or phone number already exists", insertedId: null })
                }
                const saltRound = 10;
                const hashPassword = await bcrypt.hash(user?.userPassword, saltRound);
                user.userPassword = hashPassword;
                const result = await usersCollection.insertOne(user);
                res.send(result);
            }
            catch (error) {
                console.error('Error during user registration:', error);
                res.status(500).send({ message: 'Internal server error' });
            }
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send("server is running");
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})