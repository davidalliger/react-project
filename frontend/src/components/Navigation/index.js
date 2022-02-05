import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector(state => state.session.user)

    let userLinks;

    if (sessionUser) {
        userLinks = (
            <li className='nav-li'>
                <ProfileButton user={sessionUser}/>
            </li>
        );
    } else {
        userLinks = (
            <div id='user-links'>
                <li className='nav-li'>
                    <NavLink to='/login'>
                        <button className='nav-button'>
                            Log In
                        </button>
                    </NavLink>
                </li>
                <li className='nav-li'>
                    <NavLink to='/signup'>
                        <button className='nav-button'>
                            Sign Up
                        </button>
                    </NavLink>
                </li>
            </div>
        );
    }

    return (
        <nav id='nav-bar'>
            <ul id='nav-ul'>
                <li className='nav-li'>
                    <NavLink exact to='/'>
                        <button className='nav-button'>
                            Home
                        </button>
                    </NavLink>
                </li>
                {isLoaded && userLinks}
            </ul>
        </nav>
    );
}

export default Navigation;
