function register(username, password, email, name, surname, phone, errormsg) {
    if (password.length < 8) {
        errormsg.style.display = "block";
        errormsg.innerHTML = "Password must be equal to or over 8 characters";
        return 1;
    } else if (password.length > 48) {
        errormsg.style.display = "block";
        errormsg.innerHTML = "Password must be shorter than 48 characters"
        return 1;
    }

    if (username.length < 3) {
        errormsg.style.display = "block";
        errormsg.innerHTML = "Username must be at least 3 characters long";
        return 1;
    }
    let hasdigits = false;
    for (let i = 0; i < password.length; i++) {
        if ("0123456789".includes(password[i])) {
            hasdigits = true;
        }
    }
    if (hasdigits == false) {
        errormsg.style.display = "block";
        errormsg.innerHTML = "Password must contain at least one digit";
        return 1;
    }
    let specialChars = false;
    for (let i = 0; i < username.length; i++) {
        if ("'\"`".includes(username[i])) {
            specialChars = true;
        }
    }
    if (specialChars != false) {
        errormsg.style.display = "block";
        errormsg.innerHTML = "Username can't contain quotes";
        return 1;
    }

    fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
            first_name: name,
            last_name: surname,
            phone_number: phone,
        })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => { errormsg.style.display = "block";
        errormsg.innerHTML = errorData.msg;})
            } else {
                return response.json();
            }
        })
        .then(data => function () {
            console.log(data);
            window.location.href = "./login.html";
        })
        .catch(error => console.error('Error:', error));
    
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signup").addEventListener("click", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const name = document.getElementById("name").value;
        const surname = document.getElementById("surname").value;
        const phone = document.getElementById("phone").value;
        const errormsg = document.getElementById("error");

        register(username, password, email, name, surname, phone, errormsg);
        
    });
});