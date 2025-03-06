const iconCart = document.getElementsByClassName("icon-cart")[0];
const iconLogout = document.getElementsByClassName("icon-logout")[0];
const iconHome = document.getElementsByClassName("icon-home")[0];
const btnEdit = document.getElementById("editProfile");
const btnEdit2 = document.getElementById("editOrder")
const btnEdit3 = document.getElementById("soldItems")




iconHome.addEventListener('click',()=>{
    window.location.href='../home.html'
})

iconLogout.addEventListener('click',logout);



iconCart.addEventListener('click',()=>{
    window.location.href='../cart.html'
});

btnEdit.addEventListener('click',()=>{
    window.location.href='../editProfile.html'
});



async function getProfile() {
    try {
        const res = await fetch('/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Error Response:', errorData);
            if (res.status === 401 || res.status === 403) {
                alert('Session expired. Please log in again.');
            } else {
                alert('Hiba a profiladatok lekérésekor!');
            }
            return;
        }

        const data = await res.json();
        console.log('Profile Data:', data);
        document.getElementById('name').innerHTML = data[0].name || '';
        document.getElementById('email').innerHTML = data[0].email || '';
    } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Hiba a profiladatok lekérésekor!');
    }
}

document.addEventListener('DOMContentLoaded', getProfile);




//logout
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