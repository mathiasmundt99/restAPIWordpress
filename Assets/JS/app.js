// Variabler erklerert 
const baseUrl ='https://mundt.gg/wp-json/wp/v2/';

const recipeId = 3;
const articleId = 46;

const fastCooktimeId = 43;
const mediumCooktimeId = 44;
const slowCooktimeId = 45;
//------------------------------------------------------

// Skulle have været brugt til filtrering med en JS funktion. Men vi gik med at lave onClick på knapperne i HTML
// const diabeticFriendlyId = 35;
// const glutenFreeId = 5;
// const ketoId = 7;
// const veganId = 36;
// const vegetarianId = 6;

const containerEL = document.querySelector('.container');
const individualRecipesEl = document.querySelector('.individualRecipes');
const individualArticlesEl = document.querySelector('.individualArticles');



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

// De Begge nedestående funktioner henter både recipes & articles... Den burde kun hente recipes, og nedestående burde kun hente articles
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

function renderArticle(article){
    let articleHTML =
        `<div>
        <div class ='imgDiv'>
            <img class="imgHeroBig" src="${article.acf.image.sizes.medium}" alt="">
        </div>
            <h4>${article.acf.title}</h4>
        </div>`; 
        individualArticlesEl.innerHTML += articleHTML;
}
        

 getToken().then(() => getPrivateArticle());

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

