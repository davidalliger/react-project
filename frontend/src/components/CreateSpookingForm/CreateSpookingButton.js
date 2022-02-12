import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSpooking } from '../../store/spookings';
import './CreateSpookingForm.css'

const CreateSpookingButton = ({duration, haunt, start, end, polterguests}) => {
    const sessionUser = useSelector(state => state.session.user);
    // const [showUnavailable, setShowUnavailable] = useState(false);

    const getDuration = (startDate, endDate) => {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const day = 1000 * 60 * 60 * 24;
        const duration = Math.round((end-start)/day);
        return duration;
    }

    // useEffect(() => {
    //     setShowUnavailable(false);
    //     if (available) {
    //         setAvailable(false);
    //     }
    //     if (start && end) {
    //             setDisabled(false);
    //             setDuration(getDuration(start, end));
    //         }
    // }, [start, end])

    const handleSubmit = async(e) => {
        e.preventDefault();
        // setErrors([]);
        const spooking = {
            userId: sessionUser.id,
            hauntId: haunt.id,
            startDate: start,
            endDate: end,
            polterguests
        }
        let newSpooking = await dispatchEvent(createSpooking(spooking));
        console.log('New Spooking is ', newSpooking);
        // try {
        // } catch (err) {
        //     console.log('err is ', err);
        //     let resBody = await err.json();
        //     setErrors(resBody.errors);
        // }
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <input
                type='hidden'
                name='start'
                value={start}
            />
            <input
                type='hidden'
                name='end'
                value={end}
            />
            <input
                type='hidden'
                name='polterguests'
                value={polterguests}
            />
            <button
                className='spooking-form-button'
                type='submit'
            >
                Spook a trip!
            </button>
            <div id='spooking-form-bottom'>
                <div id='spooking-form-rate-breakdown'>
                    <div id='spooking-form-rate-multiplication'>
                        ${Math.round(haunt.rate)} x {duration} nights
                    </div>
                    <div id='spooking-form-rate-total'>
                        ${Math.round((haunt.rate)*duration)}
                    </div>
                </div>
            </div>
            <div id='spooking-form-service-fee'>
                <div id='spooking-form-service-fee-label'>
                    Service Fee
                </div>
                <div id='spooking-form-service-fee-total'>
                    ${5*getDuration(start, end)}
                </div>

            </div>
            <div id ='spooking-form-total-div'>
                <div id ='spooking-form-total-label'>
                    Total before taxes
                </div>
                <div id='spooking-form-total-amount'>
                    ${Math.round((haunt.rate)*(getDuration(start, end))) + 5*getDuration(start, end)}
                </div>
            </div>
        </form>
    )
}

export default CreateSpookingButton;
