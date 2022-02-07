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
                    <div id='nav-container'>
                        <div id='nav-title-div'>
                            <NavLink exact to='/' id='nav-title-link'>
                                    <img src='/images/logo-white.png' id='nav-logo' />
                                    scarebnb
                            </NavLink>
                        </div>
                        <div id='nav-middle-div'>
                                Find a new haunt
                        </div>
                        <div id='nav-user-div'>
                            Share your haunt
                            <div id='nav-user-menu'>
                                <ProfileButton sessionUser={sessionUser}/>
                            </div>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
}

export default Navigation;
