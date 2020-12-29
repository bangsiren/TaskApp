const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('./db');
const cors = require('cors');
const userRoutes = require('./routes/route');
const user = require('./routes/userRouter')
const app = express()
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json())
const path = require('path')
app.use(cors());

app.use(express.static('uploads'))
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/tasks', userRoutes);
app.use(user)


app.get('/', (req,res)=>{
  res.json({"message": "Congratualation Yor Are Working Great"})
});
app.listen(3000, (er)=>{
  if(er) {
    console.log(er)
  } else {
    console.log('Server running on port: 3000');
  }
});
