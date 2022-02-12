import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './CreateSpookingForm.css'

const CreateSpookingForm = ({haunt}) => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [polterguests, setPolterguests] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [available, setAvailable] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
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

    const getDuration = (startDate, endDate) => {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const day = 1000 * 60 * 60 * 24;
        const duration = Math.round((end-start)/day);
        return duration;
    }

    useEffect(() => {
        if (start &&
            end &&
            polterguests > 0) {
                setDisabled(false);
                getDuration(start, end);
            }
    }, [start, end, polterguests])

    useEffect(() => {
        if (available) {
            setAvailable(false);
        }
    }, [start, end])

    const handleSubmit = () => {
        const spooking = {
            userId: sessionUser.id,
            id: haunt.id,
            startDate: start,
            endDate: end,
            polterguests
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
                <form
                    id='create-spooking-form-form'
                    onSubmit={handleSubmit}
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
                                    min={start ? start : today}
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
                        onClick={() => setAvailable(true)}
                    >
                        Check availability
                    </button>
                    )}
                    {available && (
                        <>
                            <button
                                className='spooking-form-button'
                                type='submit'
                            >
                                Spook a trip!
                            </button>
                            <div id='spooking-form-bottom'>
                                <div id='spooking-form-rate-breakdown'>
                                    <div id='spooking-form-rate-multiplication'>
                                        ${Math.round(haunt.rate)} x {getDuration(start, end)} nights
                                    </div>
                                    <div id='spooking-form-rate-total'>
                                        ${Math.round((haunt.rate)*(getDuration(start, end)))}
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
                        </>
                    )}
                </form>
            </div>
        </div>
    )
}

export default CreateSpookingForm;
