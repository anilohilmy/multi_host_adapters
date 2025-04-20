require('dotenv').config();
const express = require("express");
const route = express.Router();
const helmet = require("helmet");
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

let optionAPIHelmet = {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        frameAncestors: ["'none'"],
      },
    },
    frameguard: { action: 'deny' },
    xssFilter: true,
    noSniff: true,
    hidePoweredBy: true,
};

route.use(
    helmet(optionAPIHelmet)
);

route.get("/", (req, res) => {
    res.send(200).json({
        message: "Hello, World!"
    });
});

app.get('/users', async (req, res) => {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if(error) return res.status(500).json({ error });
    res.json(data);
});

module.exports = route;