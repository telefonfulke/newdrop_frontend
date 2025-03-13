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
    window.location.href='../home.html'
})
btnBack.addEventListener('click',()=>{
    window.location.href='../buy.html'
})

window.onload = function () {
    if (window.paypal) {
        window.paypal.Buttons({
            style: {
                shape: "rect",
                layout: "vertical",
                color: "gold",
                label: "paypal",
            },
            async createOrder() {
                try {
                    let amountElement = Number(localStorage.getItem("totalAmount"));
                    console.log(amountElement);
                    
                    if (!amountElement) {
                        console.error("Nem található az összeg eleme! Ellenőrizd a HTML struktúrát.");
                        alert("Hiba: az összeg nem található! Kérlek, frissítsd az oldalt.");
                        return;
                    }

                    let totalAmount = parseFloat(amountElement.innerText.replace(/[^\d,]/g, "").replace(",", "."));
                    if (isNaN(totalAmount) || totalAmount <= 0) {
                        throw new Error("Hibás összeg. Kérlek, ellenőrizd a rendelés adatait!");
                    }

                    console.log(totalAmount);

                    const response = await fetch("/api/orders", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ amount: totalAmount }),
                    });
                    console.log(response);
                    

                    if (!response.ok) {
                        throw new Error("Hiba a rendelés létrehozásakor.");
                    }

                    const orderData = await response.json();
                    console.log(orderData);
                    
                    return orderData.id;
                } catch (error) {
                    console.error("Rendelés hiba:", error);
                    alert("Hiba történt a rendelés során. Próbáld újra.");
                }
            },
            async onApprove(data, actions) {
                try {
                    const response = await fetch(`/api/orders/${data.orderID}/capture`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        throw new Error("Hiba a fizetés feldolgozásakor.");
                    }

                    const orderData = await response.json();
                    const transaction =
                        orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                        orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];

                    alert(`Sikeres tranzakció: ${transaction.id}`);

                    console.log("Tranzakció adatok:", orderData);
                } catch (error) {
                    console.error("Fizetés hiba:", error);
                    alert("Hiba történt a fizetés során. Próbáld újra.");
                }
            },
        }).render("#paypal-button-container");
    } else {
        console.error("PayPal SDK not loaded");
    }
};


