import React, { useState, useEffect } from 'react';
import styles from './QuizPage.module.css';
import axios from 'axios';

const QuizPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [time, setTime] = useState(500); // 500 seconds timer
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        // Fetch quiz questions from the backend
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://jerry/api/quiz');
                console.log(response.data[0].ques)
                setQuestions(response.data);
            } catch (err) {
                console.error('Error fetching quiz questions:', err);
            }
        };

        fetchQuestions();
    }, []);

    useEffect(() => {
        if (time > 0 && !isCompleted) {
            const timer = setInterval(() => {
                setTime(time - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (time === 0) {
            setIsCompleted(true);
        }
    }, [time, isCompleted]);

    const handleOptionClick = (option) => {
        setAnswers([...answers, option]);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setIsCompleted(true);
        }
    };

    const calculateScore = () => {
        return answers.filter((answer, index) => answer === questions[index].answer).length;
    };

    if (isCompleted) {
        return (
            <div className={styles.resultContainer}>
                <h1 className={styles.title}>Quiz Completed!</h1>
                <p className={styles.result}>Your Score: {calculateScore()} / {questions.length}</p>
                <button onClick={() => window.location.reload()} className={styles.restartButton}>Restart Quiz</button>
            </div>
        );
    }

    return (
        <div className={styles.quizContainer}>
            <h1 className={styles.title}>Quiz: Check Your Knowledge</h1>
            {questions.length > 0 ? (<></>
                // <>
                //     <div className={styles.timer}>Time Left: {time} seconds</div>
                //     <div className={styles.questionContainer}>
                //         <p className={styles.question}>{questions[currentQuestion].question}</p>
                //         <div className={styles.options}>
                //             {questions[currentQuestion].options.map((option, index) => (
                //                 <button
                //                     key={index}
                //                     className={styles.optionButton}
                //                     onClick={() => handleOptionClick(option)}
                //                 >
                //                     {option}
                //                 </button>
                //             ))}
                //         </div>
                //     </div>
                // </>
            ) : (
                <p>Loading questions...</p>
            )}
        </div>
    );
};

export default QuizPage;
