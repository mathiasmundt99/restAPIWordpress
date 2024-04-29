const baseUrl ='https://mundt.gg/wp-json/wp/v2/';

const recipeId =3;

const fastCooktimeId = 8;
const mediumCooktimeId = 9;
const slowCooktimeId = 10;

const diabeticFriendlyId = 35;
const glutenFreeId = 5;
const ketoId = 7;
const veganId = 36;
const vegetarianId = 6;

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

// MARK! Hvordan skal url se ud??????
function getRecipesByTaxonomies(cooktimeId, dietId){
    const baseUrl = 'https://mundt.gg/wp-json/wp/v2/';
    let url = baseUrl + 'posts?status=private';

    if (cooktimeId) {
        url += `&cook-time=${cooktimeId}`;
    }
    if (dietId) {
        url += (cooktimeId ? '&' : '') + `diet=${dietId}`;
    }
    // Her skal laves noget så man kan vælge hvor mange posts der skal vises


    return fetch(url, {
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem('myToken')
        }
    })
    .then(res => res.json())
    .then(recipes => {
        console.log('Recipes by taxonomies', recipes);
        recipes.forEach(recipe => {
            console.log('Rendering recipe:', recipe);
            renderRecipe(recipe);
        });
    })
    .catch(err => console.log('Error: ', err))
    
}

getToken()
.then(() => {
    getRecipesByTaxonomies(fastCooktimeId, veganId);
})
.catch(err => console.error('Error fetching token:', err));

function renderRecipe(recipe){
    let recipeHTML =
        `<div class="recipe">
            <h5>${recipe.acf.title}</h5>
            <img src="${recipe.acf.image.sizes.large}" alt="${recipe.acf.title}">
            <p>${recipe.acf.author}</p>
            <input type="number" id="servings">
            <p>${recipe.acf.description}</p>
            <p>${recipe.acf.preTime}</p>
            <p>${recipe.acf.cookTime}</p>
            
            
            
            <div class="recipesTags">
                <!-- Add tags here if needed -->
            </div>
        </div>`; 
    individualRecipesEl.innerHTML += recipeHTML;
}

/*<ul class="ingredients">
            ${recipe.acf.ingredients.forEach(ingridient => {
               const newLi = document.createElement("li");
               newLi.innerHTML = ingridient;
            })}
            </ul>
            <ol class="method">
            ${recipe.acf.method.map(step => `<li>${step}</li>`).join('')}
            </ol>*/
// Function til at render bestemter filtre

// getToken()
// .then(() => getRecipesByTaxonomies(fastCooktimeId, keto))
// .then((recipes) => {
//     const containerEl = document.querySelector('.container');
//     containerEL.innerHTML = '';
//     reipes.forEach((recipe) => renderRecipe(recipe, containerEL));
// });  
//<ul class="ingredients"><ol class="method">
               // ${recipe.acf.method.map(step => `<li>${step}</li>`).join('')}
            //</ol>
              //  ${recipe.acf.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>



//getPostByTax.then.render()

// Denne function skal render opskrifterner

// function renderRecipe(){
// recipe.forEach(recipe => {
//     individualRecipesEl.innerHTML +=
//     `<h5 id="title"></h5>
//     <img src="" alt="">
//     <p id="author"></p>
//     <input type="number" id="servings">
//     <p id="description"></p>
//     <p id="preTime"></p>
//     <p id="cookTime"></p>
//     <ul id="ingredients">
//     </ul>
//     <ul id="ingredients2">
//     </ul>
//     <ol id="method">
//     </ol>
//     <div class="recipesTags">
 
//     </div>` 
// });
//     }

//-----------------------------------------------------------------------------------
const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach(item =>
  item.addEventListener("click", () => {
    const isItemOpen = item.classList.contains("open");
    accordionItems.forEach(item => item.classList.remove("open"));
    if (!isItemOpen) {
      item.classList.toggle("open");
    }
  })
);

const filterItems = document.querySelectorAll(".filters");

filterItems.forEach(item =>
  item.addEventListener("click", () => {
    const isItemOpen = item.classList.contains("open");
    filterItems.forEach(item => item.classList.remove("open"));
    if (!isItemOpen) {
      item.classList.toggle("open");
    }
  })
);