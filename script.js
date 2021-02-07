const searchBtn = document.getElementById('search-btn');
const foodList = document.getElementById('food');
const foodDetailsContent = document.querySelector('.food-details-container');
const ingredientsCloseBtn = document.getElementById('ingredients-close-btn');


searchBtn.addEventListener('click', getFoodList);
foodList.addEventListener('click', getFoodIngredients);
ingredientsCloseBtn.addEventListener('click', () => {
    foodDetailsContent.parentElement.classList.remove('showIngredients');
});



function getFoodList(){
    let searchInputTxt = document.getElementById('search-input').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "food-item" data-id = "${meal.idMeal}">
                        <div class = "food-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "food-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "ingredients-btn">Get ingredients</a>
                        </div>
                    </div>
                `;
            });
            foodList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any Food!";
            foodList.classList.add('notFound');
        }

        foodList.innerHTML = html;
    });
}



function getFoodIngredients(e){
    e.preventDefault();
    if(e.target.classList.contains('ingredients-btn')){
        let foodItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodItem.dataset.id}`)
        .then(response => response.json())
        .then(data => foodIngredientsModal(data.meals));
    }
}


function foodIngredientsModal(meal){
    meal = meal[0];
    let html = `
        <h2 class = "ingredients-title">${meal.strMeal}</h2>
        <p class = "ingredients-category">${meal.strCategory}</p>
        <div class = "ingredients-description">
            <h3>Ingredients:</h3>
            <p>${meal.strIngredient1}</p>
            <p>${meal.strIngredient2}</p>
            <p>${meal.strIngredient3}</p>
            <p>${meal.strIngredient4}</p>
            <p>${meal.strIngredient5}</p>
            <p>${meal.strIngredient6}</p>
            <p>${meal.strIngredient7}</p>
            <p>${meal.strIngredient8}</p>
            <p>${meal.strIngredient9}</p>
            <p>${meal.strIngredient10}</p>
        </div>
        <div class = "ingredients-food-img">
          <img src = "${meal.strMealThumb}" alt = "">
        </div>
    `;
    foodDetailsContent.innerHTML = html;
    foodDetailsContent.parentElement.classList.add('showIngredients');
}