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
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure the token is stored and retrieved correctly
            },
            credentials: 'include'
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Error Response:', errorData);
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log('Profile Data:', data);

        document.getElementById('name').innerHTML = data[0].name || "";
        document.getElementById('email').innerHTML = data[0].email || "";
    } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Hiba a profiladatok lekérésekor!');
        window.location.href = '../login.html';
    }
}

// Call the function to fetch profile data when the page loads
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