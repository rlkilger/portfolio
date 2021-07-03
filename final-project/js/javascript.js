// Meals from https://www.themealdb.com/api.php

// Get list of categories for select element
fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(function(response) {
        return response.json();
    })
    .then(function (jsonObject) {
      const categories = jsonObject["categories"];
      //console.log(categories);

      const categoryList = document.querySelector("#category-list");
      categoryList.innerHTML = renderCategoryList(categories);

      const search = document.querySelector('#search-button');
      search.onclick = (event) => {
        event.preventDefault();
        getMealsByCategory(categoryList.value);
      };
      
    })
    .catch(function(error) {
      console.log(error);
    });



function getMealsByCategory(category) {
  const mealsByCategoryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
  fetch(mealsByCategoryURL + category)
      .then(function(response) {
          return response.json();
      })
      .then(function (jsonObject) {
        const meals = jsonObject["meals"];
        //console.log(meals);

        const mealList = document.querySelector(".meal-list");
        mealList.innerHTML = renderMealList(meals);
        mealList.addEventListener('click', getMealByID);

      })
      .catch(function(error) {
        console.log(error);
      });
}


function getMealByID(event) {
  let mealItem = event.target.parentElement.parentElement;
  const mealByIDURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  
  fetch(mealByIDURL + mealItem.dataset.id)
    .then(function(response) {
        return response.json();
    })
    .then(function (jsonObject) {
      const meal = jsonObject["meals"][0];
      console.log(meal);

      const fullMeal = document.querySelector(".full-meal");
      fullMeal.classList.remove('hidden');
      console.log(fullMeal);
      fullMeal.innerHTML = renderMealFull(meal);

      const closeButton = document.querySelector(".close-button");
      closeButton.onclick = (event) => {
        event.preventDefault();
        fullMeal.classList.add('hidden');
      };

    })
    .catch(function(error) {
      console.log(error);
    });
}
    

// Render categorty list in select tag
function renderCategoryList(categories) { 
  categoryList = `<option>Choose a Category</option>`; 
  categories.forEach(category => {
    categoryList += `<option value='${category.strCategory}'>${category.strCategory}</option>`
  }); 
  return categoryList; 
}


// Render meals list in ul tag
function renderMealList(meals) { 
  let mealList = "";
  meals.forEach(meal => {
    mealList += renderMealLight(meal)
  });
  return mealList; 
}


// Render meal-light in li tag
function renderMealLight(meal) {
  let item = `<li data-id="${meal.idMeal}">`;
  item += ` <h2>${meal.strMeal}</h2>`;
  item += `<div class="image"><img src="${meal.strMealThumb}" alt="${meal.strMeal} photo"></div>`;
  item += `</li>`;
  return item;
}


//Render meal-full in li tag
function renderMealFull(meal) {
  let item = `<li class="close"><button class="close-button">&times;</button></li>`
  item += `<li><h2 class="meal-heading">${meal.strMeal}</h2></li>`;
  item += `<li class="image"><img src="${meal.strMealThumb}" alt="${meal.strMeal} photo"></li>`;
  item += `<li><h3>Ingredients:</h3></li>`;
  item += `<li class="meal-details"><ul>`;
  for (var [key, value] of Object.entries(meal)) {
    if ((key.includes("Ingredient")) && (value != "") && (value != null)) {  
      item += `<li>${value}</li>`
    }
  }
  item += `</ul></li>`;
  item += `<li><h3>Instructions:</h3></li>`;
  item += `<li class="meal-details">${meal.strInstructions}</li>`;
  if (meal.strSource != null) {
    item += `<li class="link meal-details"><a href="${meal.strSource}" target="_blank">View Full Recipe</a></li>`;
  }
  if (meal.strYoutube != null) {
    item += `<li class="link meal-details"><a href="${meal.strYoutube}" target="_blank">Watch Video</a></li>`;
  }
  return item;
}