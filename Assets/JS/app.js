const baseUrl = 'https://mundt.gg/wp-json/wp/v2/';
const containerEl = document.querySelector('.container'); 
const recipeID = 3;



function getAllPosts(){
fetch(baseUrl + 'posts')
.then((res) => res.json())
.then((data) => {
    console.log(data);
    data.forEach((post) => renderPost(post))     
    })
.catch((err) => console.log('Error ', err));
}

getAllPosts();

function getPostsByCat(id){
fetch(baseUrl +'posts?categories=' + id)
.then((res) => res.json())
.then((data) => {
    console.log(data);
    data.forEach((post) => renderPost(post))     
    })
.catch((err) => console.log('Error ', err));
}

getPostsByCat(recipeID);

function renderPost(post){
    console.log('post', post);
    containerEl.innerHTML += `
    <article>
        <h4>${post.title.rendered}</h4>
        <p class="excerpt">${post.excerpt.rendered}</p>
        <p class="description">${post.content.rendered}</p>
    </article>
    `;
}

