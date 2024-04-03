import { React, useState, useCallback } from 'react';
import './Header.css';
import { Link, NavLink } from "react-router-dom";
import logo from '../Pages/Images/web-material/logo1.png';
import naviGateIcon from '../Pages/Images/icons/bars-solid.svg';
import cancelIcon from '../Pages/Images/icons/cancel.svg';

const Header = () => {
    const [toggle, setToggle] = useState(true);
    const [flag, setFlag] = useState(!!localStorage.getItem("Token"));

    const handleClick = useCallback(() => {
        setToggle(prevToggle => !prevToggle);
    }, []);

    const userLogoutOnClick = useCallback(() => {
        localStorage.removeItem("Token");
        setFlag(false);
    }, []);

    return (
        <>
            <nav className="NavBar">
                <div className='left-box'>
                    <img width='50px' height="50px" className="logo" src={logo} alt="PG" />
                    <h1>Petro<span style={{ color: 'white' }}>Learn</span></h1>
                    <div className={`div${toggle ? ' show-menu' : ''}`}>
                        <ul>
                            <li><NavLink onClick={handleClick} className='link' to="/">Home</NavLink></li>
                            <li><Link activeStyle={{ color: "white" }} onClick={handleClick} className='link' to="/Study">Study</Link></li>
                            <li><Link onClick={handleClick} className='link' to="/About">About</Link></li>
                            <li><Link onClick={handleClick} className='link' to="/Contact">Contact</Link></li>
                        </ul>
                    </div>
                </div>
                <div className='right-box'>
                    <div className='box'>
                        <Link to="/RegisterAndLogin" onClick={userLogoutOnClick} className='btn'>{flag ? "Logout" : "Login"}</Link>
                        <img width="25px" className='toggle-icon' onClick={handleClick} src={!toggle ? cancelIcon : naviGateIcon} alt='nav-icon' />
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
