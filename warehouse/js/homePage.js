import {
  createBtn,
  createHead,
  createEmptyMessage,
  createModal,
} from './components.js'
import { navigate } from './navigate.js'
import { getWarehouseData, saveWarehouseData } from './storage.js'
import { sortWarehouseData } from './sort.js'

const headTitleTable = [
  { title: 'Название', attribute: { 'data-sort': 'name' } },
  { title: 'Полка', attribute: { 'data-sort': 'shelf' } },
  { title: 'Вес', attribute: { 'data-sort': 'weight' } },
  { title: 'Время хранения', attribute: { 'data-sort': 'date' } },
  { title: 'Действия', attribute: { 'data-sort': 'actions' } },
]

const onRemoveItem = (evt) => {
  if (evt.target.classList.contains('btn--remove')) {
    const row = evt.target.closest('.table__row')
    const table = row.closest('.table')
    const tableBody = table?.querySelector('.table__body')
    const cellName = row.querySelector('.table__cell--name').textContent

    const modal = createModal(
      'Подтверждение удаления',
      `Вы действительно хотите удалить ${cellName}`,
      () => {
        const elements = getWarehouseData()
        const updateElements = elements.filter(
          (item) => item.id !== row.dataset.id,
        )
        saveWarehouseData(updateElements)

        row.remove()

        if (tableBody.children.length === 0) {
          const emptyMessage = createEmptyMessage()
          table.replaceWith(emptyMessage)
        }
      },
    )

    document.body.appendChild(modal)
  }
}

const onEditItem = (evt) => {
  const editEl = evt.currentTarget.closest('.table__row')
  const id = editEl.dataset.id
  navigate('mainPage', { editingId: id, mode: 'edit' })
}

const updateTable = (data) => {
  const oldBody = document.querySelector('.table__body')
  const newBody = createTableBody(data)

  oldBody.replaceWith(newBody)
}

const handleSort = (method, event) => {
  const arrElements = getWarehouseData()

  if (arrElements.length <= 1) {
    event.currentTarget.classList.add('headerBtn--shake')
    setTimeout(() => activeBtn.classList.remove('headerBtn--shake'), 500)
    return
  }

  const sortedData = sortWarehouseData(arrElements, method)
  updateTable(sortedData)
}

const createTableHeader = () => {
  const tableHead = document.createElement('thead')
  tableHead.classList.add('table__head')
  const trEl = document.createElement('tr')
  trEl.classList.add('table__header-row')

  headTitleTable.forEach((item) => {
    const th = document.createElement('th')
    th.classList.add('table__header-cell')
    const headerBtn = createBtn({
      type: 'button',
      className: 'headerBtn',
      text: item.title,
      attributes: item.attribute,
      callback: (event) => handleSort(item.attribute['data-sort'], event),
    })
    th.appendChild(headerBtn)
    trEl.appendChild(th)
  })

  tableHead.appendChild(trEl)
  return tableHead
}

const createTableBody = (data) => {
  const tbody = document.createElement('tbody')
  tbody.classList.add('table__body')

  const fields = ['name', 'shelf', 'weight', 'date']

  data.forEach((item) => {
    const trEl = document.createElement('tr')
    trEl.classList.add('table__row')
    trEl.setAttribute('data-id', item.id)

    fields.forEach((field) => {
      const tdEl = document.createElement('td')
      tdEl.classList.add('table__cell', `table__cell--${field}`)
      tdEl.textContent = item[field]
      trEl.appendChild(tdEl)
    })

    const tdActions = document.createElement('td')
    tdActions.classList.add('table__cell', 'table__cell--actions')

    const btnEdit = createBtn({
      type: 'button',
      className: 'btn btn--edit',
      text: 'Редактировать',
      callback: onEditItem,
    })
    tdActions.appendChild(btnEdit)

    const btnRemove = createBtn({
      type: 'button',
      className: 'btn btn--remove',
      text: 'Удалить',
      callback: onRemoveItem,
    })
    tdActions.appendChild(btnRemove)
    trEl.appendChild(tdActions)

    tbody.appendChild(trEl)
  })

  return tbody
}

function renderTable(data) {
  if (data.length === 0) {
    return createEmptyMessage()
  }

  const tableEl = document.createElement('table')
  tableEl.classList.add('table', 'table--warehouse')
  const headerTable = createTableHeader()
  tableEl.appendChild(headerTable)
  const bodyTable = createTableBody(data)
  tableEl.appendChild(bodyTable)

  return tableEl
}

const btnAdd = createBtn({
  type: 'button',
  className: 'btn btn-homePage btn--add',
  text: 'Добавить запись',
  callback: () => navigate('mainPage'),
})

const headingHomePage = createHead('Склад', 'h2')

export const init = () => {
  const data = getWarehouseData()
  const table = renderTable(data)
  const app = document.querySelector('#app_warehouse')
  app.appendChild(headingHomePage)
  app.appendChild(table)
  app.appendChild(btnAdd)
}