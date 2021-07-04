const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('details-close-btn');

// event listeners
searchBtn.addEventListener('click', (e) => {
	e.preventDefault();
	getMealList();
});
mealList.addEventListener('click', (e) => {
	console.log('hello');
	getMealDetails(e);
});
recipeCloseBtn.addEventListener('click', () => {
	mealDetailsContent.parentElement.classList.remove('showDetails');
});

// get meal list that matches with the ingredients
function getMealList() {
	let searchInputTxt = document.getElementById('search-input').value.trim();
	fetch(
		`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
	)
		.then((response) => response.json())
		.then((data) => {
			let html = '';
			if (data.meals) {
				data.meals.forEach((meal) => {
					html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "details-btn">Get Details</a>
                        </div>
                    </div>
                `;
				});
				mealList.classList.remove('notFound');
			} else {
				html = "Sorry, we didn't find any meal!";
				mealList.classList.add('notFound');
			}

			mealList.innerHTML = html;
		});
}

// get recipe of the meal
function getMealDetails(e) {
	e.preventDefault();
	if (e.target.classList.contains('details-btn')) {
		let mealItem = e.target.parentElement.parentElement;
		fetch(
			`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
		)
			.then((response) => response.json())
			.then((data) => mealDetailsModal(data.meals));
	}
}

// create a modal
function mealDetailsModal(meal) {
	console.log(meal);
	meal = meal[0];
	let html = `
			<div class="meal-details-img">
			<img src="${meal.strMealThumb}" alt="" />
			</div>

			<h2 class="meal-title">${meal.strMeal}</h2>
			<p class="meal-category">${meal.strCategory}</p>
			<div class="meal-ingredients">
			<h3>Ingredients:</h3>
			<ul>
				<li>
					<i class="fas fa-check-square"></i> ${meal.strIngredient1}
				</li>
				<li>
					<i class="fas fa-check-square"></i> ${meal.strIngredient2}
				</li>
				<li>
					<i class="fas fa-check-square"></i> ${meal.strIngredient3}
				</li>
				<li>
					<i class="fas fa-check-square"></i> ${meal.strIngredient4}
					
				</li>
				<li>
					<i class="fas fa-check-square"></i> ${meal.strIngredient5}
				</li>
				<li>
					<i class="fas fa-check-square"></i> ${meal.strIngredient6}
				</li>
				<li>
					<i class="fas fa-check-square"></i> ${meal.strIngredient7}
				</li>
			</ul>
        
    `;
	mealDetailsContent.innerHTML = html;
	mealDetailsContent.parentElement.classList.add('showDetails');
}
