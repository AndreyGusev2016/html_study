var display = ''; //Экран калькулятора
var digit = ''; //Переменная какая цифра нажата
var calcState = 1; //Калькулятор включен =1, калькулятор выключен =0
var isCalculte = false; //Состояние ждет ли калькулятор ввыода цифры false, либо ждет ввода выражения true
var numberArr = ''; //массив введенных цифр
var result = 0; //Результат вычислений
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

  isCalculte = false;
  numberArr = '';
  result = 0;
  writeInDisplay(display);
  writeInHistory(display);
}

//Функция ввода цифр на экран калькулятора
function writeInBufer(digit) {
  //Проверяем включен ли калькулятор, нет - ничего не делаем
  if (calcState === 0) return;

  //Если идет перебор цифр на экране выводится надпись Eror
  if (display.length >= 10  || display == 'ERROR') {
    display = 'ERROR';
    writeInDisplay(display);
    return;
  }

  if (isCalculte) {
    display = '0';
    writeInDisplay(display);
    isCalculte = false;
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

//Функция обработки нажатий матматических операций
function calcFunction(calcbutton) {
  if (calcState === 0 || display === 'ERROR') {
    alert('Калькулятор в состоянии ошибки или выключен');
    return;
  }

  if (!isCalculte) {
    switch (calcbutton) {
      case '+':
        numberArr += readDisplay() + '+';
        isCalculte = true;
        break;

      case '-':
        numberArr += readDisplay() + '-';
        //display = '0';
        //writeInDisplay(display);
        alert(numberArr);
        break;

      case '=':
        numberArr += readDisplay();
        result = eval(numberArr);
        writeInDisplay(result);
        writeInHistory(numberArr + '=' + result);
        numberArr = result;
        isCalculte = false;
        break;

      default: return;
    }
  } else {
    result = eval(numberArr);
    writeInDisplay(result);
    writeInHistory(result);
    numberArr = result;
    isCalculte = true;
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

function writeInHistory(result) {
  document.getElementById('history').innerHTML += (result + '<br>');
}
