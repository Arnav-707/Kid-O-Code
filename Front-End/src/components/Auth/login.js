import { isAuthenticated } from "./auth_present";
const login = async (username, password) => {
    // First see if a vaild token is present or not
    if(!isAuthenticated()){
    try{
        const response = await fetch('http://localhost/api/login', {
                method:"POST",
                credentials: "include",
                headers: [
                  ["Content-Type", "application/json"],
                  ["Content-Type", "text/plain"]
                ],
                body: JSON.stringify({"email":username, "password":password })
            }
        ).then(response => response.json())
        localStorage.setItem('token', response.token);
        window.location.href='/homepage';
    } catch (error) {
      console.error(error);
    };
    return false;}
    else{
      window.location.href='/homepage';
    }
};

  export {login};