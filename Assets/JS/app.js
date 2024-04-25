const baseUrl ='https://mundt.gg/wp-json/wp/v2/';

const recipeId =3;

const fastCooktimeId = 8;
const mediumCooktimeId = 9;
const slowCooktimeId = 10;

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

getToken().then(() => getPrivateRecipes());

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

// getPrivateRecipes();

function getPostByTaxonomies(cooktime, diet){
    fetch(baseUrl + `posts?status`)
}

//getPostByTax.then.render()




function renderRecipe(post){
    console.log('post', post);
    containerEl.innerHTML += `
    <article>
        <h4>${post.title.rendered}</h4>
        <p class="excerpt">${post.excerpt.rendered}</p>
        <p class="description">${post.content.rendered}</p>
    </article>
    `;
}

