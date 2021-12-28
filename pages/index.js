import Head from 'next/head'
import Link from "next/link";
import React, {useContext, useEffect, useState} from "react";

import {TableAdminArray, TableAdminObject} from "../pageComponents/TableAdmin";
import styled, {keyframes} from "styled-components";
import axios from "axios";
import ContextUser from "../pageComponents/ContextUser";

const Profile = async () => {
    const [user, setUser] = useContext(ContextUser);
    const response = await axios.get('/api/auth/getUser');
    const newUser = response?.data?.user;
    setUser(newUser);

    return user?.name ? (
        <>
            <Link href={'/myPage'}>
                <a>{user.name}님</a>
            </Link>
            {user.role === 'Admin' && (
                <Link href={'/admin'}><a>관리자</a></Link>
            )}
            <Link href={'/logout'}><a>로그아웃</a></Link>
        </>
    ) : (
        <>
            <Link href={'/login'}><a>로그인</a></Link>
            <Link href={'/join'}><a>회원가입</a></Link>
        </>
    );
};

export default function Home() {


    return (
        <>
            <h1>
                Main Page.
            </h1>
        </>
    )
}
