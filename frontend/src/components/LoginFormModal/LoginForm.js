import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';
import { Link, useHistory } from 'react-router-dom';
import { getSpookings } from '../../store/spookings';
import './LoginForm.css';

const LoginForm = ({setShowLoginModal, setShowSignupModal}) => {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    useEffect(async() => {
        if(sessionUser) {
            // await dispatch(getSpookings(sessionUser));
            setShowLoginModal(false);
        }

    }, [sessionUser])

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([]);
        const user = {
            credential,
            password
        };
        try {
            await dispatch(login(user));

        } catch (err) {
            let resBody = await err.json();
            setErrors(resBody.errors);
            document.getElementById('modal-content').scrollTop = 0;
        }
        setPassword('');
    }

    const loginDemoUser = async(e) => {
        setErrors([]);
        const user = {
            credential: 'Demo',
            password: 'password'
        };
        try {
            await dispatch(login(user));
        } catch (err) {
            let resBody = await err.json();
            setErrors(resBody.errors);
        }
        setPassword('');
    }

    const toggleAuth = () => {
        setShowSignupModal(true);
        setShowLoginModal(false);
    }

    return (
            <form
                className='auth-form'
                onSubmit={handleSubmit}
            >
                <div className={errors.length ? 'errors-div' : 'errors-hidden'}>
                    <ul className='errors-ul'>
                        {errors.map((error, index) => (
                                <li key={index}>
                                    {error}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className='auth-form-title'>
                    Log In
                </div>
                <div className='auth-form-field'>
                    <label htmlFor='credential'>
                        Username or Email Address:
                    </label>
                    <input
                        type='text'
                        name='credential'
                        id='credential'
                        onChange={e => setCredential(e.target.value)}
                        value={credential}
                        className='auth-form-input'
                    >
                    </input>
                </div>
                <div className='auth-form-field'>
                    <label htmlFor='password'>
                        Password:
                    </label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        className='auth-form-input'
                    >
                    </input>
                </div>
                <div className='auth-button-div'>
                    <button
                        type='submit'
                        className='auth-button'
                    >
                        Log In
                    </button>
                    <button
                        type='button'
                        className='auth-button'
                        onClick={loginDemoUser}
                    >
                        Demo User
                    </button>
                </div>
                <div id='no-account-signup'>
                    Don't have an account? <span id='no-account-signup-link' onClick={toggleAuth}>Sign up</span>
                </div>
            </form>
        // <div className='form-page'>
        // </div>
    )
}

export default LoginForm;
