require('dotenv').config();
const express = require("express");
const routes = express.Router();
const helmet = require("helmet");
const { createClient } = require('@supabase/supabase-js');
const pulsa = require("./pulsa.js");

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

routes.get("/pulsa/:provider", (req, res) => {
    const { provider } = req.params;
    
    pulsa.getPriceList(provider, (data) => {
      if (data.status === "00") {
        res.status(200).json(data);
      } else {
        res.status(500).json(data);
      }
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