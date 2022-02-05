import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const ProfileButton = ({user}) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = e => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const logoutUser = async() => {
        console.log('In logoutUser');
        const response = await dispatch(logout());
        console.log('User should be logged out.');
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


    const menu = (
        <div id='menu'>
            <p>
                {user.username}
            </p>
            <p>
                {user.email}
            </p>
            <button className='menu-button'
                onClick={logoutUser}
            >
                Log Out
            </button>
        </div>
    )

    return (
        <>
            <div
                id='profile-button'
                onClick={openMenu}
            >
                <i className="fas fa-user"></i>
            </div>
            {showMenu && menu}
        </>
    )
}

export default ProfileButton;
