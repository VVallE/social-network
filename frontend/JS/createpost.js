function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function createPost(content, mood, error) {
    let jwt_key = localStorage.getItem("jwt_key");

    let now = new Date();
    let rightnow = formatDateTime(now);
    
    fetch('http://localhost:5000/api/posts/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt_key}`
        },
        body: JSON.stringify({
            content: content,
            mood: mood,
            created_at: rightnow,
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(new Date());
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