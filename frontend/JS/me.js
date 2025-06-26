async function getInfoAboutSelf() {
    let jwt_token = localStorage.getItem("jwt_key");
    let response = await fetch('http://localhost:5000/api/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt_token}`
        }
    })
    let data = await response.json();
    return data;
}
document.addEventListener("DOMContentLoaded", async function () {
let me = await getInfoAboutSelf();
    document.getElementById("about-me").innerHTML = `
        <h4 class="about-username" id="about-me-username">${me['username']}</h4>
        <h5 id="about-me-email"></h5>
        `
});