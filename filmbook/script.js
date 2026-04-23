const idEl = document.getElementById('id');
const title = document.getElementById('title');
const genre = document.getElementById('genre');
const releaseYear = document.getElementById('releaseYear');
const isWatched = document.getElementById('isWatched');
const actionsForm = document.getElementById('actionsForm');
let saveBtn = document.getElementById('saveBtn');
let updateBtn = document.getElementById('updateBtn');
let sortBtn = document.getElementById('sortBtn');
let cancelEditBtn = document.getElementById('cancelEditBtn');

const titleErrorEl = document.getElementById('titleError');
const genreErrorEl = document.getElementById('genreError');
const releaseYearErrorEl = document.getElementById('releaseYearError');

/* Обработчик сохранения фильма */
function handleSaveBtn(e) {
  e.preventDefault();
  if (!validateInput()) {
    return
  }

  const film = {
    id: id = crypto.randomUUID(),
    title: title.value,
    genre: genre.value,
    releaseYear: releaseYear.value,
    isWatched: isWatched.checked,
  }

  addFilmToLocalStorage(film)
  clearInputFields()
}

/* Обработчик сортировки фильмов */
function handleSortBtn(e) {
  let films = getFilmsFromLocalStorage();

  const sortValuesOptions = document.querySelector('.filter-select').options
  const selectedIndex = sortValuesOptions.selectedIndex
  const sortBy = sortValuesOptions[selectedIndex].value

  switch (sortBy) {
    case 'title':
      films = films.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'releaseYear':
      films = films.sort((a, b) => a.releaseYear - b.releaseYear);
      break;
    case 'genre':
      films = films.sort((a, b) => a.genre.localeCompare(b.genre));
      break;
  }

  localStorage.setItem('films', JSON.stringify(films));
  renderTable();
}

/* Обработчик редактирования фильма */
function handleEditFilm(e) {
  e.preventDefault();
  let editFilmId = id.innerHTML
  let films = getFilmsFromLocalStorage();
  const film = films.find(film => film.id === editFilmId);

  if (!validateInput()) {
    return
  }
  for (const film of films) {
    if (film.id === editFilmId) {
      film['title'] = title.value;
      film['genre'] = genre.value;
      film['releaseYear'] = releaseYear.value;
      film['isWatched'] = isWatched.checked;
    }
  }
  saveBtn.style.display = 'block'
  updateBtn.style.display = 'none'
  cancelEditBtn.style.display = 'none'

  localStorage.setItem('films', JSON.stringify(films));
  clearInputFields();
  renderTable();
}

/* Обработчик кнопки отменить редактирование фильма */
function handleCancelEditFilm(e) {
  e.preventDefault();
  idEl.innerHTML = "";
  saveBtn.style.display = 'block';
  updateBtn.style.display = 'none';
  cancelEditBtn.style.display = 'none';
  clearInputFields();
}

/* Удалить фильм */
function deleteFilm(id) {
  let films = getFilmsFromLocalStorage();
  films = films.filter(film => film.id !== id);
  localStorage.setItem('films', JSON.stringify(films));
  renderTable();
}

/* Отредактировать фильм */
function editFilm(id) {
  let films = getFilmsFromLocalStorage();

  const film = films.find(film => film.id === id);

  if (film) {
    idEl.innerHTML = film.id;
    title.value = film.title;
    title.value = film.title;
    genre.value = film.genre;
    releaseYear.value = film.releaseYear;
    isWatched.checked = film.isWatched;

    document.getElementById('film-form').scrollIntoView({behavior: 'smooth'});

    saveBtn.style.display = 'none'
    updateBtn.style.display = 'block'
    cancelEditBtn.style.display = 'block'
  }
}

/* Очистить поля формы */
function clearInputFields() {
  title.value = "";
  genre.value = "";
  releaseYear.value = "";
  isWatched.checked = ""
}

/* Получение фильмов из локального хранилища */
function getFilmsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('films')) || [];
}

/* Добавить фильм в локальное хранилище */
function addFilmToLocalStorage(film) {
  const films = getFilmsFromLocalStorage();
  films.push(film);

  localStorage.setItem('films', JSON.stringify(films));
  renderTable();
}

/* Универсальная функция создания кнопки */
function createButton(title, funcEvent = null) {
  const btn = document.createElement("button")
  btn.innerHTML = title
  if (funcEvent !== null) {
    btn.addEventListener("click", funcEvent);
  }
  return btn;
}

/* Функция валидация формы */
function validateInput() {
  let isValid = true;

  if (title.value === "") {
    isValid = false;
    titleErrorEl.innerHTML = "Поле не должно быть пустым";
    titleErrorEl.style.display = "block";
  }

  if (genre.value === "") {
    isValid = false;
    genreErrorEl.innerHTML = "Поле не должно быть пустым";
    genreErrorEl.style.display = "block";
  }

  if (releaseYear.value === "") {
    isValid = false;
    releaseYearErrorEl.innerHTML = "Поле не должно быть пустым";
    releaseYearErrorEl.style.display = "block";
  }

  return isValid
}

function clearInputError(input, errorDivId) {
  input.addEventListener("change", (e) => {
    errorDivId.style.display = "none";
  })
}

/* Отрисовка таблицы */
function renderTable() {
  const films = JSON.parse(localStorage.getItem('films')) || [];

  const filmTableBody = document.getElementById('film-tbody');
  filmTableBody.innerHTML = '';

  films.forEach(film => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${film.title}</td>
      <td>${film.genre}</td>
      <td>${film.releaseYear}</td>
      <td>${film.isWatched ? "да" : "нет"}</td>
    `;

    const tdWithActions = document.createElement("td")
    const actionsDiv = document.createElement("div")
    actionsDiv.className = "actions";

    const deleteBtn = createButton("Удалить", () => deleteFilm(film.id))
    const editBtn = createButton("Редактировать", () => editFilm(film.id))

    actionsDiv.appendChild(deleteBtn);
    actionsDiv.appendChild(editBtn);

    tdWithActions.appendChild(actionsDiv);
    row.appendChild(tdWithActions);
    filmTableBody.appendChild(row);
  })
}


/* Добавление слушателей к кнопкам */
saveBtn.addEventListener('click', handleSaveBtn);
sortBtn.addEventListener('click', handleSortBtn);
cancelEditBtn.addEventListener('click', handleCancelEditFilm);
updateBtn.addEventListener('click', handleEditFilm);

title.addEventListener("input", (e) => {
  titleErrorEl.style.display = "none";
})

genre.addEventListener("input", (e) => {
  genreErrorEl.style.display = "none";
})

releaseYear.addEventListener("input", (e) => {
  releaseYearErrorEl.style.display = "none";
})

renderTable();