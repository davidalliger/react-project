import { useState, useEffect } from 'react';
import { csrfFetch } from '../../store/csrf';
import { useDispatch, useSelector } from 'react-redux';
import { createSpooking } from '../../store/spookings';
import { useHistory } from 'react-router-dom';
import './CreateSpookingForm.css'
// import CreateSpookingButton from './CreateSpookingButton';

const CreateSpookingForm = ({haunt}) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [polterguests, setPolterguests] = useState(1);
    const [disabled, setDisabled] = useState(true);
    const [available, setAvailable] = useState(false);
    const [duration, setDuration] = useState(0);
    const [minEnd, setMinEnd] = useState('');
    const [maxStart, setMaxStart] = useState('');
    const [showUnavailable, setShowUnavailable] = useState(false);
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const formatDate = date => {
        let year = date.getFullYear();
        let month = date.getMonth();
        month++;
        if (month.toString().length === 1) month = `0${month}`;
        let day = date.getDate();
        if (day.toString().length === 1) day = `0${day}`;
        let formatted = `${year}-${month}-${day}`;
        return formatted;
    }
    const today = formatDate(new Date());
    const getTomorrow = () => {
        const tomorrowsDate = new Date();
        const tomorrowStart = tomorrowsDate.getDate() + 1;
        tomorrowsDate.setDate(tomorrowStart);
        return tomorrowsDate;
    };
    const tomorrow = formatDate(getTomorrow());

    useEffect(() => {
        if (start) {
            const endDate = new Date(start);
            console.log('endDate is initially ', endDate);
            const plusOne = endDate.getDate() + 2
            endDate.setDate(plusOne);
            console.log('endDate is now ', endDate);
            const newMinEnd = formatDate(endDate);
            console.log('newMinEnd is ', newMinEnd);
            setMinEnd(newMinEnd);
        }
    }, [start]);

    useEffect(() => {
        if (end) {
            const startDate = new Date(end);
            console.log('startDate is initially ', startDate);
            // const minusOne = startDate.getDate() + 1;
            // startDate.setDate(minusOne);
            // console.log('startDate is now ', startDate);
            const newMaxStart = formatDate(startDate);
            console.log('newMaxStart is ', newMaxStart);
            setMaxStart(newMaxStart);
        }
    }, [end]);

    const getDuration = (startDate, endDate) => {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const day = 1000 * 60 * 60 * 24;
        const duration = Math.round((end-start)/day);
        return duration;
    }

    useEffect(() => {
        setShowUnavailable(false);
        if (available) {
            setAvailable(false);
        }
        if (start && end) {
                setDisabled(false);
                setDuration(getDuration(start, end));
            }
        if (start && end && (new Date(start)) > (new Date(end))) {
            setEnd('');
            setDisabled(true);
        }
    }, [start, end])

    const checkAvailability = async() => {
        console.log('Inside checkAvailability!')
        const response = await csrfFetch(`/api/haunts/${haunt.id}/spookings?start=${start}&end=${end}`);
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const available = data.available;
            console.log(available);
            if (available) {
                setAvailable(true);
            } else {
                setShowUnavailable(true);
            }
        }
    }

    const handleSubmit = async(e) => {
        console.log('Inside handleSubmit!!!');
        e.preventDefault();
        console.log('Prevented default behavior.');

        setErrors([]);
        if (sessionUser) {
            try {
                const spooking = {
                    userId: sessionUser.id,
                    hauntId: haunt.id,
                    startDate: start,
                    endDate: end,
                    polterguests
                }
                console.log('Spooking is ', spooking);
                let newSpooking = await dispatch(createSpooking(spooking));
                console.log('New Spooking is ', newSpooking);
            } catch (err) {
                console.log('err is ', err);
                let resBody = await err.json();
                setErrors(resBody.errors);
            }
        } else {
            history.push('/login');
        }
    }

    return (
        <div id='create-spooking-form'>
            <div id='create-spooking-form-inside'>

                <div id='create-spooking-form-heading'>
                    <div id='create-spooking-form-rate'>
                        <h2>
                            ${Math.round(haunt.rate)}
                        </h2>
                        <div id='create-spooking-form-per-night'>
                            / night
                        </div>
                    </div>
                </div>
                <div
                    id='create-spooking-form-form'
                >
                    <div id='create-spooking-form-fields'>
                        <div id='create-spooking-form-fields-top'>
                            <div id='create-spooking-form-start'>
                                <div className='create-spooking-form-label'>
                                    CHECK-IN
                                </div>
                                <input
                                    type='date'
                                    onChange={e => setStart(e.target.value)}
                                    value={start}
                                    min={today}
                                    // max={end ? maxStart : Infinity}
                                />
                            </div>
                            <div id='create-spooking-form-end'>
                                <div className='create-spooking-form-label'>
                                    CHECK-OUT
                                </div>
                                <input
                                    type='date'
                                    onChange={e => setEnd(e.target.value)}
                                    value={end}
                                    min={start ? minEnd : tomorrow}
                                />
                            </div>
                        </div>
                        <div id='create-spooking-form-fields-bottom'>
                            <div id='create-spooking-form-polterguests'>
                                <div className='create-spooking-form-label'>
                                    POLTERGUESTS
                                </div>
                                <input
                                    type='number'
                                    min='1'
                                    onChange={e => setPolterguests(e.target.value)}
                                    value={polterguests}
                                />
                            </div>
                        </div>
                    </div>
                    {!available && (
                        <button
                        className='spooking-form-button'
                        type='button'
                        disabled={disabled}
                        onClick={checkAvailability}
                    >
                        Check availability
                    </button>
                    )}
                    {showUnavailable && (
                        <div className='spooking-form-bottom' id='no-availability'>
                            Sorry, no availability for the selected dates!
                            <div className={errors.length ? 'spooking-errors-normal' : 'errors-hidden'}>
                                <ul id='haunt-errors-ul'>
                                    {errors.map((error, index) => (
                                        <li key={index}>
                                            {error}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    {available && (
                        // <CreateSpookingButton props={duration, haunt, start, end, polterguests}/>
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
                            <div className='spooking-form-bottom'>
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
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateSpookingForm;
