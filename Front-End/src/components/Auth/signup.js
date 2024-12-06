const signup = async (email, password, name) => {
    if(name && password && email){try{
        const response = await fetch('http://localhost/api/signup', {
                method:"POST",
                credentials: "include",
                headers: [
                  ["Content-Type", "application/json"],
                  ["Content-Type", "text/plain"]
                ],
                body: JSON.stringify({ "name":name,"email":email, "password":password})
            }
        ).then(response => response.json())
        console.log(response.token)
        localStorage.setItem('token', response.token);
        window.location.href='/homepage';
    } catch (error) {
      console.error(error);
    };}
    return false;
};

export {signup};