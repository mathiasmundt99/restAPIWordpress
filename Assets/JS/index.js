getToken();

function renderRecipe(recipe){
    let recipeHTML =
        `<div class="recipe">
            <h5>${recipe.acf.title}</h5>
            <img src="${recipe.acf.image.sizes.large}" alt="${recipe.acf.title}">
            <p>${recipe.acf.author}</p>
            <input type="number" id="servings">
            <p>${recipe.acf.description}</p>
            <p>Prep time: ${recipe.acf.prep_time} min</p>
            <p>Cook time: ${recipe.acf.cook_time} min</p>
            <ul class="ingredients" id="${recipe.id}">
            </ul>
            <div class="recipesTags">
                <!-- Plads til tags -->
            </div>
        </div>`; 
    individualRecipesEl.innerHTML += recipeHTML;
    Object.values(recipe.acf.ingredients).forEach(ingredient => {
        if (ingredient != "") {
            let li = document.createElement("li");
            let ul = document.getElementById(recipe.id);
            li.innerHTML = ingredient;
            ul.appendChild(li);
        }
    })
}

function singleRecipe(recipe){
    let recipeHTML = `
    <div class="SingleRecipe">
        <h5>${recipe.acf.title}</h5>
        <img src="${recipe.acf.image.sizes.large}" alt="${recipe.acf.title}">
        <p>${recipe.acf.author}</p>
        <input type="number" id="servings">
        <p>${recipe.acf.description}</p>
        <p>${recipe.acf.prep_time}</p>
        <p>${recipe.acf.cook_time}</p>
        <ul class="ingredients" id="${recipe.id}">
            ${generateIngredientsList(recipe.acf.ingredients)}
        </ul>
        <div class="recipesTags">
        </div>
    </div>`;
    individualRecipesEl.innerHTML += recipeHTML;
    Object.values(recipe.acf.ingredients).forEach(ingredient => {
        if (ingredient != "") {
            let li = document.createElement("li");
            let ul = document.getElementById(recipe.id);
            li.innerHTML = ingredient;
            ul.appendChild(li);
        }
    })

return recipeHTML;
}