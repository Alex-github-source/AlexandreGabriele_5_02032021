document.addEventListener('DOMContentLoaded',  () =>{

    //creation de la structure html 
    const orderId= localStorage.getItem('orderId');
    const confirmation = document.getElementById('orderId');
    confirmation.innerHTML = "Thank for your command n° : " + orderId;
    const price= localStorage.getItem('totalPrice');
    const confPrice = document.getElementById('totalPrice');
    confPrice.innerHTML = "Total price : " + price + "$";

    //bouton reset commande
    const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click' , function clearOrder(){
        localStorage.clear();
        window.location.href = 'frontend/index.html';

    })
})