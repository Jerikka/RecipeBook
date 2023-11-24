const APIKEY = 'f0a4b2daa35646abbfb367747076564c';
const recipeListEl = document.getElementById("recipe-list");

function displayRecipes(recipes) {
    recipeListEl.innerHTML = "";
    recipes.forEach((recipe) => {
        const recipeItemEl = document.createElement("li")
        recipeItemEl.classList.add("recipe-item");
        recipeImgEl = document.createElement("img");
        recipeImgEl.src = recipe.image;
        recipeImgEl.alt = 'recipe image';

        recipeTitleEL = document.createElement("h2");
        recipeTitleEL.innerText = recipe.title;

        recipeIngredientsEl = document.createElement("p");
        recipeIngredientsEl.innerHTML = `
            <strong>Ingredients:</strong> ${recipe.extendedIngredients
                .map((ingredient) => ingredient.original)
                .join(", ")}        
        `;

        recipeItemEl.appendChild(recipeImgEl);
        recipeItemEl.appendChild(recipeTitleEL);
        recipeItemEl.appendChild(recipeIngredientsEl);
        recipeListEl.appendChild(recipeItemEl);
    })
}


async function getRecipes() {
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${APIKEY}`)

    const data = await response.json()

    return data.recipes
}


async function init(){
    const recipes = await getRecipes()
    displayRecipes(recipes);
}

init()