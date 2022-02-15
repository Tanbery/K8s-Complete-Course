var express = require('express');
const app = express();

app.get('/', (req,res) =>{
     res.status(200).json("Hello World");
});

var server = app.listen(3000, function(){
    console.log('Example app listening at http://%s:%s',server.address().address, server.address().port)
});