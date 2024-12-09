import React from "react";
import "./dashboard.module.css";
import { userData, quizData } from "./data";

function Dasboard() {
  // Filter only attempted quizzes
  const attemptedQuizzes = quizData.filter((quiz) => quiz.attempted);

  // Calculate average score
  const totalScore = attemptedQuizzes.reduce((sum, quiz) => sum + quiz.score, 0);
  const totalMarks = attemptedQuizzes.reduce((sum, quiz) => sum + quiz.totalMarks, 0);
  const averageScore = attemptedQuizzes.length > 0 ? (totalScore / totalMarks) * 100 : 0;

  return (
    <div className="App">
    <header className="App-header">
      {/* <h1>User Dashboard</h1> */}
    </header>
    <main>
    <div className="progress-container">
      {/* Personal Info */}
      <section className="personal-info">
        <h2>Personal Information</h2>
        <p className="info"><strong>Name :</strong> {userData.name}</p>
        <p className="info"><strong>UserID :</strong> {userData.userID}</p>
        <p className="info"><strong>Email :</strong> {userData.email}</p>
        <p className="info"><strong>Joined :</strong> {userData.joinedDate}</p>
      </section>

      {/* Quiz Performance */}
      <section className="quiz-results">
        <h2>Quiz Performance</h2>
        {attemptedQuizzes.length > 0 ? (
          <table>
            <thead>
              <tr>
                {/* <th>Quiz Name</th> */}
                <th>Score</th>
                <th>Total Marks</th>
              </tr>
            </thead>
            <tbody>
              {attemptedQuizzes.map((quiz, index) => (
                <tr key={index}>
                  {/* <td>{quiz.name}</td> */}
                  <td>{quiz.score}</td>
                  <td>{quiz.totalMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No quizzes attempted yet.</p>
        )}
      </section>

      {/* Average Score */}
      <section className="average-score">
        <h2>Average Score</h2>
        <p>{averageScore.toFixed(2)}%</p>
      </section>

      {/* Progress */}
      <section className="progress-bar">
        <h2 className="info">Progress</h2>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${userData.progress}%` }}
          >
            {userData.progress}%
          </div>
        </div>
      </section>
    </div>
    </main>
  </div>
  );
}

export default Dasboard;