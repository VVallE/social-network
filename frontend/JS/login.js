document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login").addEventListener("click", function (event) {

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