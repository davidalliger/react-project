import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FutureSpookings from './FutureSpookings';
import PastSpookings from './PastSpookings';
import './SpookingsPage.css';
import { getSpookings } from '../../store/spookings';

const SpookingsPage = () => {
    const sessionUser = useSelector(state => state.session.user);
    console.log('sessionUser is ',sessionUser);
    const pastSpookings = useSelector(state => state.spookings.pastSpookings);
    console.log('pastSpookings is ', pastSpookings)
    const futureSpookings = useSelector(state => state.spookings.futureSpookings);
    console.log('futureSpookings is ', futureSpookings)
    const [showPast, setShowPast] = useState(false);
    console.log('showPast is ', showPast)

    const debug = () => console.log('So far so good!');

    const defaultHauntUrl = '/images/hauntedhouse.jpg';
    console.log('defaultHauntUrl is ', defaultHauntUrl)
    const defaultUserUrl = '/images/user-icon-lavender.png';
    console.log('defaultUserUrl is ', defaultUserUrl)

    const getDuration = (startDate, endDate) => {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const day = 1000 * 60 * 60 * 24;
        const duration = Math.round((end-start)/day);
        return duration;
    }

    const formatDate = (date) => {
        const justDate = date.split('T')[0];
        const parts = justDate.split('-');
        return `${parts[1]}/${parts[2]}/${parts[0]}`;
    }

    return (
        <div id='spookings-page-container'>
            {(pastSpookings.length > 0) && (
                <div>
                    <button
                        onClick={() => setShowPast(false)}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setShowPast(true)}
                    >
                        Past
                    </button>
                </div>
            )}
            {debug()}
            <div id='spookings-page-heading'>
                <h1>Spookings</h1>
            </div>
                {(!showPast) && (
                    <>
                        {(!futureSpookings || !futureSpookings.length) && (
                            <div id='no-spookings'>
                                <h2>
                                    You haven't spooked a trip... yet.
                                </h2>
                                <div id='no-spookings-message'>
                                    What are you waiting for? Have the time of your afterlife or just rest in peace at your new favorite haunt!
                                </div>
                                <Link to='/haunts'>
                                    <button id='no-spookings-button'>
                                        Start looking
                                    </button>
                                </Link>
                            </div>
                        )}
                        {(futureSpookings && futureSpookings.length) && (
                            <div className='spookings-list-container'>
                                {futureSpookings.map(spooking => (
                                    <div className='spooking-container' key={spooking.id}>
                                        <div className='spooking-haunt-image' style={{backgroundImage: `url(${(spooking.Haunt.Images.length > 0) ? spooking.Haunt.Images[0].url : defaultHauntUrl})`}}></div>
                                        <div className='spooking-info'>
                                            <div className='spooking-city-div'>
                                                {(spooking.Haunt.city).toUpperCase()}
                                            </div>
                                            <div className='spooking-name-div'>
                                                {spooking.Haunt.name}
                                            </div>
                                            <div className='spooking-duration-div'>
                                                <div>
                                                    {getDuration(spooking.startDate, spooking.endDate)} nights - {spooking.polterguests} polterguest{(spooking.polterguests > 1) && ( <span>s</span> )}
                                                </div>
                                                <div>
                                                    From {formatDate(spooking.startDate)} to {formatDate(spooking.endDate)}
                                                </div>
                                            </div>
                                            <div className='spooking-address-div'>
                                                <div>
                                                    {spooking.Haunt.address}
                                                </div>
                                                <div>
                                                    {spooking.Haunt.city}, {(spooking.Haunt.state.lenth > 0) && (
                                                        <span>{spooking.Haunt.state}, </span>
                                                        )}{spooking.Haunt.country}
                                                </div>
                                            </div>

                                        </div>
                                        <div className='spooking-host-div'>
                                            <div id='spooking-host-image' style={{backgroundImage: `url(${spooking.Haunt.User.Images.length ? spooking.Haunt.User.Images[0].url : defaultUserUrl})`}}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            {showPast && (
                <>
                    <PastSpookings pastSpookings={pastSpookings} />
                </>
            )}

            {/* {!futureSpookings.length && (
                <div id='no-spookings'>
                    <h2>
                        You haven't spooked a trip... yet.
                    </h2>
                    <div id='no-spookings-message'>
                        What are you waiting for? Have the time of your afterlife or just rest in peace at your new favorite haunt!
                    </div>
                    <Link to='/haunts'>
                        <button id='no-spookings-button'>
                            Start looking
                        </button>
                    </Link>
                </div>
            )} */}


        </div>
    )
}

export default SpookingsPage;
