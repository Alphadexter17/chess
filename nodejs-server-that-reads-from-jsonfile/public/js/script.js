fetch('/api/users')
    .then(response => response.json())
    .then(data => {
        const userList = document.getElementById('userList');
        data.forEach(user => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = `${user.id}: ${user.name}`;
            userList.appendChild(li);
        });
    })
    .catch(error => console.error('Error fetching user data:', error));
