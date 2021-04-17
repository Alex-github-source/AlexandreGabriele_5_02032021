
//Fonction principale
(async function() {
    const furnitures = await getFurnitures()
    for (let furniture of furnitures){
        displayFurniture(furniture)

    }
})()
//Fonction qui permet récuperer les données de l'api
function getFurnitures(){
    return fetch("https://alexandregabrieleorinoco.herokuapp.com/api/furniture")
    .then (function(response){
        return response.json()
    })
    .then(function(furnitures){
        return furnitures
    })
    .catch(function(error){
        alert(error)
    })
}
//Fonction qui permet de cloner le template html pour chaque élément retouné par l'API
function displayFurniture(furniture){
   const templateElt = document.getElementById('templateFurniture')
   const cloneElt = document.importNode(templateElt.content,true)

   cloneElt.getElementById("card__img").src = furniture.imageUrl;
   cloneElt.getElementById("card__title").textContent = furniture.name;
   cloneElt.getElementById("card__body").textContent = furniture.description;
   cloneElt.getElementById("card__price").textContent = furniture.price + ' $';
   cloneElt.getElementById('linkProduct').href = "produit.html?id=" + furniture._id;
   
   
   document.getElementById('main').appendChild(cloneElt);

  }
 



