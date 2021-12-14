import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from "axios";

export default function Home() {
    (async () => {
        const test = await axios.get("/api/test");
        console.log("test : " + test.data.text);
        console.log("test2 : " + JSON.stringify(test));

    })();

    return (
        <div className={styles.container}>
            <h1>
                TEST!!!!
            </h1>
        </div>
    )
}
