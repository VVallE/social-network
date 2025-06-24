function getUser() {
    const url = window.location.pathname.split('/');
    const userID = url.pop();

    fetch(`http://localhost:5000/api/user/${userID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer s`
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}


getUser();