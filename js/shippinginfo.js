const iconCart = document.getElementsByClassName("icon-cart")[0];
const iconHome = document.getElementsByClassName("icon-home")[0];
const iconUser = document.getElementsByClassName("icon-user")[0];
const btnBack = document.getElementById("Back");
const btnSave = document.getElementById("Save");


iconUser.addEventListener('click',()=>{
    window.location.href='../profile.html'
});

iconHome.addEventListener('click',()=>{
    window.location.href='../home.html'
})


btnBack.addEventListener('click',()=>{
    window.location.href='../buy.html'
});

btnSave.addEventListener('click',()=>{
    window.location.href='../profile.html'
});

iconCart.addEventListener('click',()=>{
    window.location.href='../cart.html'
});


