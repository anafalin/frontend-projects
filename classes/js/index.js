import Card from "./Card.js";
import AmazingCard from "./AmazingCard.js";

let card1 = new Card("Смартфон", 20000,  "./img/product_1.png");
let card2 = new Card("Наушники", 2500,  "./img/product_2.png");
let card3 = new AmazingCard("Зарядка", 540,  "./img/product_3.png", 5);

document.getElementById("app").appendChild(card1.getElement());
document.getElementById("app").appendChild(card2.getElement());
document.getElementById("app").appendChild(card3.getElement());