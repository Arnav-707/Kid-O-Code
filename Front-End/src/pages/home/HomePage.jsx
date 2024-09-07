import React, { useEffect } from 'react';
import Header from '../../components/header/Header';
import styles from './HomePage.module.css';
import IMG1 from '../../materials/Hero1.png';
import IMG2 from '../../materials/Hero2.png';
import IMG3 from '../../materials/Hero3.png';

function HomePage() {
    useEffect(() => {
        const footer = document.querySelector('#page-footer');
        footer.style.marginBottom = '0';
        const pathName = window.location.href;
        if (
            !(
                pathName.includes('#courses') ||
                pathName.includes('courses') ||
                pathName.includes('filter')
            )
        )
            window.scrollTo(0, 0);
        else if (pathName.includes('#courses')) {
            const section = document.querySelector('#courses-section');
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });

    return (
        <>
            <Header />
            {/* First Section */}
            <section className={styles.welcomeSection}>
                <div className={styles.textContainer}>
                    <h1>Welcome to Our Learning Platform</h1>
                    <p>Start your journey with our expert-led courses in various fields.</p>
                    <button className={styles.getStartedButton}>Get Started</button>
                </div>
            </section>

            {/* Second Section */}
            <section className={styles.imageSection}>
                <div className={styles.imageContainer}>
                    <img src={IMG1} alt="Image 1" className={styles.image} />
                    <h3>Teachers</h3>
                    <p>Discover how fun teaching computer programming can be! KIDO's coding curriculum fosters the development of executive functioning skills, such as problem solving and planning, as well as geometric and mathematical thinking.</p>
                </div>
                <div className={styles.imageContainer}>
                    <img src={IMG2} alt="Image 2" className={styles.image} />
                    <h3>Parents</h3>
                    <p>With KIDO's all-inclusive home plan, your child will learn to code in no time! KIDO's courses teach text-based coding so kids learn to program like a real developer. This is coding made fun. No previous experience is needed! </p>
                </div>
            </section>
            <center><h3>Apps and web-based courses</h3></center>
            <section className={styles.imageSection1}>
                <div className={styles.imageContainer1}>
                    <img src={IMG3} alt="Image 3" className={styles.image} />
                </div>
            </section>
            <section className={styles.welcomeSection1}>
                <div className={styles.textContainer}>
                    <h1>FREE Trial</h1>
                    <p>Enjoy a full-blown gaming experience that will teach your kids to code!.</p>
                    <button className={styles.getStartedButton}>Start Today</button>
                </div>
            </section>
        </>
    );
}

export default HomePage;
