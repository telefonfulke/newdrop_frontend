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



document.addEventListener("DOMContentLoaded", function() {
    // Feltételezzük, hogy a kosár tartalmát egy "cart" tömb tárolja a localStorage-ban
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    let orderNameElement = document.querySelector("p strong:contains('Order's name:')").nextElementSibling;
    let amountElement = document.querySelector("p strong:contains('Amount to be paid:')").nextElementSibling;
    
    let totalAmount = 0;
    let orderNames = [];
    
    cart.forEach(item => {
        orderNames.push(item.name);
        totalAmount += item.price;
    });
    
    // Kiírjuk a termékek nevét és az összesített árat
    if (orderNameElement) {
        orderNameElement.textContent = orderNames.join(", ");
    }
    if (amountElement) {
        amountElement.textContent = totalAmount.toLocaleString() + " Ft";
    }
});
