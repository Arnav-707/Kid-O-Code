import React from 'react';
import './Header.css'
import TechBot from '../../materials/techbot.png';
// import TechBodt from '../Kid-O-Code/Kid-O-Code/src/materials/techbot.png';

function Header() {
    return (
        <>
            <section className='new-to-udemy'>
                <article>
                    <p>CODING FOR KIDS</p>
                    <p>
                    Introducing programming games for the next generation
                    </p>
                </article>
                <figure>
                    <img
                        src={TechBot}
                        alt='techbot'
                    />
                </figure>
            </section>
        </>
    );
}

export default Header;
