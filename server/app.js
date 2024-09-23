const express = require('express');
const app = express();
const conn = require('./db/conn');
const dotenv = require('dotenv');
dotenv.config();
const userRoutes = require('./router/userRouters');
const authRoutes = require('./router/authRouters');
const cors = require('cors');

app.use(cors());

//database connectiongffgfdafds fdfgdgffds 123456 7891011122345
conn();//Some update 11111
app.use(express.json({limit : '100mb'}));

//parsed JSON Data
app.use(express.urlencoded({extended : false}));

app.use('/',express.static(__dirname + '/../client'));

app.use('/uploads',express.static(__dirname + '/uploads'));
//userRoutes
app.use(userRoutes);


//authRoutes
app.use(authRoutes);


app.listen(process.env.PORT, () => {
    console.log(`server running at http://localhost:${process.env.PORT}`)
});
