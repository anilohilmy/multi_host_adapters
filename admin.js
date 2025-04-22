const { httpPostHandlerJsonWithHeaders } = require("./http_handler")

const connectionIak = function(path, data, reply){
    let response = {
        status: "00",
        message: "Success"
    };

    const headerData = {
        "Content-Type": "application/json"
    }

    httpPostHandlerJsonWithHeaders(process.env.URL_IAK + path, headerData, data, function(respData) {
        if (typeof respData.data !== "undefined") {
            if (typeof respData.data.rc !== "undefined") {
                if (respData.data.rc == "00") {
                    response.data = respData.data
                } else {
                    response.status = respData.data.rc
                    response.description = respData.data.message
                }
            } else {
                response.status = "04"
                response.description = "Internal Server Error"
            }
            
            reply(response)
        } else {
            reply(respData)
        }
    });
}

module.exports = {
    connectionIak
}