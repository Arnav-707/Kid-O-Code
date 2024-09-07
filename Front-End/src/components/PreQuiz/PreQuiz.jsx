import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PreQuizForm.module.css';

const PreQuizForm = () => {
    const [className, setClassName] = useState('');
    const [interest, setInterest] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // You can save or process the collected data here
        navigate('/quiz'); // Redirect to the quiz page
    };

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>Pre-Quiz Survey</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    Class:
                    <input
                        type='text'
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    Favorite Area of Study:
                    <input
                        type='text'
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
                <button type='submit' className={styles.submitButton}>Start Quiz</button>
            </form>
        </div>
    );
};

export default PreQuizForm;
