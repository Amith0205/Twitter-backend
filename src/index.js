const express = require('express');
const connect = require('./config/database');
const app = express();
const apiRoutes=require('./routes/index');
const bodyParser=require('body-parser');
const passport=require('passport');
const passportAuth=require('./config/jwt-middleware');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
passportAuth(passport);

app.use('/api',apiRoutes);



app.listen(3000, async () => {
    console.log('server started');
    await connect();
    console.log('Mongo db connected');   
});