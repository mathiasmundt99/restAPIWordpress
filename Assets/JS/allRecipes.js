getToken()

// Her sættes variablerne til null som deafault
let cooktimeId = null;
let dietId = null;

// Function som tilføjer ID ud fra klik af knap ved HTMl
function addCookTime(id) {
    cooktimeId = id;
    fetchRecipes(); 
}

// Her kaldes en clearFilter, som sætter begge Id'er til null
function clearFilters(id) {
    cooktimeId = null;
    dietId = id;
    fetchRecipes(); 
}

// Samme som addCookTime
function addDiet(id) {
    dietId = id;
    fetchRecipes(); 
}

// Function to fetch and render recipes based on selected cooktimeId and dietId
function fetchRecipes() {
    let individualRecipesEl = document.querySelector('.individualRecipes');
    individualRecipesEl.innerHTML = '';

    // kald getRecipesByTaxonomies med selected cooktimeId og dietId
    getRecipesByTaxonomies(cooktimeId, dietId)
        .then(recipes => {
            // Render vores recipes
            recipes.forEach(recipe => {
                renderIndividualRecipe(recipe);
            });
        })
        .catch(err => {
            console.error('Error fetching or rendering recipes:', err);
        });
}

// Function til at kunne filtrere efter taxonomier
function getRecipesByTaxonomies(cooktimeId, dietId) {
    const baseUrl = 'https://mundt.gg/wp-json/wp/v2/';
    let url = baseUrl + 'posts?status=private';

   // Her kontrolleres om der er et cookTimeId og et dietId, hvis der er, så tilføjes de til url'en.
    if (cooktimeId) {
        url += `&cook-time=${cooktimeId}`;
    }
    if (dietId) {
        //Jeg ved ikke hvorfor den virker sådan her, men når der sættes & foran diet=${dietID}, så virker det
        url += (cooktimeId ? '&' : '') + `&diet=${dietId}`;
    } 

    // Her defineres antal post pr. side 
    let perPage = 25; 
    let page = 1;
    url += `&per_page=${perPage}&page=${page}`;

    return fetch(url, {
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem('myToken')
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to fetch recipes');
        }
        return res.json();
    })
    .then(recipes => {
        console.log('Recipes by taxonomies', recipes);
        return recipes; 
    })
    .catch(err => {
        console.log('Error fetching recipes:', err);
    });
}

// Function til at render recipe
function renderIndividualRecipe(recipe) {
    const individualRecipesEl = document.querySelector('.individualRecipes');

    // Forsøgt at sende recipe ID sammen med chosenRecipe ved a href
    const recipeDetailUrl = `chosenRecipe.html?id=${recipe.id}`;

    // Her opsættes vores HTML som skal bruges længere nede i koden funktionen.
    const recipeHTML = `
    <div class="recipe">
    <a href="${recipeDetailUrl}" target="_blank">
        <img src="${recipe.acf.image.sizes.medium}" alt="${recipe.acf.title}">
        <h5>${recipe.acf.title}</h5>
        <div class="FEPCookPrepTime">
          <p>Prep Time: ${recipe.acf.prep_time} min</p>
          <p>Cook Time: ${recipe.acf.cook_time} min</p>
        </div>
    </a>
</div>
    `;

    // Her sætter vi vores innerHTML til at være = reipeHTML
    individualRecipesEl.innerHTML += recipeHTML;

    // Tilføj ingredients til listen
    // Object.values(recipe.acf.ingredients).forEach(ingredient => {
    //     if (ingredient !== "") {
    //         const li = document.createElement("li");
    //         const ul = document.getElementById(recipe.id);
    //         li.textContent = ingredient;
    //         ul.appendChild(li);
    //     }
    // });
}

// Her er en hjælpe funktion som bruges til at generer vores ingredienser
// På wordpress er det en lang list på 25 strings som ellers alle ville komme ud som en tom string
function generateIngredientsList(ingredients) {
    let ingredientsHTML = '';
    Object.values(ingredients).forEach(ingredient => {
        if (ingredient !== "") {
            ingredientsHTML += `<li>${ingredient}</li>`;
        }
    });
    return ingredientsHTML;
}




