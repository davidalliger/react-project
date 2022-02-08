import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { NavLink } from 'react-router-dom';

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
                <p>
                    {sessionUser.username}
                </p>
                <p>
                    Trips
                </p>
                <button id='nav-share-haunt'>
                    Share your haunt
                </button>
                <button className='menu-button'
                    onClick={logoutUser}
                >
                    Log Out
                </button>
            </div>
        )
    } else {
        menu = (
            <div id='menu'>
                <NavLink to='/login' className='menu-link'>
                        <div className='menu-div'>
                            Log In
                        </div>
                </NavLink>
                <NavLink to='/signup' className='menu-link'>
                        <div className='menu-div'>
                            Sign Up
                        </div>
                </NavLink>
                <div className='menu-div'>
                    Share your haunt
                </div>
            </div>
        )
    }

    return (
        <>
            <button
                id='profile-button'
                onClick={openMenu}
            >
                <img src='/images/hamburger.png' id='nav-hamburger' />
                <img src='/images/user-icon-lavender.png' id='nav-user-icon' />
            </button>
            {showMenu && menu}
        </>
    )
}

export default ProfileButton;
