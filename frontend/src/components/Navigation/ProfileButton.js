import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { Link } from 'react-router-dom';
import { getSpookings } from '../../store/spookings';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

const ProfileButton = ({ sessionUser, showLoginModal, setShowLoginModal, showSignupModal, setShowSignupModal, setShowAddHauntModal }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    // const [showLoginModal, setShowLoginModal] = useState(false);
    // const [showSignupModal, setShowSignupModal] = useState(false);


    const openMenu = e => {
        if (showMenu) return;
        e.currentTarget.classList.add('profile-button-active');
        setShowMenu(true);
    };

    const logoutUser = async() => {
        const response = await dispatch(logout());
        await dispatch(getSpookings(sessionUser));
        return response;
    }

    useEffect(() => {
        const closeMenu = () => {
            setShowMenu(false);
            document.getElementById('profile-button').classList.remove('profile-button-active');
        }
        if (showMenu) {
            document.addEventListener('click', closeMenu);
            return () => document.removeEventListener('click', closeMenu);
        }
    }, [showMenu])

    let menu;

    const loginClick = () => {
        setShowMenu(false);
        setShowLoginModal(true);
    }

    const signupClick = () => {
        setShowMenu(false);
        setShowSignupModal(true);
    }

    const hostClick = () => {
        setShowMenu(false);
        setShowAddHauntModal(true);
    }

    if (sessionUser) {
        menu = (
            <div id='menu'>
                <div className='menu-div' id='menu-username'>
                    {sessionUser.username}
                </div>
                <Link to='/spookings' className='menu-link'>
                    <div className='menu-div'>
                        Spookings
                    </div>
                </Link>
                <div className='menu-div' onClick={hostClick}>
                    Host a ghost
                </div>
                <div className='menu-div'
                    onClick={logoutUser}
                >
                    Log Out
                </div>
            </div>
        )
    } else {
        menu = (
            <div id='menu'>
                <div className='menu-div' onClick={loginClick}>
                    Log In
                </div>
                <div className='menu-div' onClick={signupClick}>
                    Sign Up
                </div>
                {/* <Link to='/haunts/new' className='menu-link'> */}
                <div className='menu-div' onClick={loginClick}>
                    Host a ghost
                </div>
                {/* </Link> */}
            </div>
        )
    }

    const defaultUserUrl = '/images/user-icon-lavender.png';

    return (
        <>
            <button
                id='profile-button'
                onClick={openMenu}
            >
                <img src='/images/hamburger.png' id='nav-hamburger' />
                {!sessionUser && (
                    <img src='/images/user-icon-gray.png' id='nav-user-icon' />
                )}
                {sessionUser && (
                    <div id='nav-user-icon' style={{backgroundImage: `url(${sessionUser.Images.length ? sessionUser.Images[0].url : defaultUserUrl})`}}>
                    </div>
                )}
            </button>
            {showMenu && menu}
            <LoginFormModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
            <SignupFormModal showSignupModal={showSignupModal} setShowSignupModal={setShowSignupModal} />
        </>
    )
}

export default ProfileButton;
