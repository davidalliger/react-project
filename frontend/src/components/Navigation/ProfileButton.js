import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { NavLink } from 'react-router-dom';

const ProfileButton = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);


    const openMenu = e => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const logoutUser = async() => {
        const response = await dispatch(logout());
        return response;
    }

    useEffect(() => {
        const closeMenu = () => {
            setShowMenu(false);
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
                <p>
                    Share your haunt
                </p>
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
                <NavLink to='/login'>
                        <button className='nav-button'>
                            Log In
                        </button>
                </NavLink>
                <NavLink to='/signup'>
                        <button className='nav-button'>
                            Sign Up
                        </button>
                </NavLink>
                <p>
                    Share your haunt
                </p>
            </div>
        )
    }

    return (
        <>
            <div
                id='profile-button'
                onClick={openMenu}
            >
                <i class="fas fa-user-circle"></i>
            </div>
            {showMenu && menu}
        </>
    )
}

export default ProfileButton;
