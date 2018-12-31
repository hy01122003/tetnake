import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

var Nav = (props) => {
    return (        
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex flex-lg-column flex-sm-row justify-content-between">
            <Link to='/' className='nav-link title'>Tetnake</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to='/' className={ 'nav-link ' + ( props.page === 'Home' && 'active' ) } >Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link to='/about' className={ 'nav-link ' + ( props.page === 'About' && 'active' ) } >About</Link>
                    </li>
                    <li class="nav-item">
                        <Link to='/game' className={ 'nav-link ' + ( props.page === 'Game' && 'active' ) } >Game</Link>
                </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;