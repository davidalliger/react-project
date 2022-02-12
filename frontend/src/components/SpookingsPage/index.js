import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FutureSpookings from './FutureSpookings';
import PastSpookings from './PastSpookings';
import './SpookingsPage.css';

const SpookingsPage = () => {
    const pastSpookings = useSelector(state => state.spookings.pastSpookings);
    const futureSpookings = useSelector(state => state.spookings.futureSpookings);
    const [showPast, setShowPast] = useState(false);
    const debug = () => {
        console.log('So far so good!');
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
            <div id='spookings-page-heading'>
                <h1>Spookings</h1>
            </div>
                {(!showPast) && (
                <>
                    <FutureSpookings futureSpookings={futureSpookings} />
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
