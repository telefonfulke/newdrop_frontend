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

btnSave.addEventListener('click',()=>{
    window.location.href='../profile.html'
})



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