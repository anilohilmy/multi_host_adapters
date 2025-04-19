const express = require("express");
const route = express.Router();
const helmet = require("helmet");

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

module.exports = route;