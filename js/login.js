const btnLogin = document.getElementsByClassName('login')[0];

btnLogin.addEventListener('click', login);

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(email, password);
    
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
    });

    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        alert(data.message);
        window.location.href = '../home.html';
    } else if (data.errors) {
        let errorMessage = '';
        for (let i = 0; i < data.errors.length; i++) {
            errorMessage += `${data.errors[i].error}\n`;
        }
        alert(errorMessage);
    } else if (data.error) {
        alert(data.error);
    } else {
        alert('Ismeretlen hiba');
    }
}