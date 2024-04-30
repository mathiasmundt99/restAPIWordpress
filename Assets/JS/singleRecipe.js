getToken()
.then(() => {
    singleRecipe(recipe, id);
})
.catch(err => console.error('Error fetching token:', err));

// Fang url fra selected recipe (ID)
// Fetch : posts/id

