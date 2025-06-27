function login(username, password, errormsg) {
    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.access_token) {
                localStorage.setItem('jwt_key', data.access_token);
                console.log('Login successful:', data);
                window.location.href = "./main.html";
            } else {
                console.error('Login failed:', data.msg);
                if (errormsg) {
                    errormsg.textContent = data.msg || 'Login failed';
                }
            }
        })
        .catch(error => {
            console.error('Network error:', error);
            if (errormsg) {
                errormsg.textContent = 'Network error occurred';
            }
        });
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