const btnReg = document.getElementsByClassName('reg')[0];

btnReg.addEventListener('click', register);

async function register() {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    console.log(email, name, password, password2);
    if (password !== password2) {
        return alert('A két jelszó nem egyezik!');
    }

    const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, name, password })
    });

    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        alert(data.message);
        window.location.href = '../login.html';
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