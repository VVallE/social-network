async function getAllPosts(mood) {
    let jwt_key = localStorage.getItem("jwt_key");
    let response = await fetch('http://localhost:5000/api/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt_key}`
        },
        body: JSON.stringify({
            mood: mood
        })
    })
    let data = await response.json();
    return data;
}

document.addEventListener("DOMContentLoaded", function () {
    const mood = /*document.getElementById("mood-select").value*/ "Happy";
    const feed = document.getElementById("post-feed");
    posts = getAllPosts(mood);
    posts.forEach(post => {
        fee
    });
});