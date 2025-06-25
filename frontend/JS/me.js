function getInfoAboutSelf() {
    let jwt_token = localStorage.getItem("jwt_key");
    fetch('http://localhost:5000/api/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt_token}`
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

getInfoAboutSelf()