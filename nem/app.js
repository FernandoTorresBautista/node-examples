const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items');

const app = express();
require('dotenv').config(); // tomar la configuracion del archivo .env

// const mongodb = process.env.DB_MONGO;
mongoose.connect(process.env.DB_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    //useCreateIndex: true
  })
  .then(()=>{ console.log('Connected')})
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.listen(process.env.PORT);

// app.get('/create-item', (req, res) => {
//   const item = new Item({
//     name: 'phone',
//     price: 1000
//   });
//   item.save().then(result => res.send(result));
// });

// app.get('/get-items', (req, res) => {
//   Item.find()
//     .then(result => res.send(result))
//     .catch(err => console.log(err));
// });

// app.get('/get-item', (req, res) => {
//   Item.findById('61301d33e8a133d785cc7cd0')
//     .then(result => res.send(result))
//     .catch(err => console.log(err));
// });

app.get('/', (req, res) => {
  //res.send('<p>Home page</p>')
  //res.sendFile('./views/index.html', {root:__dirname});
  // const items = [
  //   {name: 'mobile phone', price: 1000},
  //   {name: 'book', price: 30},
  //   {name: 'computer', price: 2000},
  // ];
  // res.render('index', {items});
  res.redirect('/get-items');
});

app.get('/get-items', (req, res) => {
  Item.find()
    .then(result => {
      res.render('index', {items: result})
    })
    .catch(err => console.log(err));
});

app.get('/add-item', (req, res) => {
  //res.send('<h1>Add items</h1>')
  //res.sendFile('./views/add-item.html', {root:__dirname});
  res.render('add-item');
});

app.use((req, res)=>{
  //res.sendFile('./views/error.html', {root:__dirname})
  res.render('error')
});
