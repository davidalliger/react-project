import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';
import { Redirect } from 'react-router-dom';

const LoginFormPage = () => {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([]);
        const user = {
            credential,
            password
        };
        try {
            let currentUser = await dispatch(login(user));
            console.log('currentUser', currentUser);
        } catch (err) {
            let resBody = await err.json();
            setErrors(resBody.errors);
        }
    }

    if (sessionUser) return (
        <Redirect to='/' />
    );

    return (
        <>
            <ul>
                {errors.map((error, index) => (
                        <li key={index}>
                            {error}
                        </li>
                    ))}
            </ul>
            <form
                onSubmit={handleSubmit}
            >
                <label htmlFor='credential'>
                    Username or Email Address:
                    <input
                        type='text'
                        name='credential'
                        id='credential'
                        onChange={e => setCredential(e.target.value)}
                        value={credential}
                    >
                    </input>
                </label>
                <label htmlFor='password'>
                    Password:
                    <input
                        type='password'
                        name='password'
                        id='password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    >
                    </input>
                </label>
                <button>
                    Log In
                </button>
            </form>
        </>
    )
}

export default LoginFormPage;
