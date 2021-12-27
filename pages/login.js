import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Login() {

    const router = useRouter();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');


    return (
        <>
            <form onSubmit={e => {
                (async() => {
                    try {
                        const response = await axios.post('/api/auth/login', {
                            id, password
                        });

                        console.log(response);
                        await router.push('/');
                    } catch (e) {
                        alert(e);
                        // TODO: catch
                    }
                })();

                e.preventDefault();
                return false;
            }}>
                <h1>Login</h1>

                <label>
                    아이디<br/>
                    <input type="text" value={id} onChange={e=> setId(e.target.value)}/>
                </label>

                <br/>

                <label>
                    비밀번호<br/>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </label>

                <br/>

                <button>로그인</button>
                <Link href={'/join'}><button>회원가입</button></Link>
            </form>
        </>
    )
}