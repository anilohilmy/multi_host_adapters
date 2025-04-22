const axios = require("axios");

exports.httpPostHandlerJsonWithHeaders = async function(url, header, body, reply) {
    console.log(` HTTP REQ POST | REQUEST URL : ${url}`);
    console.log(` HTTP REQ POST | REQUEST HEADERS : ${JSON.stringify(header)}`);
    console.log(` HTTP REQ POST | REQUEST BODY : ${JSON.stringify(body)}`);

    try {
        const response = await axios.post(url, body, {
            headers: header,
            timeout: 90000
        })

        console.log(` HTTP RESP POST | REQUEST DATA : ${JSON.stringify(response.data)}`);

        reply(response.data)
    } catch (error) {
        if (error.response) {
            console.log(` HTTP RESP POST | ERROR CODE : ${error.response.status}`);
            console.log(` HTTP RESP POST | ERROR DATA : ${JSON.stringify(error.response.data)}`);
            let resp = {
                status: "04",
                description: "Internal Server Error"
            }
            
            if (error.response.data) {
                resp.data = error.response.data;
            }

            reply(resp)
        } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
            console.log(` HTTP RESP POST | ERROR TIMEOUT`);
            reply({
                status: "68",
                description: "Request Timeout"
            })
        } else if (error.isAxiosError) {
            console.log(` HTTP RESP POST | HTTP ERROR : ${error.message}`);
            reply({
                status: "04",
                description:  "Internal Server Error"
            })
        } else {
            console.log(` HTTP RESP POST | HTTP INTERNAL ERROR : ${error.message}`);
            reply({
                status: "04",
                description:  "Internal Server Error"
            })
        }
    }
}

exports.httpGetHandlerJsonWithHeader = async function(url, header, body, reply) {
    console.log(` HTTP REQ GET | REQUEST URL : ${url}`);
    console.log(` HTTP REQ GET | REQUEST HEADERS : ${JSON.stringify(header)}`);
    console.log(` HTTP REQ GET | REQUEST BODY : ${JSON.stringify(body)}`);

    try {
        const response = await axios.get(url,{
            params: body,
            headers: header,
            timeout: 110000
        })

        console.log(` HTTP RESP GET | REQUEST DATA : ${JSON.stringify(response.data)}`);

        reply(response.data)
    } catch (error) {
        if (error.response) {
            console.log(` HTTP RESP GET | ERROR CODE : ${error.response.status}`);
            console.log(` HTTP RESP GET | ERROR DATA : ${JSON.stringify(error.response.data)}`);
            let resp = {
                status: "04",
                description: "Internal Server Error"
            }
            
            if (error.response.data) {
                resp.data = error.response.data;
            }

            reply(resp)
        } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
            console.log(` HTTP RESP GET | ERROR TIMEOUT`);
            reply({
                status: "68",
                description: "Request Timeout"
            })
        } else if (error.isAxiosError) {
            console.log(` HTTP RESP GET | HTTP ERROR : ${error.message}`);
            reply({
                status: "04",
                description: "Internal Server Error"
            })
        } else {
            console.log(` HTTP RESP GET | HTTP INTERNAL ERROR : ${error.message}`);
            reply({
                status: "04",
                description: "Internal Server Error"
            })
        }
    }
}