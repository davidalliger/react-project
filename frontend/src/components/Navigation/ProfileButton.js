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
                <div className='menu-div'>
                    {sessionUser.username}
                </div>
                <div className='menu-div'>
                    Spookings
                </div>
                <div className='menu-div'>
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
                    Host a ghost
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
                {!sessionUser && (
                    <img src='/images/user-icon-gray.png' id='nav-user-icon' />
                )}
                {sessionUser && (
                    <img src='/images/user-icon-lavender.png' id='nav-user-icon' />
                )}
            </button>
            {showMenu && menu}
        </>
    )
}

export default ProfileButton;
