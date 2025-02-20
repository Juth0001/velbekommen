const recipeList = document.querySelector("#recipe_list");

const selectCuisine = document.querySelector("#cuisineSelector");
const selectMealType = document.querySelector("#typeSelector");
const selectDifficulty = document.querySelector("#difficultySelector");
const selectServing = document.querySelector("#servingSelector");

selectCuisine.addEventListener("change", filterCuisine);
selectMealType.addEventListener("change", filterMealType);
selectDifficulty.addEventListener("change", filterDifficulty);
selectServing.addEventListener("change", filterServing);

let allRecipes,
  filteredData,
  cuisine = "All",
  mealType = "All";

function hentData() {
  fetch("https://dummyjson.com/recipes?limit=0")
    .then((response) => response.json())
    .then((data) => {
      allRecipes = data.recipes;
      filteredData = allRecipes;
      buildSelects();
      visListe(allRecipes);
    });
}

hentData();

function buildSelects() {
  // Først dannes et nyt array med en liste over cuisine (kun en gang hver)
  const uniqueCuisines = Array.from(new Set(allRecipes.map((recipe) => recipe.cuisine)));

  // Herefter dannes en select-liste med de cuisines der findes i det hentede data
  const markup = uniqueCuisines.map((cuisine) => ` <option value="${cuisine}">${cuisine}</option>`).join("");
  selectCuisine.innerHTML += markup;

  // Her dannes en anden select-liste med de mealTypes der findes i det hentede data på samme måde
  const uniqueMTypes = Array.from(new Set(allRecipes.map((recipe) => recipe.mealType[0])));
  const markup2 = uniqueMTypes.map((element) => ` <option value="${element}">${element}</option>`).join("");
  selectMealType.innerHTML += markup2;

  const uniqueDifficulty = Array.from(new Set(allRecipes.map((recipe) => recipe.difficulty[0])));
  const markup3 = uniqueDifficulty.map((element) => ` <option value="${element}">${element}</option>`).join("");
  selectDifficulty.innerHTML += markup3;

  const uniqueServing = Array.from(new Set(allRecipes.map((recipe) => recipe.servings)));
  const markup4 = uniqueServing.map((element) => `<option value="${element}">${element}</option>`).join("");
  selectServing.innerHTML += markup4;
}

function visListe(data, event) {
  const markup = data
    .filter((opskrift) => {
      if (event) {
        if (event.target.id == "cuisine") {
          cuisine = event.target.value;
        } else if (event.target.id == "mealType") {
          mealType = event.target.value;
        } else if (event.target.id == "difficulty") {
          difficulty = event.target.value;
        } else if (event.target.id == "servings") {
          servings = event.target.value;
        }

        if (cuisine == "All" && mealType != "All") {
          return opskrift.mealType[0] == mealType;
        } else if (mealType == "All" && cuisine != "All") {
          return opskrift.cuisine == cuisine;
        } else if (cuisine == "All" && mealType == "All") {
          return true;
        } else {
          return opskrift.cuisine == cuisine && opskrift.mealType[0] == mealType;
        }
      } else {
        return true;
      }
    })
    .map(
      (opskrift) => `      
  <article id="recipe_card">
            <img src="${opskrift.image}" alt="billede af mad" />
            <h2>${opskrift.name}</h2>
            <p class="rating">Rating&#58; ${opskrift.rating}&#47;5</p>
            <p class="cuisine">${opskrift.cuisine}</p>
            <button><a href="single_product.html?recipe=${opskrift.id}">View Recipe</a></button>
          </article>`
    )
    .join("");
  recipeList.innerHTML = markup;
}

function filterCuisine(event) {
  // Hvilken cuisine er valgt på select-listen?
  cuisine = event.target.value;
  if (cuisine == "All") {
    filteredData = allRecipes;
  } else {
    // hvis der valgt andet end "All" filtreres data med den valgte cuisine
    filteredData = allRecipes.filter((recipe) => recipe.cuisine == cuisine);
  }
  // Det filtrerede data vises
  visListe(filteredData);

  // Når opskrifterne er filtreret dannes en ny liste med kun de mealTypes der findes i det filtrerede data:
  const uniqueMTypes = Array.from(new Set(filteredData.map((recipe) => recipe.mealType[0])));
  const markup = uniqueMTypes.map((element) => `<option value="${element}">${element}</option>`).join("");
  selectMealType.innerHTML = '<option value="All">Type</option>' + markup;

  const uniqueDifficulty = Array.from(new Set(filteredData.map((recipe) => recipe.difficulty[0])));
  const markup2 = uniqueDifficulty.map((element) => `<option value="${element}">${element}</option>`).join("");
  selectDifficulty.innerHTML = '<option value="All">Difficulty</option>' + markup2;

  const uniqueServing = Array.from(new Set(allRecipes.map((recipe) => recipe.servings)));
  const markup3 = uniqueServing.map((element) => `<option value="${element}">${element}</option>`).join("");
  selectServing.innerHTML = '<option value="All">Servings</option>' + markup3;
}

function filterMealType(event) {
  // Hvilken mealType er valgt på select-listen?
  mealType = event.target.value;
  if (mealType == "All") {
    visListe(filteredData);
  } else {
    // Her filtreres det allerede filtrerede data efter den valgte mealType
    const filteredMealtypeData = filteredData.filter((recipe) => recipe.mealType.includes(mealType));
    // Det filtrerede data vises
    visListe(filteredMealtypeData);
  }
}

function filterDifficulty(event) {
  // Hvilken mealType er valgt på select-listen?
  difficulty = event.target.value;
  if (difficulty == "All") {
    visListe(filteredData);
  } else {
    // Her filtreres det allerede filtrerede data efter den valgte mealType
    const filteredDifficultyData = filteredData.filter((recipe) => recipe.difficulty.includes(difficulty));
    // Det filtrerede data vises
    visListe(filteredDifficultyData);
  }
}

function filterServing(event) {
  // Hvilken mealType er valgt på select-listen?
  servings = event.target.value;
  if (servings == "All") {
    visListe(filteredData);
  } else {
    // Her filtreres det allerede filtrerede data efter den valgte mealType
    const filteredServingData = filteredData.filter((recipe) => recipe.servings == servings);
    // Det filtrerede data vises
    visListe(filteredServingData);
  }
}
