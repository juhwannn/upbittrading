import Head from 'next/head'
import Link from "next/link";
import React, {useContext, useEffect, useState} from "react";

import {TableAdminArray, TableAdminObject} from "../pageComponents/TableAdmin";
import styled, {keyframes} from "styled-components";
import axios from "axios";

const Root = styled.div`
    >header.header {
        background-color: #fff;
        color: #000;
        padding: 20px;
        nav {
            max-width: 1140px;
            margin: 0 auto;
            .title {
                font-size: 28px;
            }
            .right {
                float: right;
                font-size: 16px;
                margin-top: 10px;
            }
            a {
                display: inline-block;
                margin: 0 10px;
                color: #000;
                text-decoration: none;
                &:first-of-type {
                    margin-left: 0;
                }
                &:hover, &:active {
                    color: #3486D3;
                }
              
                img {
                  width: 224px;
                  height: 32px;
                }
            }    
        }
    }
    >.body {
        color: #000;
    }
    >footer.footer {
        padding: 20px;
    }
`;

export default function Home() {
    const [upbitResponse, setUpbitResponse] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('/api/upbitApi/');

                setUpbitResponse(JSON.parse(response?.data?.body) ?? upbitResponse);

            } catch (e) {
                console.log(e);
                const data = e?.response?.data;
                console.log("error : " + data);
                alert("error : " + data);
            }
        })();
    },[]);

    return (
        <Root>
            <Head>
                <title>UpbitTrading</title>
                <link rel="icon" href="/16x16.png" sizes="16x16"/>
                <link rel="icon" href="/32x32.png" sizes="32x32"/>
                <link rel="icon" href="/152x152.png" sizes="152x152"/>
                <link rel="icon" href="/256x256.png" sizes="256x256"/>
            </Head>
            <header className={'header'}>
                <nav>
                    <span className="title">
                        UPBitTrading
                    </span>
                    <span className={'right'}>
                        <Link href={'/services'}><a>내지갑</a></Link>
                        <Link href={'/test'}><a>로그인</a></Link>
                    </span>
                </nav>
            </header>

            <h1>
                Main Page.
            </h1>

            <TableAdminArray value={upbitResponse}></TableAdminArray>

        </Root>
    )
}
