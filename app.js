const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const router = require('./router/router');
require('./db/conn');


app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/api/v1',router);

app.listen(PORT,()=>{
    console.log(`server run in port ${PORT}`);
})