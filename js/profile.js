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
                'content-type': 'application/json'
            },
            credentials: 'include' 
        });

        const data = await res.json();
        console.log('Profile Data:', data);

        if (res.ok) {
            document.getElementById('name').innerHTML = data[0].name || "";
            document.getElementById('email').innerHTML = data[0].email || "";
        } else {
            alert('Hiba a profiladatok lekérésekor!');
            window.location.href = '../login.html';
        }
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