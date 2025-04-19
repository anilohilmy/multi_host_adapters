const express = require('express');
const app = express();
const { route } = require('./router');

app.use(express.json());
app.use(route);

app.listen("10273", function(){
    console.log("Server running on port 10273");
})