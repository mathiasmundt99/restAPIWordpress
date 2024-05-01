getToken()

// Her sættes variablerne til null som deafault
let cooktimeId = [];
let dietId = [];
let recipes = [];
fetchRecipes();

// Function som tilføjer ID ud fra klik af knap ved HTMl
function addCookTime(id) {
    cooktimeId.push(id);
    getRecipesByTaxonomies(cooktimeId, null)
    //fetchRecipes();
}

// Her kaldes en clearFilter, som sætter begge Id'er til null
function clearFilters() {
    cooktimeId = [];
    dietId = [];
    individualRecipesEl.innerHTML = "";
    let checkBoxes = document.querySelectorAll("input[type=checkbox]")
    for (let checkBox of checkBoxes) {
        checkBox.checked = false;
    }
    //getRecipesByTaxonomies(null, null)
    //fetchRecipes();
}

// Samme som addCookTime
function addDiet(id) {
    dietId.push(id);
    getRecipesByTaxonomies(null, dietId)
    //fetchRecipes();
}

// Function to fetch and render recipes based on selected cooktimeId and dietId
function fetchRecipes() {
    let individualRecipesEl = document.querySelector('.individualRecipesSpring');
    individualRecipesEl.innerHTML = '';
    let cooktimeIds = [43, 44, 45];

    const baseUrl = 'https://mundt.gg/wp-json/wp/v2/';


    for(let id of cooktimeIds) {
        let url = baseUrl + 'posts?status=private';
        url += `&cook-time=${id}`;

        // Her defineres antal post pr. side
        let perPage = 25;
        let page = 1;
        url += `&per_page=${perPage}&page=${page}`;

        fetch(url, {
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
            .then(recipesObjects => {
                console.log('Recipes by taxonomies', recipesObjects);
                recipes.push(recipesObjects);
            })
            .catch(err => {
                console.log('Error fetching recipes:', err);
            });
    }
    /*
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
     */
}

// Function til at kunne filtrere efter taxonomier
function getRecipesByTaxonomies(cooktimeId, dietId) {
    individualRecipesEl.innerHTML = "";
    if (cooktimeId === null && dietId === null) {
        renderIndividualRecipe(recipes);
    }

    for (let recipeEntries of recipes) {
        for (let recipeEntry of recipeEntries) {
            if (cooktimeId !== null) {
                for (let cookingTimes of cooktimeId) {
                if (recipeEntry.acf.cookingTime.term_id === cookingTimes) {
                    renderIndividualRecipe(recipeEntry);
                    }
                }
            }
            else if (dietId !== null) {
                for (let diet of dietId) {
                if (Object.values(recipeEntry.acf.diet).includes(diet)) {
                    renderIndividualRecipe(recipeEntry);
                    }
                }
            }
            else if (cooktimeId !== null && dietId !== null) {
                for (let cookingTimes of cooktimeId) {
                if (recipeEntry.acf.cookingTime.term_id === cookingTimes) {
                    renderIndividualRecipe(recipeEntry);
                    }
                }
                for (let diet of dietId) {
                if (Object.values(recipeEntry.acf.diet).includes(diet)) {
                    renderIndividualRecipe(recipeEntry);
                    }
                }
            }
        }
    }
}

// Function til at render recipe
function renderIndividualRecipe(recipe) {
    const individualRecipesEl = document.querySelector('.individualRecipesSpring');

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




