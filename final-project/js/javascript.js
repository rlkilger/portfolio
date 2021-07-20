// Meals from https://www.themealdb.com/api.php

// Get list of categories for select element
fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(function(response) {
        return response.json();
    })
    .then(function (jsonObject) {
      const categories = jsonObject["categories"];
      //console.log(categories);

      const message = document.querySelector('.message');

      const categoryList = document.querySelector("#category-list");
      categoryList.innerHTML = renderCategoryList(categories);
      const categoryButton = document.querySelector('#category-button');
      categoryButton.onclick = (event) => {
        event.preventDefault();
        getMealsByCategory(categoryList.value);
        message.classList.add("hidden");
      };

      const searchButton = document.querySelector('#search-button');
      searchButton.onclick = (event) => {
        event.preventDefault();
        document.querySelector(".meal-list").innerHTML = "";
        getMealsByTitle(categories);
        message.classList.add("hidden");
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


function getMealsByTitle(categories) {
  const mealsByCategoryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
  const searchInput = document.querySelector('#search-input').value;
  const mealList = document.querySelector(".meal-list");
  let searchList = [];
  //console.log(categories);
  categories.forEach(item => {
    category = item.strCategory;
    //console.log(category);
    fetch(mealsByCategoryURL + category)
      .then(function(response) {
          return response.json();
      })
      .then(function (jsonObject) {
        const meals = jsonObject["meals"];
        //console.log(searchInput);

        meals.forEach(meal => {
          let mealName = meal.strMeal;
          //console.log(mealName);
          if (mealName.toLowerCase().includes(searchInput.toLowerCase())) {
            mealList.innerHTML += renderMealLight(meal);
            //console.log(mealName)
          }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  //mealList.innerHTML = renderMealList(searchList);
  mealList.addEventListener('click', getMealByID);
  
}


function getMealByID(event) {
  const mealByIDURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  let mealListItem = event.target.parentElement;
  
  fetch(mealByIDURL + mealListItem.dataset.id)
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

      const background = document.querySelector(".background");
      background.classList.remove('hidden');

      const body = document.querySelector("body");
      body.classList.add('no-scroll');
      const closeButton = document.querySelector(".close-button");

      document.addEventListener("click", function(event) {
        if (event.target.matches(".close-button") || !event.target.closest(".full-meal")) {
          event.preventDefault();
          fullMeal.classList.add('hidden');
          background.classList.add('hidden');
          body.classList.remove('no-scroll');
        }
      })
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
  item += `<img src="${meal.strMealThumb}" alt="${meal.strMeal} photo">`;
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
