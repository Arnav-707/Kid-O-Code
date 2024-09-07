import React, { useContext, useState, useEffect } from 'react';
import CoursesBox from '../../components/courses-box/CoursesBox';
import Tabs from '../tabs/Tabs';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import { Data, FetchState } from '../../App';
import styles from './CoursesSection.module.css';

function CoursesSection() {
    const [currentTab, setCurrentTab] = useState('python_res');
    const fetched = useContext(FetchState);
    const coursesData = useContext(Data);

    // State and text array for the slideshow
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const textArray = ['Write Code.', 'Learn Code.', 'Relax.'];

    // useEffect to handle text change
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
        }, 2000); // Change text every 2 seconds

        return () => clearInterval(interval);
    }, [textArray.length]);

    return (
        <div id='courses-section' className={styles.coursesSection}>
            {/* Text Slideshow */}
            <h2 className={styles.coursesSectionTitle}>
                {textArray[currentTextIndex]}
            </h2>
            <p>
                Choose from 185,000 online video courses with new additions
                published every month
            </p>
            <Tabs setCurrentTab={setCurrentTab} />
            {fetched ? (
                <CoursesBox sectionData={coursesData[currentTab]} />
            ) : (
                <LoadingSpinner />
            )}
        </div>
    );
}

export default CoursesSection;
