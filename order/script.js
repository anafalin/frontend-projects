// заказ-наряд
const order = {
  number: "",
  parts: [],
  works: [],

  addPart(part) {
    const newPart = {
      num: this.parts.length + 1,
      title: "",
      article: "",
      manufacturer: "",
      price: 0,
      count: 0,
      sum: () => newPart.price * newPart.count,
      ...part
    };
    this.parts.push(newPart);
    return newPart;
  },

  addWork(work) {
    const newWork = {
      num: this.works.length + 1,
      title: "",
      price: 0,
      count: 0,
      sum: () => newWork.price * newWork.count,
      ...work
    };
    this.works.push(newWork);
    return newWork;
  },

  deletePart(num) {
    const index = this.parts.findIndex(item => item.num === num);
    if (index !== -1) {
      this.parts.splice(index, 1);
      this.parts.forEach((item, idx) => item.num = idx + 1);
    }
  },

  deleteWork(num) {
    const index = this.works.findIndex(item => item.num === num);
    if (index !== -1) {
      this.works.splice(index, 1);
      this.works.forEach((item, idx) => item.num = idx + 1);
    }
  },

  calculateTotal() {
    const partsTotal = this.parts.reduce((sum, item) => sum + item.sum(), 0);
    const worksTotal = this.works.reduce((sum, item) => sum + item.sum(), 0);
    return {partsTotal, worksTotal, total: partsTotal + worksTotal};
  },
};

// рендер тела таблицы запчастей
function renderPartsRows() {
  let rows = document.getElementById("partsRows");
  rows.innerHTML = "";

  if (order.parts.length === 0) {
    order.addPart()
  }

  for (let orderRow of order.parts) {
    let tr = document.createElement("tr")

    // Номер
    let tdNumEl = document.createElement("td")
    tdNumEl.innerHTML = orderRow.num
    tr.appendChild(tdNumEl)

    // Наименование
    createTdElement("input", "text", orderRow.title, "Наименование", "change", (e) => {
      orderRow.title = e.target.value
    }, tr)

    // Артикул
    createTdElement("input", "text", orderRow.article, "Артикул", "change", (e) => {
      orderRow.article = e.target.value
    }, tr)

    // Производитель
    createTdElement("input", "text", orderRow.manufacturer, "Производитель", "change", (e) => {
      orderRow.manufacturer = e.target.value
    }, tr)

    // Цена
    createTdNumberElement("input", "number", orderRow.price, 1, "change", (e) => {
      orderRow.price = parseFloat(e.target.value) || 0
      updateSumCell(tr, orderRow)
      calculateTotalSum()
    }, tr)

    // Количество
    createTdNumberElement("input", "number", orderRow.count, 1, "change", (e) => {
      orderRow.count = parseFloat(e.target.value) || 0
      updateSumCell(tr, orderRow)
      calculateTotalSum()
    }, tr)

    // Сумма
    let tdSumEl = document.createElement("td")
    tdSumEl.innerHTML = orderRow.sum()
    tr.appendChild(tdSumEl)

    // Кнопка удаления
    let tdAction = document.createElement("td")
    let btnDeleteRow = document.createElement("button")
    btnDeleteRow.innerHTML = "Х"
    btnDeleteRow.classList.add("btnDelete")
    btnDeleteRow.addEventListener("click", () => {
      deletePartRow(orderRow.num)
    })
    tdAction.appendChild(btnDeleteRow)
    tr.appendChild(tdAction)

    rows.appendChild(tr)
  }
  calculateTotalSum()
}

// рендер тела таблицы работ
function renderWorksRows() {
  let rows = document.getElementById("workRows");
  rows.innerHTML = "";

  if (order.works.length == 0) {
    order.addWork()
  }

  for (let workRow of order.works) {
    let tr = document.createElement("tr")

    // Номер
    let tdNumEl = document.createElement("td")
    tdNumEl.innerHTML = workRow.num
    tr.appendChild(tdNumEl)

    // Наименование
    createTdElement("input", "text", workRow.title, "Наименование", "change", (e) => {
      workRow.title = e.target.value
    }, tr)

    // Цена
    createTdNumberElement("input", "number", workRow.price, 1, "change", (e) => {
      workRow.price = parseFloat(e.target.value) || 0
      updateSumCell(tr, workRow)
      calculateTotalSum()
    }, tr)

    // Количество
    createTdNumberElement("input", "number", workRow.count, 1, "change", (e) => {
      workRow.count = parseFloat(e.target.value) || 0
      updateSumCell(tr, workRow)
      calculateTotalSum()
    }, tr)

    // Сумма
    let tdSumEl = document.createElement("td")
    tdSumEl.innerHTML = workRow.sum()
    tr.appendChild(tdSumEl)

    // Кнопка удаления
    let tdAction = document.createElement("td")
    let btnDeleteRow = document.createElement("button")
    btnDeleteRow.innerHTML = "Х"
    btnDeleteRow.classList.add("btnDelete")
    btnDeleteRow.addEventListener("click", () => {
      deleteWorkRow(workRow.num)
    })
    tdAction.appendChild(btnDeleteRow)
    tr.appendChild(tdAction)

    rows.appendChild(tr)
  }
  calculateTotalSum()
}

function updateSumCell(tr, orderRow) {
  let tdSum = tr.querySelector("td:nth-last-child(2)")
  if (!tdSum) {
    // Если нет - создаем
    tdSum = document.createElement("td")
    tr.appendChild(tdSum)
  }
  tdSum.innerHTML = orderRow.sum()
}

// добавление новой строки в таблицу запчастей
function addPartRow() {
  order.addPart()
  renderPartsRows()
}

// добавление новой строки в таблицу работ
function addWorkRow() {
  order.addWork()
  renderWorksRows()
}

// удаление строки из таблицы запчастей
function deletePartRow(num) {
  order.deletePart(num)
  renderPartsRows()
}

// удаление строки из таблицы работ
function deleteWorkRow(num) {
  order.deleteWork(num)
  renderWorksRows()
}

// подсчет итоговых сумм
function calculateTotalSum() {
  const {partsTotal, worksTotal, total} = order.calculateTotal()

  let totalSumEl = document.querySelector(".totalSum")
  let sumPartsEl = document.querySelector(".sumParts")
  let sumWorksEl = document.querySelector(".sumWorks")

  if (sumPartsEl) sumPartsEl.innerHTML = partsTotal
  if (sumWorksEl) sumWorksEl.innerHTML = worksTotal
  if (totalSumEl) totalSumEl.innerHTML = total
}

// сохранение заказа
function saveOrder() {
  if (!validate()) {
    alert("❌ Пожалуйста, заполните все обязательные поля (выделены красным)")
    return // Останавливаем выполнение
  }

  const {total} = order.calculateTotal()
  let msg = `
  Вы сохранили заказ-наряд № ${order.number} 
  Итоговая сумма: ${total} ₽
  `
  alert(msg)
}

// создание текстовой ячейки
function createTdElement(innerElement, type, value, placeholder, event = null, eventFunction = null, targetTr) {
  let td = document.createElement("td")
  let element = document.createElement(innerElement)
  element.type = type
  element.value = value
  element.required = true
  element.placeholder = placeholder

  element.addEventListener(event, eventFunction)
  element.addEventListener("input", e => {
    element.classList.remove("error")
  })

  td.appendChild(element)
  targetTr.appendChild(td)
}

// создание числовой ячейки
function createTdNumberElement(innerElement, type, value, min = 0, event = null, eventFunction = null, targetTr) {
  let td = document.createElement("td")
  let element = document.createElement(innerElement)
  element.type = type
  element.value = value
  element.min = min
  element.required = true

  element.addEventListener(event, eventFunction)
  element.addEventListener("input", e => {
    element.classList.remove("error")
  })

  td.appendChild(element)
  targetTr.appendChild(td)
}

function validate() {
  let isValid = true

  // Проверяем все поля в таблице запчастей
  let partsRows = document.getElementById("partsRows")
  if (partsRows) {
    let inputs = partsRows.querySelectorAll("input")

    inputs.forEach(input => {
      // Очищаем предыдущие стили
      input.style.border = ""
      input.style.backgroundColor = ""

      // Получаем значение
      let value = input.value.trim()

      // Проверяем в зависимости от типа
      if (input.type === "number") {
        let numValue = parseFloat(value)
        if (isNaN(numValue) || numValue <= 0) {
          input.classList.add("error")
          isValid = false
        }
      } else {
        if (value === "") {
          input.classList.add("error")
          isValid = false
        }
      }
    })
  }

  // Проверяем все поля в таблице работ
  let workRows = document.getElementById("workRows")
  if (workRows) {
    let inputs = workRows.querySelectorAll("input")

    inputs.forEach(input => {
      input.style.border = ""
      input.style.backgroundColor = ""

      let value = input.value.trim()

      if (input.type === "number") {
        let numValue = parseFloat(value)
        if (isNaN(numValue) || numValue <= 0) {
          input.classList.add("error")
          isValid = false
        }
      } else {
        if (value === "") {
          input.classList.add("error")
          isValid = false
        }
      }
    })
  }

  return isValid
}

// инициализация с данными примера
function init() {
  // Устанавливаем номер заказа
  const orderNumberEl = document.getElementById("orderNumber")
  if (orderNumberEl) {
    order.number = orderNumberEl.innerHTML
  }

  // Добавляем тестовые данные через методы order
  order.addPart({
    title: "Шаровая опора",
    article: "CB0355",
    manufacturer: "CTR",
    price: 889,
    count: 2
  })

  order.addWork({
    title: "Аренда гаража",
    price: 500,
    count: 2
  })

  // Рендерим таблицы
  renderPartsRows()
  renderWorksRows()
}

// Запуск с задержкой 4 сек
setTimeout(init, 1000)