import Nav from './Nav';
import React from 'react';

var About = () => {
    return (
        <div id="About">
            <Nav page='About' />
            <div id="welcome" className='container'>
                <p class='welcome-body'>Hổng có gì hết trơn</p>
            </div>            
        </div>
    )
}

export default About;