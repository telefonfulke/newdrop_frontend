const iconHome = document.getElementsByClassName("icon-home")[0];
const iconCart = document.getElementsByClassName("icon-cart")[0];
const iconUser = document.getElementsByClassName("icon-user")[0];
const iconLogout = document.getElementsByClassName("icon-logout")[0];
const btnBack = document.getElementById("Back");
const btnPay = document.getElementById("pay")
const btnPlus = document.getElementById('plus')

iconHome.addEventListener('click',()=>{
    window.location.href='../home.html'
});

iconUser.addEventListener('click',()=>{
    window.location.href= '../profile.html'
});



iconCart.addEventListener('click',()=>{
    window.location.href='../cart.html'
});

btnBack.addEventListener('click',()=>{
    window.location.href='../cart.html'
});

btnPay.addEventListener('click',()=>{
    window.location.href='../home.html'
});

btnPlus.addEventListener('click',()=>{
    window.location.href='../shippinginfo.html'
})
