export default class Card {
  _title = "";
  _price = "";
  _imgUrl = "./img/not_image.png";
  _addCount = 0;

  constructor(title, price, imgUrl) {
    this.title = title;
    this.price = price;

    if (imgUrl) {
      this.imgUrl = imgUrl;
    }
  }

  getElement() {
    this.cardEl = document.createElement("div");
    this.cardEl.classList.add("card");

    this.imgEl = document.createElement("img");
    this.imgEl.classList.add("card_img");
    this.imgEl.src = this.imgUrl;

    this.titleEl = document.createElement("h2");
    this.titleEl.classList.add("card_title");
    this.titleEl.textContent = this.title;

    this.priceEl = document.createElement("strong");
    this.priceEl.classList.add("card_price");
    this.priceEl.textContent = this.price;

    this.addButtonEl = this.getAddButtonEl();

    this.cardEl.append(this.imgEl, this.titleEl, this.priceEl, this.addButtonEl);
    return this.cardEl;
  }

  getAddButtonEl() {
    const addButtonEl = document.createElement("button");
    addButtonEl.classList.add("card__add-btn");
    addButtonEl.textContent = "В корзину";

    addButtonEl.addEventListener("click", () => {
      if (this.addCount > 0) {
        this.addCount = 0;
      } else {
        this.addCount = 1;
      }
    });

    return addButtonEl;
  }

  set addCount(value) {
    this._addCount = value;

    if(this.addButtonEl) {
      if (this._addCount > 0) {
        this.addButtonEl.classList.add("added");
        this.addButtonEl.textContent = `Удалить ${this._addCount} товаров`;
      } else {
        this.addButtonEl.classList.remove("added");
        this.addButtonEl.textContent = "В корзину";
      }
    }
  }

  get addCount() {
    return this._addCount;
  }


  set title(value) {
    this._title = value;

    if(this.titleEl) {
      this.titleEl.textContent = this._title;
    }
  }

  get title() {
    return this._title;
  }

  set price(value) {
    this._price = value;

    if(this.priceEl) {
      this.priceEl.textContent = this._price;
    }
  }

  get price() {
    return this._price;
  }

  set imgUrl(value) {
    this._imgUrl = value;

    if(this.imgeEl) {
      this.imgEl.src = this._imgUrl;
    }
  }

  get imgUrl() {
    return this._imgUrl;
  }
};