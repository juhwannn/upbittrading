console.log(`${__filename}:1`);

const axios = require("axios");

const request = require('request');
const uuidv4 = require("uuid/v4");
const sign = require('jsonwebtoken').sign;

const UpbitLogic = {

    // 현재 갖고있는 원화 수량 반환 단위: 원
    getMyMoney: async () => {
        try {
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

            request(options, async (error, response, body) => {
                if (error) throw new Error(error)

                

                await response.body.map((v, i) => {
                    if (v["currency"] === "KRW"){
                        const myMoney = Math.floor(v["balance"]);
                        console.log("mymone@@@@y : " + myMoney);
                        return myMoney;
                    }
                });
            });
        } catch (e) {
            console.log("error: ");
            console.log(e);
        }
    },
}

module.exports = UpbitLogic;