export const createBtn = (config) => {
  const { type, className, text, attributes, callback } = config

  const btnEl = document.createElement('button')
  btnEl.className = className
  btnEl.type = type
  btnEl.textContent = text

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      btnEl.setAttribute(key, value)
    })
  }

  if (callback) {
    btnEl.addEventListener('click', callback)
  }
  return btnEl
}

export const createHead = (title, tagName) => {
  const validTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  const headingTag = validTags.includes(tagName) ? tagName : 'h2'

  const heading = document.createElement(headingTag)
  heading.textContent = title
  heading.className = 'warehouse-title'
  return heading
}

export const createInput = (
  type,
  name,
  required = 'true',
  className,
  placeholder,
) => {
  const labelEl = document.createElement('label')
  labelEl.className = className

  const inputEl = document.createElement('input')
  inputEl.type = type
  inputEl.name = name
  inputEl.required = required
  inputEl.placeholder = placeholder

  labelEl.appendChild(inputEl)

  return {
    container: labelEl,
    input: inputEl, // ← возвращаем ссылку на инпут
  }
}

export const createForm = (className, dataAttr, onSubmit) => {
  const formEl = document.createElement('form')
  formEl.className = className
  formEl.setAttribute(`data-${dataAttr}`, '')

  if (onSubmit) {
    formEl.addEventListener('submit', onSubmit)
  }
  return formEl
}

export const createEmptyMessage = () => {
  const message = document.createElement('div')
  message.classList.add('table__empty')
  message.textContent = 'Нет данных для отображения'
  return message
}

export const createLoader = () => {
  const loaderEl = document.createElement('div')
  loaderEl.classList.add('loader')
  return loaderEl
}

export const createContainer = (className = '') => {
  const container = document.createElement('div')
  container.className = `container ${className}`.trim()
  return container
}

export const createModal = (title, message, onConfirm, onCancel) => {
  const modal = document.createElement('div')
  modal.className = 'modal-overlay'
  modal.innerHTML = `
    <div class="modal">
      <div class="modal__header">
        <h3 class="modal__title">${title}</h3>
      </div>
      <div class="modal__body">
        <p class="modal__message">${message}</p>
      </div>
      <div class="modal__footer">
        <button class="btn btn--secondary modal__cancel">Отмена</button>
        <button class="btn btn--danger modal__confirm">Удалить</button>
      </div>
    </div>
  `

  const confirmBtn = modal.querySelector('.modal__confirm')
  const cancelBtn = modal.querySelector('.modal__cancel')

  confirmBtn.addEventListener('click', () => {
    onConfirm()
    modal.remove()
  })

  cancelBtn.addEventListener('click', () => {
    if (onCancel) onCancel()
    modal.remove()
  })

  // Закрытие по клику на оверлей
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove()
    }
  })

  return modal
}