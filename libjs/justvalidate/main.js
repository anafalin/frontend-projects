const validate = new JustValidate('#msg-form');

validate.addField('#name', [
  {
    rule: 'required',
    errorMessage: 'Введите имя',
  },
]);

validate.addField('#email', [
  {
    rule: 'required',
    errorMessage: 'Введите почту',
  },
  {
    rule: 'email',
    errorMessage: 'Почта введена не верно!',
  },
]);

validate.addField('#msg', [
  {
    rule: 'required',
    errorMessage: 'Введите сообщение',
  },
  {
    rule: 'minLength',
    value: 3,
    errorMessage: 'Минимум 3 символа',
  },
  {
    rule: 'maxLength',
    value: 100,
    errorMessage: 'Максимум 100 символов',
  },
]);

validate.addField('#age', [
  {
    rule: 'required',
    errorMessage: 'Введите возраст',
  },
  {
    rule: 'number',
    errorMessage: 'Только числа',
  },
  {
    rule: 'minNumber',
    value: 18,
    errorMessage: 'Минимальный возраст 18',
  },
  {
    rule: 'maxNumber',
    value: 150,
    errorMessage: 'Максимальный возраст 150',
  },
]);

validate.onSuccess(function () {
  alert("Проверка пройдена успешно!")
});