import React from 'react';
import styles from './about.module.css';

const About = () => {
    const teamMembers = [
        {
            name: 'Arnav Jain',
            role: 'Front End Developer',
            image: require('../../materials/logo-kid.png'),
            bio: 'Co-Conspirator!'
        },
        {
            name: 'Armaan Arora',
            role: 'Front End Developer',
            image: require('../../materials/logo-kid.png'),
            bio: 'Co-Conspirator!'
        },
        {
            name: 'Arnav Ahuja',
            role: 'Back End Developer',
            image: require('../../materials/logo-kid.png'),
            bio: 'et tu Agarwal!'
        },
        {
            name: 'Arnav Agrawal',
            role: 'Back End Developer',
            image: require('../../materials/logo-kid.png'),
            bio: 'Co-Conspirator!'
        }
    ];

    return (
        <div className={styles.aboutContainer}>
            <div className={styles.aboutContent}>
                <h1>About Us</h1>
                <p>
                    Welcome to Kid-O-Code, where we believe in empowering the next generation of tech-savvy innovators...
                </p>
                <h2>Meet Our Team</h2>
                <div className={styles.teamContainer}>
                    {teamMembers.map((member, index) => (
                        <div key={index} className={styles.teamMember}>
                            <img src={member.image} alt={member.name} className={styles.teamImage} />
                            <h3>{member.name}</h3>
                            <p className={styles.role}>{member.role}</p>
                            <p>{member.bio}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;