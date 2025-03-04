const iconHome = document.getElementsByClassName('icon-home')[0];
const iconCart = document.getElementsByClassName('icon-cart')[0];
const iconUser = document.getElementsByClassName('icon-user')[0];
const btnBack = document.getElementById('Back');
const btnSubmit = document.getElementById('Submit');

iconHome.addEventListener('click', () => {
    window.location.href = '../home.html'
});

iconCart.addEventListener('click', () => {
    window.location.href = '../cart.html'
});

iconUser.addEventListener('click', () => {
    window.location.href = '../profile.html'
});

btnBack.addEventListener('click', () => {
    window.location.href = '../home.html'
});

document.getElementById("uploadButton").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("product-image").click(); // Több fájl választása
});

let images = []; // Global array for storing selected images

// Képek előnézetének megjelenítése
document.getElementById("product-image").addEventListener("change", function (e) {
    const files = e.target.files;
    const previewContainer = document.getElementById("image-preview-container");

    // Töröljük a korábbi előnézeteket
    previewContainer.innerHTML = "";

    if (files.length > 0) {

        Array.from(files).forEach(file => {
            images.push(file); // Store images globally
            console.log(images);
            const reader = new FileReader();
            reader.onload = function (event) {
                const image = document.createElement("img");
                image.src = event.target.result;
                image.alt = "Image Preview";
                image.classList.add("image-preview"); // Kép stílus hozzáadása
                previewContainer.appendChild(image);
            };
            reader.readAsDataURL(file);
        });
    }
});

// Képek feltöltése
document.getElementById("productForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const price = document.getElementById("product-price").value;
    const brand = document.getElementById("product-brand").value;
    const model = document.getElementById("product-model").value;
    const size = document.getElementById("product-size").value;
    const color = document.getElementById("product-color").value;
    const state = document.getElementById("product-state").value;

    // Get selected files
    if (!brand || !model || !size || !color || !state || !price || images.length === 0) {
        alert("Minden mezőt ki kell tölteni, és legalább egy képet fel kell tölteni!");
        return;
    }

    const formData = new FormData();
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("state", state);


    Array.from(images).forEach(image => {
        formData.append("productImages", image);
    });

    try {
        const res = await fetch("/api/upload", {
            method: "PUT", 
            body: formData
        });

        const data = await res.json();
        console.log("Szerver válasz:", data);

        if (res.ok) {
            alert("Sikeres feltöltés!");
        } else {
            alert("Hiba történt: " + data.message);
        }
    } catch (error) {
        console.error("Hálózati hiba:", error);
        alert("Nem sikerült csatlakozni a szerverhez.");
    }
});

