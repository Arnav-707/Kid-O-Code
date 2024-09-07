import React, { useState } from "react";
import CoursesSection from '../courses-section/CoursesSection';
import Tabs from "../tabs/Tabs";
import styles from './CoursesPage.css';

// Define your categories
const categories = [
    "Python",
    "Excel",
    "Web Development",
    "JavaScript",
    "Data Science",
    "AWS Certification",
    "Drawing",
];

// Define htmlValues if needed
const htmlValues = categories.map((category, index) => `value-${index}`);

function Courses({ setCurrentTab }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Handle tab selection
    const handleTabChange = (index) => {
        setSelectedIndex(index);
        setCurrentTab(categories[index]);
    };

    return (
        <div className={styles.coursesPage}>
            {/* <fieldset className={styles.coursesRadio}>
                {categories.map((category, idx) => (
                    <button
                        key={idx}
                        value={htmlValues[idx]}
                        onClick={() => handleTabChange(idx)}
                        className={selectedIndex === idx ? styles.selectedTab : styles.tab}
                    >
                        {category}
                    </button>
                ))}
            </fieldset> */}
            <CoursesSection /> {/* Add CoursesSection here */}
        </div>
    );
}

export default Courses;
