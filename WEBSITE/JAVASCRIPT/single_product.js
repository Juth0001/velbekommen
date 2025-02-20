// --- Link til produktet (En HURTIGERE måde at FETCH på)

const productContainer = document.querySelector("single_product_container");

const recipeId = new URLSearchParams(window.location.search).get("recipe");

fetch(`https://dummyjson.com/recipes/${recipeId}`)
	.then((response) => response.json())
	.then((data) => {
		productContainer.innerHTML = `
          <main class="single_product_container">
			<section class="product_info">
				<article class="left img">
					<h6 class="id">${data.id}</h6>
					<img
						src="https://cdn.dummyjson.com/recipe-images/${data.id}.webp"
						alt="prod_name" />
				</article>
				<article class="right short_details_container">
					<!-- <div class="rating_status">
						<p class="rating_selected"></p>
						<p class="rating_unselected"></p>
					</div> -->
					<h3 class="prod_name">${data.name}</h3>
                        <h5>Rating: <span>${data.rating}</span></h5>
					<div class="short_details">
						<dl>
							<dt>Meal type: </dt>
							<dd>${data.mealType}</dd>
							<dt>Cuisine/Country: </dt>
							<dd>${data.cuisine}</dd>
							<dt>Servings/Portions: </dt>
							<dd>${data.servings}</dd>
							<dt>Calories (kcal) x portion: </dt>
							<dd>${data.caloriesPerServing}</dd>
						</dl>
						<dl>
							<dt>Preparation time (min): </dt>
							<dd>${data.prepTimeMinutes}</dd>
							<dt>Cook time (min): </dt>
							<dd>${data.cookTimeMinutes}</dd>
							<dt>Difficulty: </dt>
							<dd>${data.difficulty}</dd>
							<dt>Tags: </dt>
							<dd>${data.tags}</dd>
						</dl>
					</div>
				</article>
			</section>

			<section class="long_details_container">
				<article class="left">
					<h6 class="ingredients">Ingredients</h6>
                         <p>${data.ingredients}</p>
					<!-- Place each ingredients on a checkbox -->
				</article>
				<article class="right">
					<h6 class="instructions">Here is how to do it</h6>
                         <p>${data.instructions}</p>
					<!-- Place each instruction on a checkbox -->
				</article>
			</section>

			<section class="comment_container">
				<article class="left">
					<h6>Bedøm opskriften</h6>
					<!-- Place 5 empty stars as a checkbox users can click on, to define IF THEY LIKE THE RECIPE -->
                         <h6>Review count: ${data.reviewCount}</h6>
				</article>
				<article class="right">
					<h6 class="comment_form">What do you think about it?</h6>
					<!-- Get users Comments, Feedbacks and more. -->
					<form action="/action_page.php" method="get" name="commentForm">
						<!-- <label for="fname">Navn</label><br /> -->
						<input type="text" id="fname" name="fname" placeholder="Fulde navn.." /><br />
						<!-- <label for="email">Email:</label><br /> -->
						<input type="email" id="email" name="email" placeholder="Email.." /><br />
						<!-- <label for="bio">Besked: <br /> -->
						<textarea id="besked" name="bio" rows="2" cols="20" placeholder="Din besked her"></textarea>
						<input type="submit" value="Submit" />
					</form>
				</article>
			</section>
		</main>
     `;
	});
