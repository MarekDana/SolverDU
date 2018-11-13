// provede operaci se 2 cisly podle znamenka mezi nimy
function vykonaOperaci(operator, b, a) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
  }
  return 0;
}
// funkce, která vrátí hodnotu příslušnou znaménku
function hodnotaPriority(x) {
  switch (x) {
    case "+":
      return 1;
    case "-":
      return 1;
    case "/":
      return 2;
    case "*":
      return 2;
  }
  return 0;
}
// vyresi zadany vyraz
function solveExpression() {
  var vyraz = document.getElementById("vyraz").value;
  for (var x = 0; x < vyraz.length; x++) {
    // podmínka, která zkontroluje zda výraz obsahuje pouze povolené znaky
    if (!"0123456789+-/*".includes(vyraz[x].charAt(0))) {
      document.getElementById("vysledek").innerHTML =
        "Výraz je neplatný, obsahuje neplatné znaky";
      return;
    }
    // podmínka, která zkontroluje zda výraz nezačiná znaménkem / nebo *
    if ("/*".includes(vyraz[0].charAt(0))) {
      document.getElementById("vysledek").innerHTML =
        "Neplatný výraz, nelze začít výraz znaménkem / nebo *";
      return;
    }
    // podmínka, která zkontroluje zda výraz nekončí znaménkem
    if ("/*+-".includes(vyraz[vyraz.length - 1].charAt(0))) {
      document.getElementById("vysledek").innerHTML =
        "Neplatný výraz, nelze zakončit výraz znaménkem";
      return;
    } // podmínka, která zkontroluje zda výraz nemá 2 znaménka vedle sebe
    if (
      "/*+-".includes(vyraz[x].charAt(0)) &&
      "/*+-".includes(vyraz[x + 1].charAt(0))
    ) {
      document.getElementById("vysledek").innerHTML =
        "Výraz je neplatný, po znaménku musí následovat číslo";
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
    // pokud je znak znaménko
    else if ("+-*/".includes(vyraz[z].charAt(0))) {
      cisla.push(cislice);
      cislice = 0;
      if (operatory.length === 0) {
        operatory.push(vyraz[z].charAt(0));
      } else if (operatory.length !== 0) {
        if (
          hodnotaPriority(operatory[operatory.length - 1]) <
          hodnotaPriority(vyraz[z].charAt(0))
        ) {
          operatory.push(vyraz[z].charAt(0));
        } else if (
          hodnotaPriority(operatory[operatory.length - 1]) >=
          hodnotaPriority(vyraz[z].charAt(0))
        ) {
          while (
            hodnotaPriority(operatory[operatory.length - 1]) >=
            hodnotaPriority(vyraz[z].charAt(0))
          ) {
            cisla.push(
              vykonaOperaci(operatory.pop(), cisla.pop(), cisla.pop())
            );
          }
          operatory.push(vyraz[z].charAt(0));
        }
      }
    }
  }
  cisla.push(cislice);
  while (operatory.length !== 0) {
    cisla.push(vykonaOperaci(operatory.pop(), cisla.pop(), cisla.pop()));
  }
  vysledek = cisla.pop();
  // vysledek === +-Infinity nastane jen v případě, že se dělí nulou
  if (vysledek === Infinity || vysledek === -Infinity) {
    document.getElementById("vysledek").innerHTML = "Nulou nelze dělit";
  } else {
    document.getElementById("vysledek").innerHTML = "Výsledek je " + vysledek;
  }
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
