const login = async (username, password) => {
    try{
        const response = await fetch('http://localhost/api/login', {
                method:"POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"email":username, "password":password })
            }
        ).then(response => response.json()).then()
        localStorage.setItem('token', response.token);
        window.location.href='/homepage';
    } catch (error) {
      console.error(error);
    };
    return false;
};

  export {login};