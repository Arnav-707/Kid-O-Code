import React, { useEffect, useState } from 'react';
import styles from './Leaderboard.module.css';
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_URL = 'http://localhost/api/leaderboard'; // Update to your Node.js server endpoint

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        const sortedUsers = response.data.sort((a, b) => b.score - a.score);
        setUsers(sortedUsers);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard data:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
        <p>Loading Leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return <p className={styles.error}>Failed to load leaderboard data. Please try again later.</p>;
  }

  return (
    <div className={styles.leaderboardContainer}>
      <h1 className={styles.title}>Leaderboard</h1>
      <table className={styles.leaderboardTable}>
        <thead>
          <tr>
            <th className={styles.rankHeader}>Rank</th>
            <th className={styles.userHeader}>User</th>
            <th className={styles.scoreHeader}>Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className={styles.tableRow}>
              <td className={styles.rankCell}>{index + 1}</td>
              <td className={styles.userCell}>
                <img src={user.avatar} alt={`${user.name}'s avatar`} className={styles.avatar} />
                <span>{user.name}</span>
              </td>
              <td className={styles.scoreCell}>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
