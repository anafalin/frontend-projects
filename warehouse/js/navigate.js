import { createLoader } from './components.js'

export const navigate = async (pageName, params = {}) => {
  const app = document.querySelector('#app_warehouse')
  app.innerHTML = ''

  const loader = createLoader()
  app.appendChild(loader)

  switch (pageName) {
    case 'homePage':
      const homePage = await import('./homePage.js')
      homePage.init()
      loader.remove()
      break
    case 'mainPage':
      const mainPage = await import('./index.js')
      mainPage.renderMainPage(params)
      loader.remove()
      break
  }
}
