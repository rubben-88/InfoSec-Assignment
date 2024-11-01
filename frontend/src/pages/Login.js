import '../css/general.css'
import '../css/Login.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';
import { getItsmeToken } from '../itsme/itsme';
import { has_voted, try_login } from '../requests/requests';

export default function Login({ rememberLogin }) {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    
    /* LOGIC */
    const handleLogin = () => {
	    const token = getItsmeToken(username);
        setLoading(true)
        try_login(token, () => {
            rememberLogin()
            has_voted(token, (result) => {
                setLoading(false)
                if (result) {
                    navigate('/already-voted')
                } else {
                    navigate(`/vote/${token}`)
                }
            }, () => {navigate('/error')})
        }, () => {navigate('/error')})
        
    };

    /* HTML */
    return (
        <div className='content center'>
            <div className='card center column'>
                <div className='logo-name center column'>

                    <img className='logo' 
                        src="/logo.png" 
                        alt="jerry" 
                    />

                    <div className='name'>
                        Delphi
                    </div>

                </div>
                <div className='login-form center spaced-row'>

                    <Input className='username' 
                        placeholder="Username" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                    />
                    
                    <Button className='login-button' 
                        type="primary"
                        onClick={handleLogin}
                        loading={loading}
                    > Login
                    </Button>

                </div>
            </div>
        </div>
    );
};
