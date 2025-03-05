const iconHome = document.getElementsByClassName("icon-home")[0];
const iconCart = document.getElementsByClassName("icon-cart")[0];
const iconUser = document.getElementsByClassName("icon-user")[0];
const iconLogout = document.getElementsByClassName("icon-logout")[0];



iconHome.addEventListener('click', () => {
    window.location.href = '../home.html'
})

iconUser.addEventListener('click', () => {
    window.location.href = '../profile.html'
});

iconLogout.addEventListener('click', logout);

iconCart.addEventListener('click', () => {
    window.location.href = '../cart.html'
});



//logout
async function logout() {
    const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
    });

    const data = await res.json();
    if (res.ok) {
        alert(data.message);
        window.location.href = '../login.html'
    } else {
        alert('Hiba a kijelentkezéskor')
    }
}

async function fetchitem() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get("id");

    const res = await fetch(`/api/getitem?id=${itemId}`, {
        method: 'get'
    });

    const data = await res.json();
    console.log(data);

    if (data.images && data.images.length > 0) {
        // Az első kép a fő kép lesz
        document.querySelector(".product-card").innerHTML = `
        <div class="images">
            <img src="${data.images[0]}" alt="${data.brand} ${data.model}" class="main-image">
            <div class="image-gallery">
                ${data.images.slice(1).map((kep) => `
                    <img src="${kep}" alt="Additional image" class="thumbnail">
                `).join('')}
            </div>
        </div>
        <div class="details">
            <p class="name">${data.brand} ${data.model}</p>
            <p class="price">${data.price} Ft</p>
            <hr>
            <p class="brand"><strong>Brand:</strong> ${data.brand}</p>
            <p class="model"><strong>Model:</strong> ${data.model}</p>
            <p class="size"><strong>Size:</strong> ${data.size}</p>
            <p class="color"><strong>Color:</strong> ${data.color}</p>
            <p class="state"><strong>State:</strong> ${data.state}</p>
            <div class="buttons">
                <button class="cart" id="cart">Add to cart</button>
            </div>
        </div>`;

        // Ha szeretnéd, hogy kattintásra a fő kép változzon:
        document.querySelectorAll(".thumbnail").forEach(thumbnail => {
            thumbnail.addEventListener("click", function () {
                document.querySelector(".main-image").src = this.src;
            });
        });

        // "Add to cart" gomb eseményfigyelő
        document.getElementById("cart").addEventListener("click", function () {
            addToCart(data);
        });

    } else {
        document.querySelector(".product-card").innerHTML = `
        <p><strong>Description:</strong></p>
        <img src="default-image.png" alt="No image available">
        <div class="details">
            <p><strong>Name:</strong> ${data.brand} ${data.model}</p>
            <p><strong>Price:</strong> ${data.price}</p>
            <p><strong>Brand:</strong> ${data.brand}</p>
            <p><strong>Model:</strong> ${data.model}</p>
            <p><strong>Size:</strong> ${data.size}</p>
            <p><strong>Color:</strong> ${data.color}</p>
            <p><strong>State:</strong> ${data.state}</p>
        </div>`;
    }
}

// Kosárhoz adás funkció
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Ellenőrizzük, hogy a termék már benne van-e a kosárban
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (!existingItem) {
        cart.push({
            id: item.id,
            name: `${item.brand} ${item.model}`,
            price: item.price,
            size: item.size,
            image: item.images[0]
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "cart.html"; // Átirányítás a kosár oldalra
}


