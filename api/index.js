const express = require('express');
const app = express();
const cors = require('cors');
const Transaction = require('./models/Transaction.js')
const mongoose = require("mongoose");
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res) =>{
    res.json('test ok');
});

app.post('/api/transaction',async (req,res) => {
    // console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    const {name, price,dateTime,description} = req.body;
    const transaction = await Transaction.create({name,price,dateTime,description});
    res.json(transaction);
});

app.get('/api/transactions',async (req,res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
})

app.listen(8000);
