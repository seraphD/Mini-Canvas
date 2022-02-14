import React, {useState} from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config.js';
import "./index.css";

function Login(props: any) {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const login = () => {
        axios.post(`${config.baseUrl}/login`, {userName, password})
        .then(res => {
            const user = res.data;
            props.setUser(user);
            navigate("/home", {replace: true});
        })
        .catch(err => {
            alert("UserName not found or password incorrect!!");
        })
    }

    return (
        <div className='login'>
            <div className='login-form'>
                <div className='login-form-entry'>
                    <div className='login-form-entry-label'>Username:</div>
                    <TextField fullWidth size='small' className='login-form-entry-input' onChange={e => setUserName(e.target.value)}></TextField>
                </div>

                <div className='login-form-entry'>
                    <div className='login-form-entry-label'>Password:</div>
                    <TextField fullWidth size='small' className='login-form-entry-input' type={"password"} onChange={e => setPassword(e.target.value)}></TextField>
                </div>

                <Button variant='contained' id='login-btn' onClick={login}>Login</Button>
            </div>
        </div>
    )
}

export default Login;