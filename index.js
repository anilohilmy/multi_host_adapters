require('dotenv').config();
const express = require('express');
const app = express();
const { routes } = require('./router.js');

app.use(express.json());
app.use("/api/v1", routes);

// app.listen(process.env.PORT, function(){
//     console.log("Server running on port 10273");
// })

module.exports = app;