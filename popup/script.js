// Вспомогательная функция для получения данных из куки
function getCookie() {
  return document.cookie.split('; ').reduce((acc, item) => {
    const [name, value] = item.split('=')
    acc[name] = value
    return acc
  }, {})
};
 const giftArr = [
  {
    title: "Скидка 20% на первую покупку в нашем магазине!",
    icon: "img/discount.svg"
  },
  {
    title: "Скидка 10% на всё!",
    icon: "img/discount_2.svg"
  },
  {
    title: "Подарок при первой покупке в нашем магазине!",
    icon: "img/gift.svg"
  },
  {
    title: "Бесплатная доставка для вас!",
    icon: "img/delivery.svg"
  },
  {
    title: "Сегодня день больших скидок!",
    icon: "img/discount_3.svg"
  }
];

const promocodeObj = {
  promocode: "PROM50",
  gift: "Скидка 50%"
};

function createPopUpGift(index) {
  let gift = document.getElementById("gift")
  gift.style.display = "flex"

  console.log(gift)

  let img = document.createElement("img")
  img.src = giftArr[index].icon;

  gift.querySelector(".icon").appendChild(img)
  let content = gift.querySelector(".content")
  let title = content.querySelector(".title")
  title.innerHTML = giftArr[index].title;
}

function closeGift() {
  let gift = document.getElementById("gift")
  gift.style.display = "none"
}

function inputPromocode() {
  let promoEl = document.getElementById("promo")
  promoEl.style.display = "flex"
}

let input = document.getElementById("promocode")
input.addEventListener("input", e => {
  let promoEl = document.getElementById("promo")
  let promoMsg = document.getElementById("promoMsg")
  if(promoMsg != null) {
    promoMsg.innerHTML = "";
    promoMsg.style.display = "none";
    promoEl.style.height = "50px"

    console.log("````")
    input.style.color = "gray"
    input.style.borderColor = "gray"
  }
})

function submitPromocode() {
  event.preventDefault();

  let promoEl = document.getElementById("promo");
  let input = promoEl.querySelector("#promocode");
  let enteredCode = input.value.trim().toUpperCase();

  let existingError = promoEl.querySelector(".error-message");
  if (existingError) existingError.remove();

  let msgEl = document.getElementById("promoMsg")
  msgEl.innerHTML = "";
  promoEl.style.height = "80px"
  promoEl.style.height = "80px"
  msgEl.style.fontWeight = "600";
  msgEl.style.display = "block";
  msgEl.style.fontSize = "14px";
  if (promocodeObj.promocode === enteredCode) {
    msgEl.innerHTML = `Промокод применён. ${promocodeObj.gift}`;
    msgEl.style.color = "green"
    input.style.color = "green"
    input.style.borderColor = "green"
    promoEl.appendChild(msgEl);

    let cookie = getCookie()
    document.cookie = `procode = ${enteredCode}`
  } else {
    msgEl.innerHTML = `Промокод не найден. Попробуйте другой.`;
    msgEl.style.color = "red"
    input.style.color = "red"
    input.style.borderColor = "red"
  }
  promoEl.appendChild(msgEl);
}

setTimeout(() => {
  let randomNum = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
  createPopUpGift(randomNum)
}, 3000)