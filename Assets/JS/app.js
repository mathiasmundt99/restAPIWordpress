// Variabler erklerert 
const baseUrl ='https://mundt.gg/wp-json/wp/v2/';

const recipeId = 3;
const articleId = 46;

const fastCooktimeId = 43;
const mediumCooktimeId = 44;
const slowCooktimeId = 45;

const focusedArticleHeroEl = document.querySelector('.focusedArticleHero');
const topArticleHeroEl = document.querySelector('.topArticleHero');
const bottomArticleHeroEl = document.querySelector('.bottomArticleHero');

const containerEL = document.querySelector('.container');
const individualRecipesEl = document.querySelector('.individualRecipesSpring');
const individualArticlesEl = document.querySelector('.individualArticles');


// Get token bruges til at få adgang til at se private indhold fra API'et-
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

// Funktion til at hente Priavte Recipes fra Wordpress
function getPrivateRecipes(){
    fetch(baseUrl + `posts?status=private&categories=${recipeId}`, {
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

//Funktion til at hente Priavte Articles fra Wordpress
function getPrivateArticle(){
    fetch(baseUrl + `posts?status=private&categories=${articleId}`, {
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem('myToken')
        }
    })
    .then(res => res.json())
    .then(articles => {
        console.log('Fetched articles:', articles);
        articles.forEach(article => {
            renderArticle(article);
        });
    })
    .catch(err => console.log('Error: ', err))
}

//Funktion til at render Priavte Articles fra Wordpress
function renderArticle(article){
    // Her erklæres articleHTML
    let articleHTML =
        `<div class='articleDiv'>
        <div class ='imgDiv'>
            <img class="imgHeroBig" src="${article.acf.image.sizes.large}" alt="">
        </div>
            <h4>${article.acf.title}</h4>
        </div>`; 
        // Her sætter vi individualArticlesEl til at være = articleHTML
        individualArticlesEl.innerHTML += articleHTML;
}

// Denne funktion henter de 4 første recipes fra wordpress. Idielt skulle den hente 4 bestemte recipes
function getSpringRecipes(){
    fetch(baseUrl + `posts?status=private&categories=${recipeId}`, {
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem('myToken')
        }
    })
    .then(res => res.json())
    .then(recipes => {
        console.log('Fetched recepies:', recipes);

        const firstFourRecipes = recipes.slice(0, 4);

        firstFourRecipes.forEach(recipe => {
            renderSpringRecipes(recipe);
        });
    })
    .catch(err => console.log('Error: ', err))
}


  function renderArticle(article){
      let articleHTML =
          `<div class="recipe">
              <h5>${article.acf.title}</h5>
              <img class="imgHeroBig" src="${article.acf.image.sizes.medium}" alt="">
          </div>`; 
          individualArticlesEl.innerHTML += articleHTML;
  }

// Funktion til at render de 4 recipes
function renderSpringRecipes(recipe){
    let recepieSpringHTML =
        `<div class='recipeDiv'>
        <a href="chosenRecipe.html">
        <div class ='imgDiv'>
            <img class="imgHeroBig" src="${recipe.acf.image.sizes.large}" alt="">
        </div>
            <h4>${recipe.acf.title}</h4>
        </div>
        </a>`; 
        individualRecipesEl.innerHTML += recepieSpringHTML;
}

function getHeroRecipe(){
    fetch(baseUrl + `posts?status=private&categories=${recipeId}`, {
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem('myToken')
        }
    })
    .then(res => res.json())
    .then(recipes => {
        console.log('Fetched recipes:', recipes);

        // Check if there are at least 3 recipes in the array
        if (recipes.length >= 3) {
            const firstRecipe = recipes[0]; // Get the third recipe (index 2)

            // Render the third recipe
            renderHeroRecipe(firstRecipe);
        } else {
            console.log('There are not enough recipes to retrieve the third one.');
        }
    })
    .catch(err => console.log('Error: ', err))
}

function getTopArticleHero(){
    fetch(baseUrl + `posts?status=private&categories=${recipeId}`, {
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem('myToken')
        }
    })
    .then(res => res.json())
    .then(recipes => {
        console.log('Fetched recipes:', recipes);

        // Check if there are at least 3 recipes in the array
        if (recipes.length >= 3) {
            const secondRecipe = recipes[1]; // Get the third recipe (index 2)

            // Render the third recipe
            renderTopRecipe(secondRecipe);
        } else {
            console.log('There are not enough recipes to retrieve the third one.');
        }
    })
    .catch(err => console.log('Error: ', err))
}

function getBottomArticleHero(){
    fetch(baseUrl + `posts?status=private&categories=${articleId}`, {
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem('myToken')
        }
    })
    .then(res => res.json())
    .then(articles => {
        console.log('Pøls:', articles);

        if (articles.length >= 1) {
            const firstArticle = articles[0]; 

            renderBottomRecipe(firstArticle);
        } else {
            console.log('Error');
        }
    })
    .catch(err => console.log('Error: ', err))
}

function renderHeroRecipe(recipe){
    let heroHTML =
    `
    <img class="imgHeroBig" src="${recipe.acf.image.sizes.large}" alt="">
    <a href="./chosenRecipe.html"><h3 class="recipeTitleOnImg"> ${recipe.acf.title}</h3></a>
    `; 
    focusedArticleHeroEl.innerHTML += heroHTML;
}

function renderTopRecipe(recipe){
    let topHTML =
    `
    <img class="imgHeroBig" src="${recipe.acf.image.sizes.large}" alt="">
    <a href="./chosenRecipe.html"><h3 class="recipeTitleOnImg"> ${recipe.acf.title}</h3></a>
    `; 
    // Her sætter vi individualArticlesEl til at være = articleHTML
    topArticleHeroEl.innerHTML += topHTML;
}

function renderBottomRecipe(article){
    let bottomHTML =
    `
    <iframe width="420" height="315"
    src="${article.acf.video}">
    </iframe>
    <a href="./chosenRecipe.html"><h3 class="recipeTitleOnImg"> ${article.acf.title}</h3></a>
    `;
    // Her sætter vi individualArticlesEl til at være = articleHTML
    bottomArticleHeroEl.innerHTML += bottomHTML;
}



// Noget rod, men vi løb tør for tid, og ville vise hvordan 4 artikler kunne se ud sammen
 getToken()
 .then(() => getPrivateArticle());
 getPrivateArticle();
 getPrivateArticle();
 getPrivateArticle();
 getSpringRecipes();
 getPrivateRecipes();
 getHeroRecipe();
 getTopArticleHero();
 getBottomArticleHero();

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

