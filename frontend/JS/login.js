function login(username, password, errogmsg) {
    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer s'
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })
        .then(response => response.json())
        .then(data => localStorage.setItem('jwt_key', data['access_token']))
        .catch(error => console.error('Error:', error));

}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login").addEventListener("click", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const errormsg = document.getElementById("error");

        login(username, password, errormsg);
        
    });
});