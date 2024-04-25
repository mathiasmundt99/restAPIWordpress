const baseUrl ='https://mundt.gg/wp-json/wp/v2/';

const recipeId =3;

const fastCooktimeId = 8;
const mediumCooktimeId = 9;
const slowCooktimeId = 10;

const diabeticFriendly = 35;
const glutenFree = 5;
const keto = 7;
const vegan = 36;
const vegetarian = 6;

const containerEL = document.querySelector('.container');


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

// getToken().then(() => getPrivateRecipes());

function getPrivateRecipes(){
    fetch(baseUrl + `posts?status=private&categegories=${recipeId}`, {
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem('myToken')
        }
    })
    .then(res => res.json())
    .then(recipes => {
        console.log(recipes);
    })
    .catch(err => console.log('Error: ', err))
}


function getRecipesByTaxonomies(cooktimeId, dietId){
    const baseUrl = 'https://mundt.gg/wp-json/wp/v2/';
    let url = baseUrl + 'posts?status=private';

    if (cooktimeId) {
        url += `&cook_time=${cooktimeId}`;
    }
    if (dietId) {
        url += `&diet=${dietId}`;
    }
    // Her skal laves noget så man kan vælge hvor mange posts der skal vises
    // if (amount) {
    //     url += `&amount=${amount}`;
    // }

    return fetch(url, {
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem('myToken')
        }
    })
    .then(res => res.json())
    .then(recipes => {
        console.log('Recipes by taxonomies', recipes);
    })
    .catch(err => console.log('Error: ', err))
}

getToken()
.then(() => {
    getRecipesByTaxonomies(slowCooktimeId);
})
.catch(err => console.error('Error fetching token:', err));

// Function til at render bestemter filtre

// getToken()
// .then(() => getRecipesByTaxonomies(fastCooktimeId, keto))
// .then((recipes) => {
//     const containerEl = document.querySelector('.container');
//     containerEL.innerHTML = '';
//     reipes.forEach((recipe) => renderRecipe(recipe, containerEL));
// });


//getPostByTax.then.render()


function renderRecipe(recipe, placement){

    }
