const express = require('express');
const path = require('path');

const route = express.Router();

route.use(express.static(path.join(__dirname,'../client/build')));
route.get('*',(req, res)=>{
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = route