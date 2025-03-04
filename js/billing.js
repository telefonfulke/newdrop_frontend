const iconHome = document.getElementsByClassName("icon-home")[0];
const iconCart = document.getElementsByClassName("icon-cart")[0];
const iconUser = document.getElementsByClassName("icon-user")[0];
const btnSave = document.getElementById("Save");
const btnBack = document.getElementById("Back");

iconHome.addEventListener('click',()=>{
    window.location.href='../home.html'
});
iconCart.addEventListener('click',()=>{
    window.location.href='../cart.html'
});
iconUser.addEventListener('click',()=>{
    window.location.href='../profile.html'
});
btnSave.addEventListener('click',()=>{
    window.location.href='../buy.html'
})
btnBack.addEventListener('click',()=>{
    window.location.href='../buy.html'
})