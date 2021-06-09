//helper function to fetch the data from an external source and return it in JSON format
function getPeople(url) {
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      console.log(error);
    });
}

//  View code
function renderPeopleList(people) {
  const list = document.getElementById("personlist");
  list.innerHTML = "";
  //loop through the people
  people.forEach(function (person) {
    //console.log(person);
    let listItem = document.createElement("li");
    listItem.innerHTML = `
        <p><a href="${person.url}">${person.name}</a></p>
        <p class="info">Birth year: ${person.birth_year}</p>
        <p class="info">Gender: ${person.gender}</p>
        <p class="info">Height: ${person.height}</p>
        `;

    listItem.addEventListener("click", function (event) {
      event.preventDefault();
      getPersonDetails(person.url);
    });

    list.appendChild(listItem);
  });
}
// need to write the code to render the details to HTML
function renderPeopleDetails(personData) {
  console.log(personData);
  const list = document.getElementById("persondetails");
  list.innerHTML = "";
  for (const [key, value] of Object.entries(personData)) {
    console.log(`${key}: ${value}`);
    let listItem = document.createElement("li");
    listItem.innerHTML = `<p>${key}: ${value}</p>`;
    list.appendChild(listItem);
  }
  list.classList.remove("hidden");
}

// controller code
function showPeople(url = "https://swapi.dev/api/people/") {
  getPeople(url).then(function (data) {
    console.log(data);
    const results = data.results;

    //get the list element
    renderPeopleList(results);

    // enable the next and prev buttons.
    if (data.next) {
      const next = document.getElementById("next");
      // normally we would prefer the addEventListener method of adding a listener. Using something like 'element.onEvent = event_function' has the limitation of only being able to hold one listener of the type we choose. In this case that is a good thing however. Because we are not re-creating the buttons each time we load a new batch of data we could end up with several listeners attached to each button by the last page. We won't have that issue here.
      next.onclick = () => {
        // notice to show the next page we just re-call the showShips function with a new URL
        showPeople(data.next);
      };
    }
    if (data.previous) {
      const prev = document.getElementById("prev");

      prev.onclick = () => {
        showPeople(data.previous);
      };
    }
  });
}

function getPersonDetails(url) {
  //call getJSON functions for the provided url
  getPeople(url).then(function (data) {
    renderPeopleDetails(data);
    //with the results populate the elements in the #detailsbox
  });
}
showPeople();




