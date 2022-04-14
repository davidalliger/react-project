import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { destroyHaunt, getHaunts } from '../../store/haunts';
import { useHistory, useParams, } from 'react-router-dom';
import './DeleteHauntForm.css';

const DeleteHauntForm = ({setShowDeleteHauntModal, handleDelete}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const haunts = useSelector(state => state.haunts);
    const { hauntId } = useParams();
    const haunt = haunts[hauntId];
    const history = useHistory();

    useEffect(() => {
        if (!sessionUser) {
            history.push('/login');
        }
    }, [sessionUser, history]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            await dispatch(destroyHaunt(haunt));
            await dispatch(getHaunts());
            handleDelete();
            // history.push('/haunts');
        } catch (err) {
            let resBody = await err.json();
            setErrors(resBody.errors);
            document.getElementById('modal-content').scrollTop = 0;
        }
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
                    Delete Haunt?
                </div>
                <div id='delete-haunt-confirmation-div'>
                    Are you sure you want to delete this haunt?
                </div>
                <div id='delete-haunt-button-div'>
                    <button
                        type='button'
                        className='auth-button'
                        id='delete-haunt-back'
                        onClick={() => setShowDeleteHauntModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        id='delete-haunt-confirm'
                        className='auth-button'
                    >
                        Delete
                    </button>
                </div>
            </form>
        // </div>
    )
}

export default DeleteHauntForm;
