const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');

// get element for Model
const modal = document.querySelector('.modal-overlay');
const closeBtn = document.querySelector('.close-btn');
const modalContainer = document.querySelector('.modal-container');
const modalContent = document.querySelector('#modal-content');

let searchQuery = '';

searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	searchQuery = e.target.querySelector('input').value;
	fetchAPI();
});

async function fetchAPI() {
	const baseURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`;
	const response = await fetch(baseURL);
	const data = await response.json();
	generateHTML(data.meals);
}

function generateHTML(results) {
	let generatedHTML = '';
	results.map((result) => {
		generatedHTML += `
				<div class="item">
					<img src="${result.strMealThumb}" alt="" />
					<div class="flex-container">
						<h5 class="title">${result.strMeal}</h5>
					</div>
				</div>
				`;
	});

	searchResultDiv.innerHTML = generatedHTML;
}

searchResultDiv.addEventListener('click', async (e) => {
	modal.classList.add('open-modal');

	let itemName = e.target.innerText;

	console.log(itemName);

	const baseURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`;
	const response = await fetch(baseURL);
	const data = await response.json();
	const items = data.meals;
	const modalItem = items.find((item) => item.strMeal === itemName);
	const itemId = modalItem.idMeal;
	console.log(itemId);
});

closeBtn.addEventListener('click', function () {
	modal.classList.remove('open-modal');
});
