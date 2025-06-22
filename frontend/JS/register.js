function register(username, password, email, name, surname, phone, errorbox, errormsg) {
    if (password.length < 8) {
        errorbox.style.display = "block";
        errormsg.innerText = "Password must be equal to or over 8 characters";
        return 1;
    } else if (password.length < 48) {
        errorbox.style.display = "block";
        errormsg.innerText = "Password must be shorter than 48 characters"
    }

    if (username.length < 3) {
        errorbox.style.display = "block";
        errormsg.innerText = "Username must be at least 3 characters long";
        return 1;
    }
    let hasdigits = false;
    for (let i = 0; i < password.length; i++) {
        if ("0123456789".includes(password[i])) {
            hasdigits = true;
        }
    }
    if (hasdigits == false) {
        errorbox.style.display = "block";
        errormsg.innerText = "Password must contain at least one digit";
        return 1;
    }
    let specialChars = false;
    for (let i = 0; i < username.length; i++) {
        if ("'\"`".includes(username[i])) {
            specialChars = true;
        }
    }
    if (specialChars == false) {
        errorbox.style.display = "block";
        errormsg.innerText = "Username can't contain quotes";
        return 1;
    }
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signup").addEventListener("click", function (event) {
        event.preventDefault()

        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const name = document.getElementById("name").value;
        const surname = document.getElementById("surname").value;
        const phone = document.getElementById("phone").value;
        const errorbox = document.getElementById("error");
        const errormsg = document.getElementById("error-txt");

        register(username, password, email, name, surname, phone, errorbox, errormsg);
        
    });
});