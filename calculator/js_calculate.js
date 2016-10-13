var display = ''; //Экран калькулятора
var digit = ''; //Переменная какая цифра нажата
var calcState = 1; //Калькулятор включен =1, калькулятор выключен =0
var number1 = null; //Введенная цифра №1
var number2 = null; //Введенная цифра №2
var result = null; //Результат вычислений
var divID = 'numbers'; //ID элемента куда выводятся цифры

//Функция выключения калькулятора
function offCalculator() {
  calcState = 0;
  display = '';
  writeInDisplay(display);
}

//Функция включения и обнуления калькулятора
function onCalculator() {
  calcState = 1;
  display = '0';
  writeInDisplay(display);
}

//Функция обнуления последнего ввденного значения
function buttonCE() {
  if (calcState === 0) return;
  display = '0';
  writeInDisplay(display);
}

//Функция записи цифр на экран
function writeInBufer(digit) {
  //Проверяем включен ли калькулятор, нет - ничего не делаем
  if (calcState === 0) return;

  //Если идет перебор цифр на экране выводится надпись Eror
  if (display.length >= 10  || display == 'EROR') {
    display = 'EROR';
    writeInDisplay(display);
    return;
  }

  //Если необходимо ввести 0,...
  if (display === '0' && digit === '.') {
    display = '0.';
    writeInDisplay(display);
    return;
  }

  //Если при вводе первая цифра нуль
  if (display === '0') {
    display = '';
    display += digit;
    writeInDisplay(display);
    return;
  }

  if (digit === '+' || digit === '-' || digit === '*' || digit === '/') {
    number1 = display + digit;
    return;
  }

  if (digit == '=') {
    result = number1 + display;
    writeInDisplay(result);
    return;
  }

  display += digit;
  writeInDisplay(display);
  /*

  } else if (digit == '+' || digit == '-' || digit == '*' || digit == '/') {
    if (number1 === null) {
      number1 = bufer + digit;
      alert(number1);
    } else {
      number2 = bufer;
      return;
    }
  } else
    buffer = number1 + number2;

*/

}

function writeInDisplay(display) {
  document.getElementById(divID).innerHTML = display;
}
