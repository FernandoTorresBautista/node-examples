const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items');

const app = express();
require('dotenv').config(); 

app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.DB_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=>{ console.log('Connected')})
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.listen(process.env.PORT);


app.get('/', (req, res) => {
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
  res.render('add-item');
});

app.post('/items', (req, res) => {
  //console.log(req.body);
  const item = Item(req.body);
  item.save().then( ()=> {
    res.redirect('/items')
  }).catch(err => console.log(err));
});

app.use((req, res)=>{
  res.render('error')
});
