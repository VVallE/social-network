function createPost(content, mood, error) {
    let jwt_key = localStorage.getItem("jwt_key");
    fetch('http://localhost:5000/api/posts/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt_key}`
        },
        body: JSON.stringify({
            content: content,
            mood: mood,
            created_at: new Date().getDate(),
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location.href = "./main.html";
        })
        .catch(error => {
            console.error('Network error:', error);
            if (errormsg) {
                errormsg.textContent = 'Network error occurred';
            }
        });
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("post").addEventListener("click", function (event) {
        event.preventDefault();

        const content = document.getElementById("content-area").value;
        const mood = document.getElementById("mood-select").value;
        const errormsg = document.getElementById("error");

        createPost(content, mood, errormsg);
    });
});