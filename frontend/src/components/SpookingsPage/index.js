import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DeleteSpookingFormModal from '../DeleteSpookingForm';
import './SpookingsPage.css';

const SpookingsPage = ({showDeleteSpookingModal, setShowDeleteSpookingModal}) => {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const spookings = useSelector(state => state.spookings);
    const pastSpookings = spookings.pastSpookings;
    const futureSpookings = spookings.futureSpookings;
    const [showNavButtons, setShowNavButtons] = useState(false);
    const [showNoTrips, setShowNoTrips] = useState(false);
    const [showFuture, setShowFuture] = useState(false);
    const [showPast, setShowPast] = useState(false);
    const [currentSpooking, setCurrentSpooking] = useState({});

    useEffect(() => {
        if (!sessionUser) {
            history.push('/');
        }
        if (pastSpookings && pastSpookings.length > 0) {
            setShowNavButtons(true);
        }
        if (!futureSpookings || futureSpookings.length === 0) {
            setShowNoTrips(true);
        }
        if (futureSpookings && futureSpookings.length > 0) {
            setShowFuture(true);
        }
    }, [sessionUser, history, pastSpookings, futureSpookings]);

    const defaultHauntUrl = '/images/hauntedhouse.jpg';
    const defaultUserUrl = '/images/user-icon-lavender.png';

    const handleCancel = e => {
        const spookingId = +e.target.id;
        console.log(spookingId);
        const spooking = futureSpookings.filter(spooking => spooking.id === spookingId)[0];
        console.log(spooking);
        setCurrentSpooking(spooking);
        setShowDeleteSpookingModal(true);
    }

    const getDuration = (startDate, endDate) => {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const day = 1000 * 60 * 60 * 24;
        const duration = Math.round((end-start)/day);
        return duration;
    }

    const getTotal = (startDate, endDate, rate) => {
        const duration = getDuration(startDate, endDate);
        const total = duration * rate + duration * 5;
        return total;
    }

    const formatDate = (date) => {
        const justDate = date.split('T')[0];
        const parts = justDate.split('-');
        return `${parts[1]}/${parts[2]}/${parts[0]}`;
    }

    return (
            <div id='spookings-page-container'>
                <div id='spookings-page-heading'>
                    <h1>Spookings</h1>
                    {showNavButtons && (
                        <div id='spookings-nav-buttons-div'>
                            <button
                                className='spooking-nav-button'
                                onClick={() => setShowPast(false)}
                            >
                                Upcoming
                            </button>
                            <button
                                className='spooking-nav-button'
                                onClick={() => setShowPast(true)}
                            >
                                Past
                            </button>
                        </div>
                    )}
                </div>
                {(!showPast) && (
                    <>
                        {showNoTrips && (
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
                        {showFuture && (
                            <div className='spookings-list-container'>
                                {futureSpookings.map(spooking => (
                                    <div className='spooking-container' key={spooking.id}>
                                        <div className='spooking-haunt-image' style={{backgroundImage: `url(${(spooking.Haunt.Images.length > 0) ? spooking.Haunt.Images[0].url : defaultHauntUrl})`}}></div>
                                        <div className='spooking-info'>
                                            <div className='spooking-city-div'>
                                                {(spooking.Haunt.city).toUpperCase()}
                                            </div>
                                            <Link to={`/haunts/${spooking.Haunt.id}`} className='spooking-name-link'>
                                                <div className='spooking-name-div'>
                                                    {spooking.Haunt.name}
                                                </div>
                                            </Link>
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
                                                    {spooking.Haunt.city}, {(spooking.Haunt.state) && (
                                                        <span>{spooking.Haunt.state}, </span>
                                                        )}{spooking.Haunt.country}
                                                </div>
                                            </div>

                                        </div>
                                        <div className='spooking-host-div'>
                                            <div className='spooking-host-image' style={{backgroundImage: `url(${spooking.Haunt.User.Images.length ? spooking.Haunt.User.Images[0].url : defaultUserUrl})`}}></div>
                                            <div className='spooking-host-info'>
                                                <div className='spooking-host-name-div'>
                                                    {spooking.Haunt.User.username}
                                                </div>
                                                <div className='spooking-host-email'>
                                                    {spooking.Haunt.User.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='spooking-other-info-div'>
                                            <div className='spooking-total-amount-div'>
                                                Total amount: <span className='spooking-dollar-amount'>
                                                        ${getTotal(spooking.startDate, spooking.endDate, spooking.Haunt.rate)}
                                                    </span>
                                            </div>
                                            <Link to={`/spookings/${spooking.id}`}>
                                                <button className='spooking-detail-page-button'>
                                                    See Details
                                                </button>
                                            </Link>
                                            {/* <Link to={`/spookings/${spooking.id}/delete`}> */}
                                                <button className='spooking-cancel-button'
                                                    id={`${spooking.id}`}
                                                    onClick={handleCancel}
                                                >
                                                    Cancel Trip
                                                </button>
                                            {/* </Link> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
                {showPast && (
                    <div className='spookings-list-container'>
                        {pastSpookings.map(spooking => (
                            <div className='spooking-container' key={spooking.id}>
                                <div className='spooking-haunt-image' style={{backgroundImage: `url(${(spooking.Haunt.Images.length > 0) ? spooking.Haunt.Images[0].url : defaultHauntUrl})`}}></div>
                                <div className='spooking-info'>
                                    <div className='spooking-city-div'>
                                        {(spooking.Haunt.city).toUpperCase()}
                                    </div>
                                    <Link to={`/haunts/${spooking.Haunt.id}`} className='spooking-name-link'>
                                        <div className='spooking-name-div'>
                                            {spooking.Haunt.name}
                                        </div>
                                    </Link>
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
                                            {spooking.Haunt.city}, {(spooking.Haunt.state) && (
                                                <span>{spooking.Haunt.state}, </span>
                                                )}{spooking.Haunt.country}
                                        </div>
                                    </div>

                                </div>
                                <div className='spooking-host-div'>
                                    <div className='spooking-host-image' style={{backgroundImage: `url(${spooking.Haunt.User.Images.length ? spooking.Haunt.User.Images[0].url : defaultUserUrl})`}}></div>
                                    <div className='spooking-host-info'>
                                        <div className='spooking-host-name-div'>
                                            {spooking.Haunt.User.username}
                                        </div>
                                        <div className='spooking-host-email'>
                                            {spooking.Haunt.User.email}
                                        </div>
                                    </div>
                                </div>
                                <div className='spooking-other-info-div'>
                                    <div className='spooking-total-amount-div'>
                                        Total amount: <span className='spooking-dollar-amount'>
                                                ${getTotal(spooking.startDate, spooking.endDate, spooking.Haunt.rate)}
                                            </span>
                                    </div>
                                    <Link to={`/spookings/${spooking.id}`}>
                                        <button className='spooking-detail-page-button'>
                                            See Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <DeleteSpookingFormModal showDeleteSpookingModal={showDeleteSpookingModal} setShowDeleteSpookingModal={setShowDeleteSpookingModal} spooking={currentSpooking}/>
            </div>
    )
}

export default SpookingsPage;
