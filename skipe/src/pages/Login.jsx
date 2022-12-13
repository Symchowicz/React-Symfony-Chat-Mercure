import useGetJWT from "../Hook/useGetJWT";
import {useContext, useState} from "react";




export default function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const getJWT = useGetJWT()

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getJWT(username, password).then(data => {
            if (data.JWT) {
                props.setLoggedUser(data);
            } else {
                console.log(data)
            }
        })
    }

    return (
        <div className="login-page">
            <img src="./logo.png" />
            <span className="title">Sign In</span>
            <form onSubmit={handleSubmit}>
                <label>Skype name</label>
                <input type="text" onChange={handleUsername} value={username} />
                <label>Password</label>
                <input type="password" onChange={handlePassword} value={password} />
                <button type="submit">Sign in</button>
            </form>
            <a>Create new account</a>
            <div>
                <span>Problems signing in?</span>
                <div>
                    <img src="./fb.png" />
                    <span>Sign up with Facebook</span>
                </div>
            </div>
        </div>
    )
}