const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const auth = require('./routes/auth');
const port = process.env.PORT || 4000;

app.use(express.json());
app.use('/auth', auth);

app.listen(port, ()=>{
    console.log(`Server is Running... ${port}`);
});