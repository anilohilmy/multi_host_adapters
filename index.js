require('dotenv').config();
const express = require('express');
const app = express();
const { route } = require('./router');

app.use(express.json());
app.use(route);

// app.listen(process.env.PORT, function(){
//     console.log("Server running on port 10273");
// })

module.exports = app;