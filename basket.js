const { enable, enabled } = require("debug");
const { DocumentQuery } = require("mongoose");
const { disableUnicode } = require("npmlog");

//Creation des variables qui seront envoyées dans le localStorage
let allPrices = [];
let products = [];
let contact = {};

//Fonction principale qui permet d'afficher le contenu du panier et de l'envoyer dans les variables envoyées a l'API
document.addEventListener('DOMContentLoaded', async () =>{
    try {
        let response = await fetch("https://alexandregabrieleorinoco.herokuapp.com/api/furniture");
        if (response.ok) {
            let furnitures = await response.json();
            console.log(furnitures);
            let basketContent = JSON.parse(localStorage.getItem("basketContent"));
            for (i = 0; i < basketContent.length; i++) {
                let itemFurniture = furnitures.find(furnitures => furnitures['_id'] == basketContent[i].idFurniture);
                console.log(itemFurniture);
                basket(itemFurniture, basketContent[i]);
                addFurniturePrice(itemFurniture);
                addIdFurniture(basketContent);
            
            }
            totalPrice(allPrices);
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (e) {
        console.log(e);
    }

   
})

//Fonction pour créer la structure HTML du panier
function basket(itemFurniture,basketContent){
    let cardBasket= document.getElementById('basket_content');
    console.log("basketContent", basketContent);
    let divBasket = document.createElement('div');
    cardBasket.appendChild(divBasket);
    divBasket.classList.add("d-flex", "flex-row", "justify-content-between", "my-2", "px-1", "bold");

    let nameFurniture = document.createElement('p');
    divBasket.appendChild(nameFurniture);
    nameFurniture.textContent = itemFurniture.name;

    let varnishFurniture = document.createElement('p');
    divBasket.appendChild(varnishFurniture);
    varnishFurniture.textContent = basketContent.varnish;

    let priceFurniture = document.createElement('p');
    divBasket.appendChild(priceFurniture);
    priceFurniture.textContent = itemFurniture.price;
    priceFurniture.classList.add("price");
}
//ajoute la liste des prix dans le tableau allPrices
function addFurniturePrice(itemFurniture) {
    let furniturePrice = itemFurniture.price;
    allPrices.push(furniturePrice);
}
console.log(allPrices);
//ajoute la liste des  furnitures dans le tableau products
function addIdFurniture(basketContent) {
    products.push(basketContent[i].idFurniture);
}
console.log(products);

function totalPrice(allPrices){
    let basketPrice = document.getElementById('basket_price');
    let total = 0;
    for ( i=0; i < allPrices.length; i++ ) {
        total = total + allPrices[i];
        basketPrice.textContent = "Total Price:  " + total + "$";
        localStorage.setItem("totalPrice", JSON.stringify(total));
    }
}

//fonction pour vider le localStorage et effacer le contenu du panier
function clearBasket(){
const clearBasket = document.getElementById('clear_basket');
clearBasket.addEventListener('click', function() {
        localStorage.clear();
        let basketContent = document.getElementById('basket_content');
        //tant qu'il reste un élément, on l'efface
        while(basketContent.firstChild){
            basketContent.removeChild(basketContent.firstChild);
        
        let basketPrice = document.getElementById('basket_price');
        basketPrice.textContent = "Total Price : 0 $";
        }
})
}

const url = "https://alexandregabrieleorinoco.herokuapp.com/api/furniture/order";

//Fonction pour récupérer les données du formulaire , les envoyer a l'API et récupérer en retour l'id de confirmation de commande
   
document.querySelector('form').addEventListener('submit', async (e) => {
  
    console.log("e", e);
    try {
        e.preventDefault();
        //récupération données formulaire
        const FD = new FormData(document.querySelector('form'));
        const contact=Object.fromEntries(FD.entries());
        console.log("contact",contact);
        
        const orderData = JSON.stringify({ contact, products });
        console.log(orderData);
            //envoi des objet contact et tableau products a l'API
            const contenu = await( await fetch(url , {
                method : 'POST',
                body : orderData,
                headers : {
                    'Content-type' : 'application/json'
                }
            })).json()
            console.log(contenu);
            //récupération de l'id de commande
            let orderId = contenu.orderId;
            console.log(orderId);
            
            localStorage.setItem('orderId',orderId);
            window.location.href = 'confirm.html';
    } catch (error) {
        console.warn(error)
    }

 

});
clearBasket();
verifBasket();

function verifBasket () {
    let buttonSubmit = document.getElementById('buttonSubmit');
    if (basketContent == null){
        buttonSubmit.disabled = true;
    }
    else{
        buttonSubmit.disabled = false;

    }
};