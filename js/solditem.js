const iconUser = document.getElementsByClassName("icon-user")[0];
const iconCart = document.getElementsByClassName("icon-cart")[0];
const iconHome = document.getElementsByClassName("icon-home")[0];


iconUser.addEventListener('click',()=>{
    window.location.href ='../profile.html'
});

iconCart.addEventListener('click',()=>{
    window.location.href='../cart.html'
});

iconHome.addEventListener('click',()=>{
    window.location.href='../home.html'
});