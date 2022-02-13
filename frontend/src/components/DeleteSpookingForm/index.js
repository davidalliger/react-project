import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { destroySpooking, getSpookings } from '../../store/spookings';
import { useHistory, useParams, } from 'react-router-dom';
// import './LoginForm.css';

const DeleteSpookingForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const spookings = useSelector(state => state.spookings);
    const { spookingId } = useParams();
    const spooking = spookings[spookingId];
    const history = useHistory();
    console.log(history);
    console.log(history[history.length - 2]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await dispatch(destroySpooking(spooking));
            await dispatch(getSpookings(sessionUser));
            history.push('/spookings');
        } catch (err) {
            let resBody = await err.json();
            setErrors(resBody.errors);
        }
    }

    useEffect(() => {
        if (!sessionUser) {
            history.push('/login');
        }
    }, [sessionUser]);

    // const goBack = () => {
    //     if (history && history.length) {
    //         history.push((history[history.length - 2]).location.pathname);
    //     } else {
    //         history.push('/haunts');
    //     }
    // }

    return (
        <div className='form-page'>
            <form
                className='auth-form'
                onSubmit={handleSubmit}
            >
                <div id='delete-haunt-confirmation-div'>
                    Are you sure you want to cancel your trip? Please confirm.
                </div>
                <div id='delete-haunt-button-div'>
                    <button
                        type='button'
                        className='auth-button'
                        onClick={history.goBack}
                    >
                        Back
                    </button>
                    <button
                        type='submit'
                        className='auth-button'
                    >
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    )
}

export default DeleteSpookingForm;
