const swiper = new Swiper('.swiper', {
  // Настройки слайдера
  direction: 'horizontal',
  loop: true,

  slidesPerView: 2, // Количество отображаемых слайдов
  spaceBetween: 20, // Расстояние между слайдами

  // Настройки пагинации
  pagination: {
    el: '.swiper-pagination',
  },
});