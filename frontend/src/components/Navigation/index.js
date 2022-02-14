import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector(state => state.session.user)

    return (
        <>
            {isLoaded && (
                <nav id='nav-bar' className='normal'>
                    <div id='nav-container'>
                        <div id='nav-title-div'>
                            <NavLink exact to='/' id='nav-title-link'>
                                    <img src='/images/logo-white-20.png' id='nav-logo' />
                                    scarebnb
                            </NavLink>
                        </div>
                        <div id='nav-middle-div'>
                            <NavLink to='/haunts'>
                                <button id='nav-find-haunt'>
                                    Search for haunts
                                </button>
                            </NavLink>
                        </div>
                        <div id='nav-user-div'>
                            <NavLink exact to='/haunts/new' id='nav-title-link'>
                                <button id='nav-share-haunt'>
                                    Host a ghost
                                </button>
                            </NavLink>
                            <ProfileButton sessionUser={sessionUser}/>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
}

export default Navigation;
