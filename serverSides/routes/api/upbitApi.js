console.log(`${__filename}:1`);

const express = require('express');
const router = express.Router();

const RouterUtil = require('../../utils/RouterUtil');
const wrapTryCatch = RouterUtil.wrapTryCatch;

// UPBIT API
const request = require('request')
const uuidv4 = require("uuid/v4")
const sign = require('jsonwebtoken').sign



router.get('/', wrapTryCatch(async (req, res) => {

    const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY;
    const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY;
    const server_url = process.env.UPBIT_OPEN_API_SERVER_URL;

    const payload = {
        access_key: access_key,
        nonce: uuidv4(),
    };

    const token = sign(payload, secret_key);

    const options = {
        method: "GET",
        url: server_url + "/v1/accounts",
        headers: {Authorization: `Bearer ${token}`},
    };

    request(options, (error, response, body) => {
        if (error) throw new Error(error)

        res.renderJson({body});
    });
}));


module.exports = router;