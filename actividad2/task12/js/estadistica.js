//realizando una request para cargar el archivojson en javascript
//crear un servidor local para visualizar la request del xhr

var json ={};
var democrata ={}
var republican ={}
var independents ={}

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

  //+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/++/+/+/+/+/+/+/+/+/+/+/
  //creacion de la tabla 
  var tabla1 = document.getElementById("estadistica")
  var mostrar =" "
     mostrar="<thead class='thead-dark'><tr><th>Party</th><th>Number of Reps</th><th>% Voted with Prty</th></thead>"
    mostrar += "<tr><td>Republican</td><td>"+republican.length+"</td><td>"+resultadoDemocrata+"</td></tr>"
    mostrar += "<tr><td>Democrata</td><td>"+democrata.length+"</td><td>"+resultadoRepublicano+"</td></tr>"
    mostrar += "<tr><td>Independent</td><td>"+independents.length+"</td><td>"+resultadoIndependiente+"</td></tr>"

    tabla1.innerHTML=mostrar  
  



    var estadisticas = {
      "numero de democratas": democrata.length,
      "Promedio de votos Democratas": resultadoDemocrata,
      "numero de Republicanos": republican.length,
      "Promedio de votos Republicanos": resultadoRepublicano,
      "numero de Independientes": independents.length,
      "Promedio de votos Independientes": resultadoIndependiente,
      "Votantes_menos_comprometidos": 
        //copia de modelo de json para para almacenar dotas del array en el objeto
         {
          datos: [
            { nombre: " ", numero_perdidas: 0, votes_with_party_pct: 0 }
          ]
        } 
      
    };
    //--+--+-+-+-+-+--+-+-++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+-+-+-+-+-++
    //valores del nuevo JSON
    var obj={} ,data;
    data =JSON.stringify(estadisticas);
    obj= JSON.parse(data);
  
  //*/*/*/**/*/*/*/*/*/*/*/ */*/*/*//*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
  //Parte 2
  
  //el metodo con un callback para  que me determine las personas del partido que menos votan
  arreglo.sort(function(a, b) {
    if (a.missed_votes > b.missed_votes) {
      return 1;
    }

    if (a.missed_votes < b.missed_votes) {
      return -1;
    }
    // si son iguales
    return 0;
  });
  //+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/++/+/+/+/+/+/+/+/+/+/+/
  //creacion de la tabla 
  //el ciclo recorre el 10% de los votantes
  var tabla1 = document.getElementById("estadistica1")
  var mostrar1 =""
  mostrar1 ="<thead class='thead-dark'><tr><th>Name</th><th>Number of Missed</th><th>Votes	% Missed</th></thead>"
  for (let i = 0; i < (arreglo.length * 10) / 100; i++) {
    //muestra el 10% de personas que no votan por el partido
    mostrar1 += "<tr><td>"+ arreglo[i].first_name +"</td><td>"+ arreglo[i].missed_votes +"</td><td>"+arreglo[i].missed_votes_pct+"</td></tr>"
    
    obj.Votantes_menos_comprometidos['datos'].push({"nombre":arreglo[i].first_name,"numero_perdidas":arreglo[i].missed_votes,"votes_with_party_pct":arreglo[i].missed_votes_pct})
  }
   tabla1.innerHTML=mostrar1 
  //+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/++/+/+/+/+/+/+/+/+/+/+/
  //*/*/*/**/*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
  //Parte 3
  arreglo.sort(function(a, b) {
    if (a.missed_votes > b.missed_votes) {
      return -1;
    }

    if (a.missed_votes < b.missed_votes) {
      return 1;
    }
    // si son iguales
    return 0;
  });
  var tabla2 = document.getElementById("estadistica2")
  var mostrar2 =""
  mostrar2 ="<thead class='thead-dark'><tr><th>Name</th><th>Number of Missed</th><th>Votes	% Missed</th></thead>"
  for (let i = 0; i < (arreglo.length * 10) / 100; i++) {
    //muestra el 10% de personas que no votan por el partido
    mostrar2 += "<tr><td>"+ arreglo[i].first_name +"</td><td>"+ arreglo[i].missed_votes +"</td><td>"+arreglo[i].missed_votes_pct+"</td></tr>"
    //obj['datos'].push("nombre" : arreglo[i].first_name)
  }
   tabla2.innerHTML=mostrar2 

  //*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
//*/*/*/**/*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
//Parte 4
arreglo.sort(function(a, b) {
  if (a.votes_with_party_pct > b.votes_with_party_pct) {
    return -1;
  }

  if (a.votes_with_party_pct < b.votes_with_party_pct) {
    return 1;
  }
  // si son iguales
  return 0;
});

var mostrar3 =""
mostrar3 ="<thead class='thead-dark'><tr><th>Name</th><th>Number of Missed</th><th>Votes	% Missed</th></thead>"
for (let i = 0; i < (arreglo.length * 10) / 100; i++) {
  //muestra el 10% de personas que no votan por el partido
  mostrar3 += "<tr><td>"+ arreglo[i].first_name +"</td><td>"+ arreglo[i].total_votes +"</td><td>"+arreglo[i].votes_with_party_pct+"</td></tr>"
}
 //console.log(mostrar3) 

//*/*/*/**/*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
//*/*/*/**/*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
  //Parte 5
  arreglo.sort(function(a, b) {
    if (a.votes_with_party_pct > b.votes_with_party_pct) {
      return -1;
    }

    if (a.votes_with_party_pct < b.votes_with_party_pct) {
      return 1;
    }
    // si son iguales
    return 0;
  });
 // var tabla2 = document.getElementById("estadistica2")
  var mostrar4 =""
  mostrar4 ="<thead class='thead-dark'><tr><th>Name</th><th>Number of Missed</th><th>Votes	% Missed</th></thead>"
  for (let i = 0; i < (arreglo.length * 10) / 100; i++) {
    //muestra el 10% de personas que no votan por el partido
    mostrar4 += "<tr><td>"+ arreglo[i].first_name +"</td><td>"+ arreglo[i].total_votes +"</td><td>"+arreglo[i].votes_with_party_pct+"</td></tr>"
  }
   //console.log(mostrar4)

  //*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*



   console.log(JSON.stringify(obj));
}
