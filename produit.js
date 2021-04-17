//Creation du tableau product
class MyProduct {
    constructor(idFurniture, varnish) {
        this.idFurniture = idFurniture;
        this.varnish = varnish;
    }
}
//Fonction principale qui affiche la reponse envoyée par l'API suivant le furniture selectionné
document.addEventListener('DOMContentLoaded', async () =>{
    try {
        let urlSearch = new URLSearchParams(window.location.search);
        let idFurniture = urlSearch.get('id');
        let response = await fetch("https://alexandregabrieleorinoco.herokuapp.com/api/furniture/" + idFurniture);
        if (response.ok) {
            let furniture = await response.json();
            console.log(furniture);
            getFurnitureItem(furniture, idFurniture);
        
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (e) {
        console.log(e);
    }

   
})
//Creation de la structure html
function getFurnitureItem(furniture,idFurniture) {
    let cardImg = document.getElementById('card__img');
    cardImg.src = furniture.imageUrl;
    let cardTitle = document.getElementById('card__title');
    cardTitle.textContent = furniture.name;
    let cardDescription = document.getElementById('card__body');
    cardDescription.textContent = furniture.description;
    let cardPrinc = document.getElementById('cardBody')
//Appel du chois de vernis
    chooseVarnish( cardPrinc,furniture);

    let cardPrice = document.getElementById('card__price');
    cardPrice.textContent = furniture.price + " $";
    let linkProduct = document.createElement("a");
    cardPrice.appendChild(linkProduct);

    // Création du bouton d'ajout au panier
    let buttonBuy = document.createElement("button");
    linkProduct.appendChild(buttonBuy);
    buttonBuy.classList.add("btn", "btn-warning", "block-right");
    buttonBuy.textContent = "Add";
    getVarnish(buttonBuy, idFurniture);

    //Ajout de la sélection de vernis disponible par meuble
    function chooseVarnish(cardPrinc) {
        let sentenceChoiceVarnish = document.createElement("p");
        cardPrinc.appendChild(sentenceChoiceVarnish);
        sentenceChoiceVarnish.textContent = "Choose your varnish :";

        let choiceVarnish = document.createElement("select");
        cardPrinc.appendChild(choiceVarnish);
        choiceVarnish.classList.add("form-control", "mb-5");
        choiceVarnish.id = "list";

        numberVarnish = furniture.varnish;
        for (let i = 0; i < numberVarnish.length; i++) {
        let optionVarnish = document.createElement("option");
        choiceVarnish.appendChild(optionVarnish);
        optionVarnish.textContent = furniture.varnish[i];
        }
    }
}
//Envoie le tableau product (id du meuble + vernis selectionné) dans le local storage au click du bouton
function getVarnish(buttonBuy, idFurniture) {
    buttonBuy.addEventListener('click', function () {
        let basketContent = JSON.parse(localStorage.getItem("basketContent"));
        let varnish = document.getElementById('list').value;
        if (basketContent === null) {
            basketContent = [];
        }
        let product = new MyProduct(idFurniture, varnish);
        basketContent.push(product);
        localStorage.setItem("basketContent", JSON.stringify(basketContent));
    })
}
