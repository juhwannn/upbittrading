import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import React, {useContext, useEffect, useState} from "react";
import {TableAdminArray} from "../pageComponents/TableAdmin";
import styled from "styled-components";

export default function Home() {

    const [upbitResponse, setUpbitResponse] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('/api/upbitApi/');

                setUpbitResponse(JSON.parse(response?.data?.body) ?? upbitResponse);

            } catch (e) {
                //TODO: catch문에 쓸 에러페이지 만들기
                console.log(e);
                const data = e?.response?.data;
                console.log("error : " + data);
                alert("error : " + data);
            }
        })();
    },[]);

    return (
        <>
            <TableAdminArray value={upbitResponse}></TableAdminArray>

            <br/>
            <br/>

            <button onClick={e => {
                (async () => {
                    try{
                        const response = await axios.post('/api/upbitApi/buyRipple');

                        alert(JSON.stringify(response.data.body));
                    } catch (e) {
                        alert(e);
                        console.log(e);
                    }

                    e.preventDefault();
                    return false;
                })();
            }}>리플 구매</button>
        </>
    )
}
