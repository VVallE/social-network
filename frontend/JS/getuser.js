async function getUser(usrID) {    
    let response = await fetch(`http://localhost:5000/api/users/${usrID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer s`
        }
    })
    let data = await response.json();
    return data;
}

document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const userID = params.get('id');
    let me = await getUser(userID);
    document.getElementById("about-me").innerHTML = `
        <h3 class="about-username">${me['username']}</h4>
        <h4>${me['first_name']} ${me['last_name']}</h4>
        `
});