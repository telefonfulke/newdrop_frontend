
const iconCart = document.getElementsByClassName("icon-cart")[0];
const iconLogout = document.getElementsByClassName("icon-logout")[0];
const iconHome = document.getElementsByClassName("icon-home")[0];
const btnEdit = document.getElementById("editProfile");
const btnEdit2 = document.getElementById("editOrder")
const btnEdit3 = document.getElementById("soldItems")




iconHome.addEventListener('click',()=>{
    window.location.href='../home.html'
})

iconLogout.addEventListener('click',logout);



iconCart.addEventListener('click',()=>{
    window.location.href='../cart.html'
});

btnEdit.addEventListener('click',()=>{
    window.location.href='../editProfile.html'
});

btnEdit2.addEventListener('click',()=>{
    window.location.href='../shippinginfo.html'
});

btnEdit3.addEventListener('click',()=>{
    window.location.href='../solditem.html'
});



async function getProfile() {
    const res = await fetch('/api/profile', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include' // Szükséges a session vagy token miatt
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
        document.getElementById('name').textContent = data.name;
        document.getElementById('email').textContent = data.email;
    } else {
        alert('Hiba a profiladatok lekérésekor!');
        window.location.href = '../login.html';
    }
}

// Az oldal betöltésekor automatikusan lefut
document.addEventListener('DOMContentLoaded', getProfile);


app.get('/api/profile', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Nem vagy bejelentkezve!' });
    }

    const user = req.session.user; // Feltételezve, hogy a session tartalmazza a felhasználói adatokat
    res.json({ name: user.name, email: user.email });
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