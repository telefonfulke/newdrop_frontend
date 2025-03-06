
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

btnEdit2.addEventListener('click',()=>{
    window.location.href='../shippinginfo.html'
});

btnEdit3.addEventListener('click',()=>{
    window.location.href='../solditem.html'
});



async function getProfile() {
    const res = await fetch('/api/profile', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include' 
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
        document.getElementById('name').textContent = data.name || "N/A";
        document.getElementById('email').textContent = data.email || "N/A";
    } else {
        alert('Hiba a profiladatok lekérésekor!');
        window.location.href = '../login.html';
    }
}

// Oldal betöltésekor fusson le
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