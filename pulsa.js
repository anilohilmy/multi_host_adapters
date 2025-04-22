const { connectionIak } = require("./admin");
const { md5hash } = require("./utility");

const getPriceList = function(provider, reply) {
    let response = {
        status: "00",
        message: "Success"
    };

    const data = {
        username: process.env.USERNAME_IAK,
        sign: md5hash(`${process.env.USERNAME_IAK}${process.env.API_KEY_IAK}pl`),
        status: "active",
    }

    connectionIak(`/api/pricelist/pulsa/${provider}`, data, function(respData) {
        if (respData.status == "00") {
            const denomList = [];
            console.log(`pricelist : ${JSON.stringify(respData.data)}`);
            if (respData.data.pricelist.length > 0) {
                for (const product of respData.data.pricelist) {
                    const denom = {
                        product_code: product.product_code,
                        product_nominal: product.product_nominal,
                        product_price: product.product_price
                    }
                    denomList.push(denom);
                }
            }

            response.data = denomList;
            reply(response)
        } else {
            reply(respData)
        }
    });
}

module.exports = {
    getPriceList
}