const signup = async (email, password, name) => {
    try{
        const response = await fetch('http://localhost/api/signup', {
                method:"POST",
                mode: 'same-origin',
                redirect: 'follow',
                credentials: "include",
                headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
                body: JSON.stringify({ "name":name,"email":email, "password":password})
            }
        ).then(response => response.json())
        localStorage.setItem('token', response.token);
        window.location.href='/homepage';
    } catch (error) {
      console.error(error);
    };
    return false;
};

export {signup};