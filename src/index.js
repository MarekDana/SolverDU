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
      if (b === 0) {
        document.getElementById("vysledek").innerHTML = "Nulou nelze delit!";
        break;
      } else {
        return a / b;
      }
  }
}
// vrati false pokud znamenko nema prednost a vrati true pokud ma prednost
function maPrednost(x, y) {
  if ((x == "*" || x == "/") && (y == "+" || y == "-")) {
    return false;
  } else {
    return true;
  }
}
// vyresi zadany vyraz
function solveExpression() {
  var vyraz = document.getElementbyId("vyraz").value;
  for (var x = 0; x < vyraz.length; x++) {
    if (!"0123456789+-/*".includes(vyraz[x].charAt(0))) {
      document.getElementById("vysledek").innerHTML = "Vyraz je neplatny";
      return;
    }
  }
  var cisla = new Array();
  var operatory = new Array();
  var vysledek;
  // cyklus ve kterem se prochazi retezec
  for (var z = 0; z < vyraz.length; z++) {
    // pokud je znak cislo
    if (vyraz.charAt(z) >= "0" && vyraz.charAt(z) <= "9") {
      cisla.push(vyraz.charAt(z));
    }
    // pokud je znak znamenko
    else if (vyraz.charAt(z) === ("+" || "-" || "*" || "/")) {
      while (
        !operatory.length === 0 &&
        maPrednost(vyraz.charAt(z), operatory.pop())
      )
        cisla.push(vykonaOperaci(operatory.pop(), cisla.pop(), cisla.pop()));

      operatory.push(vyraz.charAt(z));
    }
  }
  while (!operatory.length == 0) {
    cisla.push(vykonaOperaci(operatory.pop(), cisla.pop(), cisla.pop()));
    vysledek = cisla.pop();
  }
  document.getElementById("vysledek").innerHTML = "Výsledek je: " + vysledek;
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
