const isTokenExpired = async(token) => {
    try {
        // const response = await axios.post('http://localhost/api/protected', { token });
        const response = await fetch('http://localhost/api/protected', {
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"token":token})
        }
    ).then(response => response.json()).then() 
        const isAuth=response.Auth;
        if(isAuth) return true;
        else return false
      } catch (error) {
        console.error(error);
      }
  };
const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token && isTokenExpired(token);
  };

export {isAuthenticated};