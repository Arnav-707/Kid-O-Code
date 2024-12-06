import React, { useEffect, useState } from 'react';
import styles from './Leaderboard.module.css';
import { isAuthenticated } from '../Auth/auth_present';

const Leaderboard = () => {
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loginerr, setlogerr] = useState(false);

  const API_URL = 'http://localhost/api/leaderboard'; 

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if(token){
      try {
        const res = await fetch(API_URL, {
          method:"POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token:token})
      })
      const response = await res.json();
      if(response.message!=='Not Auth'){ 
        setUsers(response);
        setLoading(false);
      }
      else{
        isAuthenticated()
        setlogerr(true);
        setLoading(false);
      }
      } catch (err) {
        console.error('Error fetching leaderboard data:', err);
        setError(true);
        setLoading(false);
      }
    }
    else{
      setlogerr(true);
      setLoading(false);
    }
    };

    fetchData();
  }, []);
  const renderData = Object.values(user)
  .map((user,index=0)=>{
    // console.log(user)
return(
    <tr key={index} className={styles.tableRow}>
              <td className={styles.rankCell}>{index + 1}</td>
              <td className={styles.userCell}>
                <img src={user.avatar} alt={`${user.name}'s avatar`} className={styles.avatar} />
                <span>{user.name}</span>
              </td>
              <td className={styles.scoreCell}>{user.score}</td>
            </tr>
)
  });
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
  if( loginerr){
    return <p className={styles.error}>Failed to load leaderboard data. Please Login.</p>;
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
          {renderData}
        </tbody>
     </table>
     </div>
  );
};

export default Leaderboard;
