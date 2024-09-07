import React from 'react';
import LinksList from '../links-list/LinksList';
import links from './links';
import styles from './Footer.module.css';
import {Link} from 'react-router-dom';

function Footer() {
    return (
        <footer
            id='page-footer'
            className={styles.footer}
        >
            <div className={styles.linksContainer}>
                <div className={styles.languageSwitch}>
                    <Link to='/courses'>
                        <img
                            src={require('../../materials/logo-kid1.png')}
                            alt='logo'
                            style={{width: '80px', height: '80px'}} /* Reduce logo size */
                        />
                    </Link>
                </div>
                {links.map((group, idx) => (
                    <LinksList
                        className={styles.linksGroup}
                        key={idx}
                        links={group}
                    />
                ))}
            </div>
        </footer>
    );
}

export default Footer;