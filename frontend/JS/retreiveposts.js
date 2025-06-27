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

async function likePost(postID) {
    let jwt_key = localStorage.getItem("jwt_key")
    let response = await fetch(`http://localhost:5000/api/posts/${postID}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt_key}`
        }, 
        body: {
            post_id: postID
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

        postElement.innerHTML = `
            <div class="post-author" id="${postnum}-author">Author: ${post.author_id}</div>
            <div class="post-content">${post.content}</div>
            <div class="post-date">Posted on: ${new Date(post.created_at)}</div>
            <div class="post-like" id="${postnum}-like"><button>Like!</button></div>
        `;
        feed.appendChild(postElement);

        document.getElementById(`${postnum}-like`).addEventListener("click", async function () {
            likePost(postnum);
        });
        document.getElementById(`${postnum}-author`).addEventListener("click", async function () {
            window.location.href = `./user.html?id=${post.author_id}`;
        });
        postnum += 1;
    });
});