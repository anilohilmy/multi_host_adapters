require('dotenv').config();
const express = require("express");
const routes = express.Router();
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

routes.use(
    helmet(optionAPIHelmet)
);

routes.get("/", (req, res) => {
    res.send(200).json({
        message: "Hello, World!"
    });
});

routes.get('/users', async (req, res) => {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if(error) return res.status(500).json({ error });
    res.json(data);
});

module.exports = { routes };