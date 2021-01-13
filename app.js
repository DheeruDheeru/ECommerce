const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

var port = 8080;
// var host = '192.168.1.103'; 
var host = 'localhost';
var userroutes = require('./routes/userroutes');
var adminroutes = require('./routes/adminroutes');

const bp = require('body-parser');
app.use(bp.json(),bp.urlencoded({extended:true}));

const mongoose = require('mongoose');
var uri = "mongodb://localhost:27017/Ecommerce";

mongoose.connect(uri,{useUnifiedTopology:true,useNewUrlParser:true});
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;

db.once('open',()=>{
    console.log("Connected");
});

app.use('/api',userroutes);
app.use('/api/admin',adminroutes);

app.listen(port,host, () => {
    console.log(`server is running on http://${host}:${port}`);
})