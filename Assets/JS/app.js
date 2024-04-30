const baseUrl ='https://mundt.gg/wp-json/wp/v2/';

const recipeId =3;

const fastCooktimeId = 43;
const mediumCooktimeId = 44;
const slowCooktimeId = 45;

// Skulle have været brugt til filtrering
// const diabeticFriendlyId = 35;
// const glutenFreeId = 5;
// const ketoId = 7;
// const veganId = 36;
// const vegetarianId = 6;

const containerEL = document.querySelector('.container');
const individualRecipesEl = document.querySelector('.individualRecipes');


// Måske en if statement på undersiderne
function getToken(){
    const loginInfo = {
        username: 'apiAdmin',
        password: 'AvoG j6W3 Fe8B VHBH lb43 ZuQU'
    }

    return fetch('https://mundt.gg/wp-json/jwt-auth/v1/token', {
        method: 'POST', 
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(loginInfo)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        sessionStorage.setItem('myToken', data.data.token)
    })
    .catch(err => console.log('Error: ', err))
}

getToken().then(() => getPrivateRecipes());


function getPrivateRecipes(){
    fetch(baseUrl + `posts?status=private&categegories=${recipeId}`, {
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem('myToken')
        }
    })
    .then(res => res.json())
    .then(recipes => {
        console.log('all recipes', recipes);
        recipes.forEach(recipe =>{renderRecipe(recipe)});
    })
    .catch(err => console.log('Error: ', err))
}
//Denne funktion var et forsøg på at filtrere ved brug af cookTimeId og dietId
// function getRecipesByTaxonomies(cooktimeId, dietId){
//     const baseUrl = 'https://mundt.gg/wp-json/wp/v2/';
//     let url = baseUrl + 'posts?status=private';

//     if (cooktimeId) {
//         url += `&cook-time=${cooktimeId}`;
//     }
//     if (dietId) {
//         url += (cooktimeId ? '&' : '') + `diet=${dietId}`;
//     }
//     return fetch(url, {
//         headers: {
//             Authorization: "Bearer " + sessionStorage.getItem('myToken')
//         }
//     })
//     .then(res => res.json())
//     .then(recipes => {
//         console.log('Recipes by taxonomies', recipes);
//         recipes.forEach(recipe => {
//             console.log('Rendering recipe:', recipe);
//             renderRecipe(recipe);
//         });
//     })
//     .catch(err => console.log('Error: ', err))
// }

//Over på anden side
// getToken()
// .then(() => {
//     getRecipesByTaxonomies(fastCooktimeId, veganId);
// })
// .catch(err => console.error('Error fetching token:', err));

//Skal over på en anden side 


//Render på forsiden. Skal flyttes over til index.js
// function renderRecipe(recipe){
//     let recipeHTML =
//         `<div class="recipe">
//             <h5>${recipe.acf.title}</h5>
//             <img src="${recipe.acf.image.sizes.large}" alt="${recipe.acf.title}">
//             <p>${recipe.acf.author}</p>
//             <input type="number" id="servings">
//             <p>${recipe.acf.description}</p>
//             <p>Prep time: ${recipe.acf.prep_time} min</p>
//             <p>Cook time: ${recipe.acf.cook_time} min</p>
//             <ul class="ingredients" id="${recipe.id}">
//             </ul>
//             <div class="recipesTags">
//                 <!-- Plads til tags -->
//             </div>
//         </div>`; 
//     individualRecipesEl.innerHTML += recipeHTML;
//     Object.values(recipe.acf.ingredients).forEach(ingredient => {
//         if (ingredient != "") {
//             let li = document.createElement("li");
//             let ul = document.getElementById(recipe.id);
//             li.innerHTML = ingredient;
//             ul.appendChild(li);
//         }
//     })
// }

// function singleRecipe(recipe){
//     let recipeHTML = `
//     <div class="SingleRecipe">
//         <h5>${recipe.acf.title}</h5>
//         <img src="${recipe.acf.image.sizes.large}" alt="${recipe.acf.title}">
//         <p>${recipe.acf.author}</p>
//         <input type="number" id="servings">
//         <p>${recipe.acf.description}</p>
//         <p>${recipe.acf.prep_time}</p>
//         <p>${recipe.acf.cook_time}</p>
//         <ul class="ingredients" id="${recipe.id}">
//             ${generateIngredientsList(recipe.acf.ingredients)}
//         </ul>
//         <div class="recipesTags">
//         </div>
//     </div>`;
//     individualRecipesEl.innerHTML += recipeHTML;
//     Object.values(recipe.acf.ingredients).forEach(ingredient => {
//         if (ingredient != "") {
//             let li = document.createElement("li");
//             let ul = document.getElementById(recipe.id);
//             li.innerHTML = ingredient;
//             ul.appendChild(li);
//         }
//     })

// return recipeHTML;
// }

//--------------------------------Filtering Accordion--------------------------------------

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {

    this.classList.toggle("active");

    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

