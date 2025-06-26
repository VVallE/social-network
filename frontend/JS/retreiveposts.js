async function getAllPosts(mood) {
    let response = await fetch(`http://localhost:5000/api/posts?mood=${encodeURIComponent(mood)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer s`
        }
    });
    let data = await response.json();
    console.log(data);
    return data;
}
let postnum = 0;

document.addEventListener("DOMContentLoaded", async function () {
    const mood = /*document.getElementById("mood-select").value*/ "happy";
    const feed = document.getElementById("post-feed");
    const posts = await getAllPosts(mood);
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.className = "post";
        postElement.id = postnum;
        postElement.onclick = function () {
            window.location.href = `http://127.0.0.1:5500/frontend/HTML/post.html?id=${postnum}`
        }
        postElement.innerHTML = `
            <div class="post-author">Author: ${post.author_id}</div>
            <div class="post-content">${post.content}</div>
            <div class="post-date">Posted on: ${new Date(post.created_at).toLocaleString()}</div>
        `;
        feed.appendChild(postElement);
        postnum += 1;
    });
});