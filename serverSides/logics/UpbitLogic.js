console.log(`${__filename}:1`);

const axios = require('axios');
const https = require('https');

const uuidv4 = require('uuid/v4');
const sign = require('jsonwebtoken').sign;
const sdk = require('api')('@upbit/v1.3.3#1h2zv2al3jq48nm');
const db = require('../database/models');

const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY;
const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY;
const baseURL = process.env.UPBIT_OPEN_API_SERVER_URL;

const payload = {
  access_key: access_key,
  nonce: uuidv4(),
};

const token = sign(payload, secret_key);

const instance = axios.create({
  httpsAgent: new https.Agent({
    // 인증서 CA 서명 검증과정 무시
    rejectUnauthorized: false,
  }),
  headers: { Authorization: `Bearer ${token}` },
  baseURL: baseURL,
});

const UpbitLogic = {
  // 현재 갖고있는 원화 수량 반환 단위: 원
  getMyMoney: async () => {
    try {
      let myMoney = 0;

      await instance.get('/v1/accounts').then(async (res) => {
        // TODO: error 처리

        await res.data.map((v, i) => {
          if (v['currency'] === 'KRW') {
            if (v['locked'] > 0) {
              myMoney = Math.floor(myMoney - v['locked']);
            }

            myMoney = Math.floor(v['balance']);
          }
        });
      });

      return myMoney;
    } catch (e) {
      console.log('error: ');
      console.log(e);
    }
  },

  getCoinsInfo: async () => {
    const response = await axios.get(baseURL + '/v1/market/all?isDetails=true');

    const o = [];
    response?.data.map((v) => {
      o.push({
        koreanName: v.korean_name,
        englishName: v.english_name,
        marketWarning: v.market_warning,
        market: v.market,
      });
    });
    const coinsDb = db.coins;
    const row = await coinsDb.bulkCreate(o);
    console.log('row : ', row);
  },
};

module.exports = UpbitLogic;
