//realizando una request para cargar el archivojson en javascript
//crear un servidor local para visualizar la request del xhr

var json ={};
var democrata ={}
var republican ={}
var independents ={}
var valorPequenio =[] 

var rArchivoJson = new XMLHttpRequest();
rArchivoJson.onload = escucharRespuesta;
rArchivoJson.open("get", "js/pro-congress-113-senate.json", true);
rArchivoJson.send();

function escucharRespuesta(e) {
    json = JSON.parse(this.response);
    var data = json.results[0].members
    //console.log(data)
    listarPartidos(data)
}


function listarPartidos(arreglo)
{
  var valorDemocrata = 0,
    valorRepublicano = 0,
    valorIndependiente = 0;
  var resultadoDemocrata = 0,
    resultadoRepublicano = 0,
    resultadoIndependiente;
  var posi = 0;
  var r;
  var aux = 0;

  democrata = arreglo.filter(arre => arre.party == "D");
  republican = arreglo.filter(arre => arre.party == "R");
  independents = arreglo.filter(arre => arre.party == "I");
  //console.log(democrata)

  for (let i = 0; i < democrata.length; i++) {
    valorDemocrata += democrata[i].votes_with_party_pct;
  }

  for (let i = 0; i < republican.length; i++) {
    valorRepublicano += republican[i].votes_with_party_pct;
  }

  for (let i = 0; i < independents.length; i++) {
    valorIndependiente += independents[i].votes_with_party_pct;
  }

  resultadoDemocrata = (valorDemocrata / democrata.length).toFixed(2);
  resultadoRepublicano = (valorRepublicano / republican.length).toFixed(2);
  resultadoIndependiente = valorIndependiente;

  //el metodo con un callback para  que me determine las personas del partido que menos votan
  democrata.sort(function(a, b) {
    if (a.votes_with_party_pct > b.votes_with_party_pct) {
      return 1;
    }
    if (a.votes_with_party_pct < b.votes_with_party_pct) {
      return -1;
    }
    // si son iguales
    return 0;
  });
  //el ciclo recorre el 10% de los votantes
  for (let i = 0; i < (democrata.length * 10) / 100; i++) {
    //muestra el 10% de personas que no votan por el partido
    console.log(
      democrata[i].first_name +
        "el porcentaje de votacion: " +
        democrata[i].votes_with_party_pct
    );
  }

  var estadisticas = {
    "numero de democratas": democrata.length,
    "Promedio de votos Democratas": resultadoDemocrata,
    "numero de Republicanos": republican.length,
    "Promedio de votos Republicanos": resultadoRepublicano,
    "numero de Independientes": independents.length,
    "Promedio de votos Independiente": resultadoIndependiente
  };
  console.log(resultadoDemocrata);
  console.log(resultadoRepublicano);

  console.log(JSON.stringify(estadisticas));
}
