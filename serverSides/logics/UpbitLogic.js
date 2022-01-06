console.log(`${__filename}:1`);


const axios = require("axios");
const https = require("https");

const uuidv4 = require("uuid/v4");
const sign = require('jsonwebtoken').sign;

const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY;
const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY;
const baseURL = process.env.UPBIT_OPEN_API_SERVER_URL;

const payload = {
    access_key: access_key,
    nonce: uuidv4(),
};

const token = sign(payload, secret_key);


const instance = axios.create({
    httpsAgent: new https.Agent({   // 인증서 CA 서명 검증과정 무시
        rejectUnauthorized: false
    }),
    headers: { Authorization: `Bearer ${token}` },
    baseURL: baseURL
});

const UpbitLogic = {

    // 현재 갖고있는 원화 수량 반환 단위: 원
    getMyMoney: async () => {
        try {
            let myMoney = 0;

            await instance.get("/v1/accounts").then(async res => {
                // TODO: error 처리

                await res.data.map((v, i) => {
                    if (v["currency"] === "KRW"){
                        myMoney = Math.floor(v["balance"]);
                        console.log("myMoney :: " + myMoney);
                    }
                });
            })

            return myMoney;
        } catch (e) {
            console.log("error: ");
            console.log(e);
        }
    },
}

module.exports = UpbitLogic;