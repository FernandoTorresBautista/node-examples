import express from 'express'; // before add this:"type": "module", on .json package => const express = require('express'); // if u dont not add module type
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import todosRouter from './routes/todos.js';

const app = express();
dotenv.config();

app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/todos',todosRouter);

const mongoDB = process.env.DB_MONGO;
app.get('/', (req, res) => {
  res.send('Welcome to server');
});

const PORT = process.env.PORT || 5000;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(()=>{
    app.listen(PORT, ()=>{
      console.log(`Server is running in port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
