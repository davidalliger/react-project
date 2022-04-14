import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/session';
import { useHistory, Link } from 'react-router-dom';
import './SignupForm.css'

const SignupForm = ({setShowSignupModal, setShowLoginModal}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    useEffect(() => {
        if(sessionUser) {
            history.push('/');
        }

    }, [sessionUser])

    const handleSubmit = async(e) => {
        e.preventDefault();

        setErrors([]);
        const user = {
            username,
            email,
            password,
            confirmPassword
        };
        try {
            await dispatch(signup(user));
            return;
        } catch (err) {
            let resBody = await err.json();
            setErrors(resBody.errors);
        }
        setPassword('');
        setConfirmPassword('');
    };

    const toggleAuth = () => {
        setShowLoginModal(true);
        setShowSignupModal(false);
    }

    return (
        // <div className='form-page'>
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
                    Sign Up
                </div>
                <div className='auth-form-field'>
                    <label htmlFor='username'>
                        Username:
                    </label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        className='auth-form-input'
                    >
                    </input>
                </div>
                <div className='auth-form-field'>
                    <label htmlFor='email'>
                        Email:
                    </label>
                    <input
                        type='text'
                        name='email'
                        id='email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
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
                <div className='auth-form-field'>
                    <label htmlFor='confirm-password'>
                        Confirm Password:
                    </label>
                    <input
                        type='password'
                        name='confirmPassword'
                        id='confirm-password'
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        className='auth-form-input'
                    >
                    </input>
                </div>
                <div className='auth-button-div'>
                    <button className='auth-button'>
                        Sign Up
                    </button>
                </div>
                <div id='existing-account-login'>
                    Already have an account? <span id='existing-account-login-link' onClick={toggleAuth}>Log in</span>
                </div>
            </form>
        // </div>
    )
};

export default SignupForm;
