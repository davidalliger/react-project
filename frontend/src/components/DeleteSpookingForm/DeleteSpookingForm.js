import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { destroySpooking, getSpookings } from '../../store/spookings';
import { useHistory, useParams, } from 'react-router-dom';
import './DeleteSpookingForm.css';

const DeleteSpookingForm = ({setShowDeleteSpookingModal, handleDelete, spooking}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const spookings = useSelector(state => state.spookings);
    console.log(spooking);
    // const { spookingId } = useParams();
    // const spooking = spookings[spookingId];
    const history = useHistory();


    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await dispatch(destroySpooking(spooking));
            await dispatch(getSpookings(sessionUser));
            setShowDeleteSpookingModal(false);
            // handleDelete();
            // history.push('/spookings');
        } catch (err) {
            let resBody = await err.json();
            setErrors(resBody.errors);
            document.getElementById('modal-content').scrollTop = 0;
        }
    }

    // useEffect(() => {
    //     if (!sessionUser) {
    //         history.push('/');
    //     }
    // }, [sessionUser]);

    return (
        // <div className='form-page'>
            <form
                className='auth-form'
                onSubmit={handleSubmit}
            >
                <div className='auth-form-title'>
                    Cancel Trip?
                </div>
                <div id='delete-spooking-confirmation-div'>
                    Are you sure you want to cancel your trip? Please confirm.
                </div>
                <div id='delete-spooking-button-div'>
                    <button
                        type='button'
                        className='auth-button'
                        id='delete-spooking-back'
                        onClick={() => setShowDeleteSpookingModal(false)}
                    >
                        Back
                    </button>
                    <button
                        type='submit'
                        className='auth-button'
                        id='delete-spooking-confirm'
                    >
                        Confirm
                    </button>
                </div>
            </form>
        // </div>
    )
}

export default DeleteSpookingForm;
