import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Login() {

    const router = useRouter();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCon, setPasswordCon] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    return (
        <>
            <h1>회원가입</h1>
            <form onSubmit={e => {
                (async() => {
                    try {
                        // TODO: 유효성 검사, 패스워드 체크
                        await axios.post('/api/auth/join', {
                            id, password, passwordCon, name, email
                        });

                        await router.push("/");
                    } catch (e) {
                        alert(e);
                        // TODO: catch
                    }
                })();

                return false;
            }}>
                <label>
                    아이디
                    <input type="text" value={id} onChange={e => setId(e.target.value)}/><br/>
                </label>

                <label>
                    비밀번호
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
                </label>

                <label>
                    비밀번호 확인
                    <input type="password" value={passwordCon} onChange={e => setPasswordCon(e.target.value)}/><br/>
                </label>

                <label>
                    이름
                    <input type="text" value={name} onChange={e => setName(e.target.value)}/><br/>
                </label>

                <label>
                    이메일
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/><br/>
                </label>

                <button>가입</button>
            </form>
            {/*TODO: 개인정보 이용 동의*/}
        </>
    )
}