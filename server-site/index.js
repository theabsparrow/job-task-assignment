const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 9000;
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');



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

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.psgygfs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   

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