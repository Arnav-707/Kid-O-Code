// Updated NavBar.jsx
import React from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import NewLogo from '../../materials/logo-kid.png';
import {isAuthenticated} from '../Auth/auth_present';

function NavBar() {
    const auth = isAuthenticated();
    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li className={styles.menuButton}>
                    <button type='button' name='menu-icon'>
                        <i className='fa-solid fa-bars'></i>
                    </button>
                </li>
                <li className={styles.logo}>
                    <Link to='/HomePage'>
                        <img src={NewLogo} alt='new-logo' />
                    </Link>
                </li>
                <li className={styles.categoriesButton}>
                    <Link to='/EditorPage'>
                        <button type='button' name='categories-button'>
                            Editor
                        </button>
                    </Link>
                    <Link to='/courses'> 
                        <button type='button' name='categories-button'>
                            Courses
                        </button>
                    </Link>
                    <Link to="/PreQuiz">
                        <button type='button' name='categories-button'>
                            Check Your Knowledge
                        </button>
                    </Link>

                    {auth ? <Link to="/leaderboard">
                        <button type="button" name="categories-button">
                            Leaderboard
                        </button>
                    </Link>:<Link to='/login'>
                        <button type='button' name='login-button'>
                            {auth?"Log out":"log in"}
                        </button>
                    </Link>}
                </li>
                <li className={styles.signupButton}>
                    <Link to='/login'>
                        <button type='button' name='login-button'>
                        {auth?"Log out":"log in"}
                        </button>
                    </Link>
                </li>
                {/* <li className={styles.langButton}>
                    <button type='button' name='language-button'>
                        <i className='fa-solid fa-globe'></i>
                    </button>
                </li> */}
            </ul>
        </nav>
    );
}

export default NavBar;
