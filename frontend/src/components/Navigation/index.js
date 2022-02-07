import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector(state => state.session.user)

    return (
        <>
            {isLoaded && (
                <nav id='nav-bar'>
                    <ul id='nav-ul'>
                        <li className='nav-li'>
                            <NavLink exact to='/' id='nav-title'>
                                <p>
                                    scarebnb
                                </p>
                            </NavLink>
                        </li>
                        <li className='nav-li'>
                            <p>
                                Find a new haunt
                            </p>
                        </li>
                        <div id='nav-user-div'>
                            <li className='nav-li'>
                                <p>
                                    Share your haunt
                                </p>
                            </li>
                            <li className='nav-li'>
                                <ProfileButton sessionUser={sessionUser}/>
                            </li>
                        </div>
                    </ul>
                </nav>
            )}
        </>
    );
}

export default Navigation;
