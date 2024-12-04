const isTokenExpired = async(token) => {
    try {
        const response = await fetch('http://localhost/api/protected', {
            method:"POST",
            credentials: "include",
            headers: [
              ["Content-Type", "application/json"],
              ["Content-Type", "text/plain"]
            ],
            body: JSON.stringify({"token":token})
        }
    ).then(response => response.json()).then() 
        const isAuth=response.Auth;
        if(isAuth) return true;
        else {
          const response = await fetch('http://localhost/api/refresh', {
            method:"POST",
            credentials: "include",
            headers: [
              ["Content-Type", "application/json"],
              ["Content-Type", "text/plain"]
            ],
            body: JSON.stringify({"token":token})
        }
    ).then(response => response.json()).then() 
    const access_token = response.token;
    console.log(response);
    localStorage.removeItem('token');
    localStorage.setItem('token', access_token);
    if(access_token){
      isAuthenticated();
      window.location.reload();
      return true;
    }
    else{
      return false;
    }
        }
      } catch (error) {
        console.error(error);
      }
  };
const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token && isTokenExpired(token);
  };

export {isAuthenticated};