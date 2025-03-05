const iconUser = document.getElementsByClassName("icon-user")[0];
const iconLogout = document.getElementsByClassName("icon-logout")[0];
const iconHome = document.getElementsByClassName("icon-home")[0];
const btncheckout = document.getElementById("checkout");
 
iconHome.addEventListener('click',()=>{
    window.location.href='../home.html'
});

iconUser.addEventListener('click',()=>{
    window.location.href= '../profile.html'
});

iconLogout.addEventListener('click',logout);

btncheckout.addEventListener('click',()=>{
    window.location.href='../buy.html'
})


document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.querySelector(".cart-container");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cartContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-image">
                <div class="cart-details">
                    <p><strong>${item.name}</strong></p>
                    <p class="price">${item.price} Ft</p>
                    <p class="size">Size: ${item.size}</p>
                </div>
            </div>
        `).join("");
    }
});



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