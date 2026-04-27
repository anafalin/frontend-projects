const CITIES = {
  moscow: 'Москва',
  orenburg: 'Оренбург',
  saintPetersburg: 'Санкт-Петербург',
};


function createProductCard(product) {
  let image = product.image.replace("../images/", "");
  let productCardEl = document.createElement("div");
  productCardEl.append(
    createCardVisual(image),
    createCardInfo(product)
  );
  return productCardEl;
};

function createCardVisual(image) {
  let divEl = document.createElement("div");
  divEl.classList.add("product-card__visual");
  divEl.innerHTML = `
    <img class="product-card__img" src="images/${image}" height="436" width="290" alt="Изображение товара">
    <div class="product-card__more">
      <a href="#" class="product-card__link btn btn--icon">
        <span class="btn__text">В корзину</span>
        <svg width="24" height="24" aria-hidden="true">
          <use xlink:href="images/sprite.svg#icon-basket"></use>
        </svg>
      </a>
      <a href="#" class="product-card__link btn btn--secondary">
        <span class="btn__text">Подробнее</span>
      </a>
    </div>
  `;

  return divEl;
};

function createCardInfo({name, price, availability}) {
  let divEl = document.createElement("div");
  divEl.classList.add("product-card__info");
  divEl.innerHTML = `
      <h2 class="product-card__title">${name}</h2>
      <span class="product-card__old">
        <span class="product-card__old-number">${price.old}</span>
        <span class="product-card__old-add">₽</span>
      </span>
      <span class="product-card__price">
        <span class="product-card__price-number">${price.new}</span>
        <span class="product-card__price-add">₽</span>
      </span>
      <div class="product-card__tooltip tooltip">
        <button class="tooltip__btn" aria-label="Показать подсказку">
          <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
            <use xlink:href="images/sprite.svg#icon-i"></use>
          </svg>
        </button>
        <div class="tooltip__content">
          <span class="tooltip__text">Наличие товара по городам:</span>
          <ul class="tooltip__list">
           ${Object.entries(availability).map(([city, count]) => `
            <li class="tooltip__item">
              <span class="tooltip__text">
                ${CITIES[city]}: <span class="tooltip__count">${count}</span>
              </span>
            </li>`).join('')}
        </ul>

        </div>
      </div>
    `;
  return divEl;
};

const renderProducts = (products) => {
  const catalogListEl = document.querySelector(".catalog__list");
  console.log(catalogListEl);

  const items = products.map(product => {
    const liEl = document.createElement("li");
    liEl.classList.add("catalog__item");
    liEl.appendChild(createProductCard(product));
    return liEl;
  });

  catalogListEl.append(...items);
};

export default renderProducts;