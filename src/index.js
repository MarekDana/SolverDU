function solveExpression() {
  var vyraz = document.getElementbyId("vyraz").value;
  /*


XXX nejdrive zjistit zda je vyraz v poradu viz regularni vyrazy, vyhodnoti vyraz +*-/ + cisla


 */
  document.getElementById("vysledek").innerHTML = "Výsledek je: " + vyraz;
}
var input = document.getElementById("vyraz");
//Spustí funkci, když uživatel zmáčkne Enter
input.addEventListener("keyup", function(event) {
  // zruší výchozí funkci klávesy, pokud nějaká existuje
  event.preventDefault();
  // 13 je hodnota klávesy Enter
  if (event.keyCode == 13) {
    solveExpression();
  }
});
