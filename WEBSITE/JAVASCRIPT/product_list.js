// Opret searchparams til kategori
// const chosenCategory = new URLSearchParams(window.location.search).get("category");

// lav konstanter for data
const recipeList = document.querySelector("#recipe_list");

const selectedElement = document.querySelector(".elementSelector");

let recipeData;

// lytter efter valg af filter
// selectedElement.addEventListener("change", showOpskrifter);

// lav fetch og filter
fetch("https://dummyjson.com/recipes")
  .then((response) => response.json())
  .then((opskrifter) => {
    let markup = opskrifter.recipes
      .map((recipeData) => {
        return `
        <article id="recipe_card">
            <img src="https://cdn.dummyjson.com/recipe-images/${recipeData.id}.webp" alt="billede af mad" />
            <h2>${recipeData.name}</h2>
            <span>Rating ${recipeData.rating}&#47;5</span>
            <p>${recipeData.cuisine}</p>
          </article>
          `;
      })
      .join("");
    recipeList.innerHTML = markup;
  });
