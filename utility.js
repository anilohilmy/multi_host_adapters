const crypto = require("crypto");

exports.md5hash = function (data) {
    return crypto.createHash("md5").update(data).digest("hex");
  };