import {
  createBtn,
  createHead,
  createInput,
  createForm,
  createLoader,
  createContainer,
} from './components.js'
import { navigate } from './navigate.js'
import { getWarehouseData, saveWarehouseData } from './storage.js'

const handleSubmit = (evt, editIdEl) => {
  evt.preventDefault()
  const form = evt.target
  const data = new FormData(form)
  const formData = Object.fromEntries(data)

  if (editIdEl) {
    // 1. Получить данные
    const dataWarehouse = getWarehouseData()

    // 2. Найти ПОЗИЦИЮ элемента
    const editingElIndex = dataWarehouse.findIndex((el) => el.id === editIdEl)

    // 3. Создать обновлённый элемент
    const newDataEl = { ...dataWarehouse[editingElIndex], ...formData }

    // 4. Создать копию массива и заменить элемент
    const updatedArray = [...dataWarehouse]
    updatedArray[editingElIndex] = newDataEl

    saveWarehouseData(updatedArray)
  } else {
    formData.id = crypto.randomUUID()

    const existingData = getWarehouseData()
    existingData.push(formData)
    saveWarehouseData(existingData)
  }

  form.reset()
  navigate('homePage')
}

const buttonNavigate = createBtn({
  type: 'button',
  className: 'mainPage-navigate',
  text: 'Перейти к таблице',
  callback: () => navigate('homePage'),
})

const createFormContent = ({
                             form,
                             head,
                             fields,
                             submitFormBtn: submitFormBtn,
                             cancelEdit = null,
                           }) => {
  const appWarehouse = document.getElementById('app_warehouse')

  const containerBtn = createContainer('btn-container')

  fields.forEach((field) => form.appendChild(field.container))
  containerBtn.appendChild(submitFormBtn)

  if (cancelEdit) containerBtn.appendChild(cancelEdit)
  form.appendChild(containerBtn)

  appWarehouse.appendChild(head)
  appWarehouse.appendChild(form)
  appWarehouse.appendChild(buttonNavigate)
}

export const renderMainPage = (params = {}) => {
  const { editingId, mode } = params

  const title = mode === 'edit' ? 'Редактировать запись' : 'Добавить запись'
  const head = createHead(title, 'h2')
  const form = createForm('warehouse-form', 'warehouse-form', (evt) =>
    handleSubmit(evt, editingId),
  )

  const nameInput = createInput(
    'text',
    'name',
    'true',
    'form-field',
    'Название',
  )
  const shelfInput = createInput('text', 'shelf', 'true', 'form-field', 'Полка')
  const dateInput = createInput(
    'date',
    'date',
    'true',
    'form-field',
    'дд.мм.гггг',
  )
  const weightlInput = createInput(
    'number',
    'weight',
    'true',
    'form-field',
    'Вес',
  )

  const fields = [nameInput, shelfInput, weightlInput, dateInput]

  const btnSubmitText = mode === 'edit' ? 'Сохранить обьект' : 'Добавить обьект'
  const submitFormBtn = createBtn({
    type: 'submit',
    className:
      mode === 'edit'
        ? 'btn btn--primary btn--save'
        : 'btn btn--primary btn--add',
    text: btnSubmitText,
  })

  if (mode === 'edit' && editingId) {
    const existData = getWarehouseData()
    const itemToEdit = existData.find((el) => el.id === editingId)

    const cancelEdit = createBtn({
      type: 'button',
      className: 'btn btn--secondary btn--cancel',
      text: 'Отменить редактирование',
      callback: () => navigate('homePage'),
    })

    nameInput.input.value = itemToEdit.name
    shelfInput.input.value = itemToEdit.shelf
    weightlInput.input.value = itemToEdit.weight
    dateInput.input.value = itemToEdit.date

    createFormContent({
      form: form,
      head: head,
      fields: fields,
      submitFormBtn: submitFormBtn,
      cancelEdit: cancelEdit,
    })
  } else {
    createFormContent({
      form: form,
      head: head,
      fields: fields,
      submitFormBtn: submitFormBtn,
    })
  }
}

if (document.getElementById('app_warehouse')) {
  const appWarehouse = document.getElementById('app_warehouse')
  const loader = createLoader()
  appWarehouse.appendChild(loader)

  setTimeout(() => {
    loader.remove()
    renderMainPage()
  }, 500)
}
