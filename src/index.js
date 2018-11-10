// provede operaci se 2 cisly podle znamenka mezi nimy
function vykonaOperaci(operator, b, a) {
  switch (operator) {
    case "+":
      return a + b;
      break;
    case "-":
      return a - b;
      break;
    case "*":
      return a * b;
      break;
    case "/":
      return a / b;
      break;
  }
  return 0;
}
// vrati false pokud znamenko nema prednost a vrati true pokud ma prednost
function maPrednost(x, y) {
  if ((x === "*" || x === "/") && (y === "+" || y === "-")) {
    return true;
  } else {
    return false;
  }
}
// vyresi zadany vyraz
function solveExpression() {
  var vyraz = document.getElementById("vyraz").value;
  for (var x = 0; x < vyraz.length; x++) {
    if ("/*".includes(vyraz[x].charAt(0)) && x === 0) {
      document.getElementById("vysledek").innerHTML =
        "Neplatný výraz, nelze začít výraz znaménkem / nebo *";
      return;
    }
    if (!"0123456789+-/*".includes(vyraz[x].charAt(0))) {
      document.getElementById("vysledek").innerHTML = "Výraz je neplatný";
      return;
    }
  }
  var cisla = new Array();
  var operatory = new Array();
  var vysledek = 0;
  var cislice = 0;
  // cyklus ve kterem se prochazi retezec
  for (var z = 0; z < vyraz.length; z++) {
    if ("0123456789".includes(vyraz[z].charAt(0))) {
      cislice *= 10;
      cislice += parseInt(vyraz[z], 10);
    }

    // pokud je znak znamenko
    else if ("+-*/".includes(vyraz[z].charAt(0))) {
      cisla.push(cislice);
      cislice = 0;

      if (operatory.length === 0) {
        operatory.push(vyraz[z].charAt(0));
      } else if (
        operatory.length !== 0 &&
        maPrednost(operatory[operatory.length - 1], vyraz[z].charAt(0))
      ) {
        cisla.push(vykonaOperaci(operatory.pop(), cisla.pop(), cisla.pop()));
        operatory.push(vyraz[z].charAt(0));
      } else if (
        operatory.length !== 0 &&
        !maPrednost(operatory[operatory.length - 1], vyraz[z].charAt(0))
      ) {
        operatory.push(vyraz[z].charAt(0));
      }
    }
  }

  cisla.push(cislice);
  while (operatory.length !== 0) {
    cisla.push(vykonaOperaci(operatory.pop(), cisla.pop(), cisla.pop()));
  }

  vysledek = cisla.pop();
  document.getElementById("vysledek").innerHTML = "Vysledek je " + vysledek;
}

var input = document.getElementById("vyraz");
//Spustí funkci, když uživatel zmáčkne Enter
input.addEventListener("keyup", function(event) {
  // zruší výchozí funkci klávesy, pokud nějaká existuje
  event.preventDefault();
  // 13 je hodnota klávesy Enter
  if (event.keyCode === 13) {
    solveExpression();
  }
});
