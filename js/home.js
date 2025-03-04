const iconUser = document.getElementsByClassName("icon-user")[0];
const iconCart = document.getElementsByClassName("icon-cart")[0];
const iconLogout = document.getElementsByClassName("icon-logout")[0];
const btnfView = document.getElementById("view")
const sell = document.getElementById("sell")

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


async function allList() {
    const res = await fetch("/api/list", {
        method: "get"
    });

    const data = await res.json();
    console.log(data);

    // Clear the existing content
    document.getElementById("ide").innerHTML = '';

    data.map((item) => {
        document.getElementById("ide").innerHTML += `
        <div class="card">
            <a href="../shoe.html?id=${item.id}" id="card">
                <div class="card-header">
                    <img src="/uploads/${item.images[0]}" alt="product-image">
                </div>
                <div class="card-footer">
                    <h2>${item.brand}, ${item.model}</h2>
                </div>
                <div class="card-body">
                    <h1>${item.price} Ft</h1>
                </div>
            </a>
        </div>`;
    });


    if (!res.ok) {
        alert("Hiba a lekérdezésben.");
    }
}


iconUser.addEventListener('click', () => {
    window.location.href = '../profile.html'
});

iconLogout.addEventListener('click', logout);

iconCart.addEventListener('click', () => {
    window.location.href = '../cart.html'
});