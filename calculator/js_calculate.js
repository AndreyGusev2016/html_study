var display = ''; //Экран калькулятора
var digit = ''; //Переменная какая цифра нажата
var calcState = 1; //Калькулятор включен =1, калькулятор выключен =0
var number1 = null; //Введенная цифра №1
var number2 = null; //Введенная цифра №2
var result = null; //Результат вычислений
var divID = 'numbers'; //ID элемента куда выводятся цифры

//Функция выключения/включения/обнуления калькулятора
function offOnCalculator(power) {
  if (power == 'off') { //нажата клавиша OFF
    calcState = 0;
    display = '';
  } else if (power == 'ce') { //нажата клавиша CE (обнуление последнего введенного значения)
    if (calcState === 0) return;
    display = '0';
  } else { //Нажата клавиша ON
    calcState = 1;
    display = '0';
  }

  writeInDisplay(display);
}

//Функция ввода цифр на экран калькулятора
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
  //Если все нормально прибавляем цифру
  display += digit;
  writeInDisplay(display);
}

//Функция обработки нажатий матматических знаков
function calcFunction(calcbutton) {
  if (calcState === 0) return;

  if (display.length >= 10  || display == 'EROR') {
    display = 'EROR';
    writeInDisplay(display);
    return;
  }

  switch (calcbutton) {
    case '+': number1 = readDisplay() + '+';
      display = '0';
      writeInDisplay(display);
      break;

    case '=': if (number2 === null) {
      
    }
    default: return;

  }
}

//Функция чтения из divID
function readDisplay() {
  return document.getElementById(divID).innerHTML;
}

//Функция вывода в divID
function writeInDisplay(display) {
  document.getElementById(divID).innerHTML = display;
}
