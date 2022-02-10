import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { Link } from 'react-router-dom';

const ProfileButton = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);


    const openMenu = e => {
        if (showMenu) return;
        e.currentTarget.classList.add('profile-button-active');
        setShowMenu(true);
    };

    const logoutUser = async() => {
        const response = await dispatch(logout());
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

    if (sessionUser) {
        menu = (
            <div id='menu'>
                <div className='menu-div'>
                    {sessionUser.username}
                </div>
                <div className='menu-div'>
                    Spookings
                </div>
                <Link to='/haunts/new' className='menu-link'>
                    <div className='menu-div'>
                        Host a ghost
                    </div>
                </Link>
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
                <Link to='/login' className='menu-link'>
                        <div className='menu-div'>
                            Log In
                        </div>
                </Link>
                <Link to='/signup' className='menu-link'>
                        <div className='menu-div'>
                            Sign Up
                        </div>
                </Link>
                <Link to='/haunts/new' className='menu-link'>
                    <div className='menu-div'>
                        Host a ghost
                    </div>
                </Link>
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
        </>
    )
}

export default ProfileButton;
