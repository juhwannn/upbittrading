console.log(`${__filename}:1`);
require('dotenv').config();
const os = require('os');

const version = process.version;
const versionRequired = 'v12.20.1'; // TODO 'v14.16.1';
const NODE_ENV = process.env.NODE_ENV;
//const port = parseInt(process.env.PORT, 10) || 21030;
const port = 3000;
const dev = NODE_ENV !== 'staging' && NODE_ENV !== 'production';

const nextJsEnabled = true;
const swaggerEnabled = dev;
const environment = {
    version,
    versionRequired,
    NODE_ENV,
    port,
    dev,
    nextJsEnabled,
    swaggerEnabled,
};

console.info(`
\n\n\n\n\n
==============================================================================
 Starting...
------------------------------------------------------------------------------
${JSON.stringify(environment, null, 4)}
==============================================================================

`);

const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectMultiparty = require('connect-multiparty');

const Next = require('next');
const RouterUtil = require("./serverSides/utils/RouterUtil");
const SignedCookieLogic = require("./serverSides/logics/SignedCookieLogic");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const UpbitLogic = require("./serverSides/logics/UpbitLogic");
const nextJs = Next({dev});
const nextJsRequestHandler = nextJs.getRequestHandler();


(async () => {
    try {
        ['./temp', './temp/upload'].forEach(v => {
            if (!fs.existsSync(v)) {
                fs.mkdirSync(v);
            }
        });

        if (nextJsEnabled) await nextJs.prepare();
        const expressServer = express();

        expressServer.set('trust proxy', true);

        expressServer.use(morgan(':date[iso] :remote-addr :method :url', {immediate: true}));
        expressServer.use(morgan(':date[iso] :remote-addr :method :url :status :res[content-length] :response-time ms'));
        expressServer.use(connectMultiparty({uploadDir: 'temp/upload'}));
        expressServer.use(bodyParser.json());
        expressServer.use(bodyParser.urlencoded({extended: false}));

        expressServer.use(cookieParser(process.env.COOKIEPARSER_KEY));
        expressServer.use(RouterUtil.extendReqRes);
        expressServer.use(SignedCookieLogic.extendReqRes);


        expressServer.use('/api', require('./serverSides/routes/api'));

        if (nextJsEnabled) expressServer.get('*', (req, res) => {
            return nextJsRequestHandler(req, res);
        });

        expressServer.listen(port, (err) => {
            if (err)
                throw err;

            console.info(`http://localhost:${port}`);
        });
        const myMoney = await UpbitLogic.getMyMoney();
        await UpbitLogic.getCanByXRP(myMoney);

        cron.schedule('* * * * *', async () => {
            console.log('cron - every minute');

            // TODO: 매수가를 어떻게잡을지 고민해보기


            // TODO: 매시 현재 갖고있는 원화로 리플을 얼마까지 구매할 수 있는지 @return: 리플 최대 갯수, 리플 가격
            const myMoney = await UpbitLogic.getMyMoney();
            console.log("myMoney : " + JSON.stringify(myMoney));

            const canByXRP = await UpbitLogic.getCanByXRP(myMoney);
            // TODO: 오후 1시정도에 하락장이면 그날은 매수 가격의 % 낮추거나 매수 매도 안하도록

            //const { amount, price } = getRipplePrice();
            // TODO: 위에서 받은 최대 갯수와 가격으로 지정가 매수 @param: 리플 최대 갯수, 리플 가격
            // TODO: 현재 갖고있는 리플을 매수가격의 1%~2% 로 지정가 판매 @param: 코인이름
            // TODO: 매일 특정금액 이상 출금하기
        });

    } catch (ex) {
        console.error(ex.stack);
        process.exit(1);
    }
})();
