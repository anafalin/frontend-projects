const titleEl = document.getElementById("title");
const genreEl = document.getElementById("genre");
const releaseYearEl = document.getElementById("releaseYear");
const isWatchedEl = document.getElementById("isWatched");

const sortByTitleEl = document.getElementById("sortByTitle");
const sortByGenreEl = document.getElementById("sortByGenre");
const sortByReleaseYearEl = document.getElementById("sortByReleaseYear");
const sortByIsWatchedEl = document.getElementById("sortByIsWatched");

function handleFormSubmit(e) {
  e.preventDefault();

  clearErrorContainers();

  const title = titleEl.value;
  const genre = genreEl.value;
  const releaseYear = releaseYearEl.value;
  const isWatched = isWatchedEl.checked;

  const film = {
    title: title,
    genre: genre,
    releaseYear: releaseYear,
    isWatched: isWatched,
  };

  if (!isValid(film)) {
    return;
  }

  clearInputFields();
  addFilm(film);
}

async function addFilm(film) {
  // const films = JSON.parse(localStorage.getItem("films")) || [];
  // films.push(film);
  // localStorage.setItem("films", JSON.stringify(films));

  // console.log(film);
  await fetch("https://sb-film.skillbox.cc/films", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: "test-user@gmail.com",
    },
    body: JSON.stringify(film),
  });

  renderTable();
}

async function renderTable() {
  // const films = JSON.parse(localStorage.getItem("films")) || [];

  const filmsResponse = await fetch("https://sb-film.skillbox.cc/films", {
    headers: {
      email: "test-user@gmail.com",
    },
  });
  let films = await filmsResponse.json();

  const filmTableBody = document.getElementById("film-tbody");

  // Clear table body first
  filmTableBody.innerHTML = "";

  // Then add new rows
  films.forEach((film, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${film.title}</td>
      <td>${film.genre}</td>
      <td>${film.releaseYear}</td>
      <td>${film.isWatched ? "Да" : "Нет"}</td>
      <td><button class="deleteBtn" onclick="deleteFilm(${film.id})">Удалить</button></td>
    `;
    filmTableBody.appendChild(row);
  });
}

async function deleteFilm(id) {
  await fetch(`https://sb-film.skillbox.cc/films/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      email: "test-user@gmail.com",
    },
  });
  renderTable();
}

async function deleteAllFilms() {
  await fetch(`https://sb-film.skillbox.cc/films`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      email: "test-user@gmail.com",
    },
  });
  renderTable();
}

async function sortFilms(sortBy) {

  let parameters = "";

  console.log(parameters)
  if (sortByTitleEl.value !== "") {
    parameters = `title=${sortByTitleEl.value}`;
  }
  if (sortByGenreEl.value !== "") {
    parameters = parameters.concat(`genre=${sortByGenreEl.value}`);
  }
  if (sortByReleaseYearEl.value !== "") {
    parameters = parameters.concat(`releaseYear=${sortByReleaseYearEl.value}`);
  }
  let isWatchedValues = sortByIsWatchedEl.options
  let sortByIsWatchedValue = isWatchedValues[isWatchedValues.selectedIndex]
  if (sortByIsWatchedValue.value !== "all") {
    parameters = parameters.concat(`isWatched=${sortByIsWatchedValue.value}`);
  }
  console.log(parameters)

  const filmsResponse = await fetch(`https://sb-film.skillbox.cc/films?${parameters}`, {
    headers: {
      email: "test-user@gmail.com",
    },
  });
  let films = await filmsResponse.json();

  const filmTableBody = document.getElementById("film-tbody");

  // Clear table body first
  filmTableBody.innerHTML = "";

  // Then add new rows
  films.forEach((film, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${film.title}</td>
      <td>${film.genre}</td>
      <td>${film.releaseYear}</td>
      <td>${film.isWatched ? "Да" : "Нет"}</td>
      <td><button class="deleteBtn" onclick="deleteFilm(${film.id})">Удалить</button></td>
    `;
    filmTableBody.appendChild(row);
  });
}

// Validation film
function isValid(film) {
  let isValid = true;

  if (film.title === "") {
    let errorEl = createErrorContainer("Название не может быть пустым", "titleError");
    titleEl.after(errorEl);
    isValid = false;
  }

  if (film.genre === "") {
    let errorEl = createErrorContainer("Жанр не может быть пустым", "genreError");
    genreEl.after(errorEl);
    isValid = false;
  }

  let releaseYear = parseInt(document.getElementById("releaseYear").value)
  if (film.releaseYear === "") {
    let errorEl = createErrorContainer("Год выпуска не может быть пустым", "releaseYearError");
    releaseYearEl.after(errorEl);
    isValid = false;
  } else if (isNaN(releaseYear)) {
    let errorEl = createErrorContainer("Год выпуска должен быть числом", "releaseYearError");
    releaseYearEl.after(errorEl);
    isValid = false;
  } else if (releaseYear < 1900 || releaseYear > new Date().getFullYear()) {
    let errorEl = createErrorContainer("Год выпуска не может быть раньше 1900 и больше текущего года", "releaseYearError")
    releaseYearEl.after(errorEl);
    isValid = false;
  }

  return isValid;
}

// Clear input form fields
function clearInputFields() {
  titleEl.value = "";
  genreEl.value = "";
  releaseYearEl.value = "";
  isWatchedEl.checked = ""
}

function clearErrorContainers() {
  let titleErrorEl = document.getElementById("titleError")
  if(titleErrorEl) titleErrorEl.innerHTML = "";

  let genreErrorEl = document.getElementById("genreError")
  if(genreErrorEl) genreErrorEl.innerHTML = "";

  let releaseYearErrorEl = document.getElementById("releaseYearError")
  if(releaseYearErrorEl) releaseYearErrorEl.innerHTML = "";
}
function createErrorContainer(message, elId) {
  let errorEl = document.createElement("div");
  errorEl.innerHTML = message;
  errorEl.setAttribute("class", "error");
  errorEl.id = elId;

  return errorEl;
}

sortByTitleEl.addEventListener("input", sortFilms);
sortByGenreEl.addEventListener("input", sortFilms);
sortByReleaseYearEl.addEventListener("input", sortFilms);
sortByIsWatchedEl.addEventListener("change", sortFilms);

titleEl.addEventListener("input", () => {
  let titleErrorEl = document.getElementById("titleError")
  titleErrorEl.innerHTML = "";
});
genreEl.addEventListener("input", () => {
  let genreErrorEl = document.getElementById("genreError")
  genreErrorEl.innerHTML = "";
});
releaseYearEl.addEventListener("input", () => {
  let releaseYearErrorEl = document.getElementById("releaseYearError")
  releaseYearErrorEl.innerHTML = "";
});

document
  .getElementById("film-form")
  .addEventListener("submit", handleFormSubmit);

document
  .getElementById("deleteAllFilms")
  .addEventListener("click", deleteAllFilms)

// Display films on load
renderTable();
