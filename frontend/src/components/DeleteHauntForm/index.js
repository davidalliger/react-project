import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { destroyHaunt, getHaunts } from '../../store/haunts';
import { useHistory, useParams, } from 'react-router-dom';
// import './LoginForm.css';

const DeleteHauntForm = () => {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [ errors, setErrors ] = useState([]);
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    const haunts = useSelector(state => state.haunts);
    const { hauntId } = useParams();
    const haunt = haunts[hauntId];
    const history = useHistory();

    // useEffect(() => {
    //     if(sessionUser) {
    //         history.push('/');
    //     }

    // }, [sessionUser])

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await dispatch(destroyHaunt(haunt));
            await dispatch(getHaunts());
            history.push('/haunts');
        } catch (err) {
            let resBody = await err.json();
            setErrors(resBody.errors);
        }
    }

    return (
        <div className='form-page'>
            <form
                className='auth-form'
                onSubmit={handleSubmit}
            >
                <div id='delete-haunt-confirmation-div'>
                    Are you sure you want to delete this haunt?
                </div>
                <div id='delete-haunt-button-div'>
                    <button
                        type='button'
                        className='auth-button'
                        onClick={() => history.push(`/haunts/${haunt.id}`)}
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='auth-button'
                    >
                        Delete
                    </button>
                </div>
            </form>
        </div>
    )
}

export default DeleteHauntForm;
