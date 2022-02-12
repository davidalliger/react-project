import { useSelector } from 'react-redux';
import './SpookingsPage.css';
import { Link } from 'react-router-dom';

const FutureSpookings = ({futureSpookings}) => {
    const today = new Date();
    console.log(futureSpookings);

    const defaultHauntUrl = '/images/hauntedhouse.jpg';
    const defaultUserUrl = '/images/user-icon-lavender.png';

    return (
        <div id='future-spookings-container'>
            {(!futureSpookings.length) && (
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
            {(futureSpookings.length > 0) && (
                <div className='spookings-list-container'>
                    {futureSpookings.map(spooking => (
                        <div className='spooking-container'>
                            <div className='spooking-haunt-image' style={{backgroundImage: `url(${spooking.Haunt.Images.length ? spooking.Haunt.Images[0].url : defaultHauntUrl})`}}></div>
                            <div className='spooking-info'>
                                <div>
                                    {spooking.Haunt.city}
                                </div>
                                <div>
                                    {spooking.Haunt.name}
                                </div>
                                <div>
                                    {spooking.Haunt.name}
                                </div>
                                <div>
                                    {spooking.Haunt.address}
                                </div>
                                <div>
                                    {spooking.Haunt.city}, {spooking.Haunt.s}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FutureSpookings;
