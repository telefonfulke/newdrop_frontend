const iconUser = document.getElementsByClassName("icon-user")[0];
const iconCart = document.getElementsByClassName("icon-cart")[0];
const iconLogout = document.getElementsByClassName("icon-logout")[0];
const iconHome = document.getElementsByClassName("icon-home")[0];
const btnBack = document.getElementById("editProfile");
const btnSave = document.getElementById("editprofile");

iconHome.addEventListener('click',()=>{
    window.location.href='../home.html'
})

iconUser.addEventListener('click',()=>{
    window.location.href= '../profile.html'
});

iconLogout.addEventListener('click',logout);

iconCart.addEventListener('click',()=>{
    window.location.href='../cart.html'
});

btnBack.addEventListener('click',()=>{
    window.location.href='../profile.html'
});




document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/profile', {
            credentials: 'include'
        });
        
        if (response.ok) {
            const userData = await response.json();
            document.getElementById('name').value = userData.name || '';
            document.getElementById('email').value = userData.email || '';
        } else {
            alert('Error loading profile data');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error loading profile data');
    }
});

btnSave.addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ name, email })
        });

        if (response.ok) {
            alert('Profile updated successfully');
            window.location.href = '../profile.html';
        } else {
            const error = await response.json();
            alert(error.message || 'Error updating profile');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error updating profile');
    }
});

async function logout(){
    const res = await fetch('/api/logout',{
        method:'POST',
        credentials:'include'
    });

        const data = await res.json();
    if(res.ok){
        alert(data.message);
        window.location.href ='../login.html'
    } else{
        alert('Hiba a kijelentkezéskor')
    }
}