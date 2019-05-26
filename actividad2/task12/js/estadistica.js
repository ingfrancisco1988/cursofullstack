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
    
    listarPartidos(data)
}


function listarPartidos(arreglo)
{
    var estadisticas = {
      "numero_de_democratas": 0,
      "promedio_de_votos_democratas": 0,
      "numero_de_republicanos": 0,
      "Promedio_de_votos_republicanos": 0,
      "numero_de_independientes": 0,
      "promedio_de_votos_independientes": 0,
      "votantes_menos_comprometidos": 
        //copia de modelo de json para para almacenar dotas del array en el objeto
         {
          datos: [
            { nombre: " ", numero_perdidas: 0, missed_votes_pct: 0 }
          ]
        },
        "votantes_mas_comprometidos": 
        {
          datos: [
            { nombre: " ", numero_perdidas: 0, missed_votes_pct: 0 }
          ]
        },
        "partido_menos_comprometido": 
        {
          datos: [
            { nombre: " ", total_votes: 0, votes_with_party_pct: 0 }
          ]
        },
        "partido_mas_leal": 
        {
          datos: [
            { nombre: " ", total_votes: 0, votes_with_party_pct: 0 }
          ]
        }  
    };

    mostrarEstadisticas(arreglo,estadisticas)
    
 }//fin de la instrucion para capturar el json

//asigo dos parametros para que realice las estadisticas el primero es el json global y el segundo el josn stadistica
function mostrarEstadisticas(valor1, valor2)
    {
      var valorDemocrata = 0,
      valorRepublicano = 0,
      valorIndependiente = 0;
//+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/++/+/+/+/+/+/+/+/+/+/+/
//parte 1
var obj={} ,data;
data =JSON.stringify(valor2);
obj= JSON.parse(data);


      democrata = valor1.filter(arre => arre.party == "D");
      republican = valor1.filter(arre => arre.party == "R");
      independents = valor1.filter(arre => arre.party == "I");
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
    
       //--+--+-+-+-+-+--+-+-++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+-+-+-+-+-++
    //carga de la primera estadistica en el JSON stadisticas
 
      resultadoDemocrata = (valorDemocrata / democrata.length).toFixed(2);
      resultadoRepublicano = (valorRepublicano / republican.length).toFixed(2);
      resultadoIndependiente = valorIndependiente;

      obj.numero_de_democratas = democrata.length;
      obj.promedio_de_votos_democratas = resultadoDemocrata;
      obj.numero_de_republicanos = republican.length; 
      obj.Promedio_de_votos_republicanos = resultadoRepublicano;
      obj.numero_de_independientes = independents.length;
      obj.promedio_de_votos_independientes = resultadoIndependiente;
   
  //*/*/*/**/*/*/*/*/*/*/*/ */*/*/*//*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
  //Parte 2
  
  //el metodo con un callback para  que me determine las personas del partido que menos votan
  valor1.sort(function(a, b) {
    if (a.missed_votes_pct > b.missed_votes_pct) {
      return 1;
    }

    if (a.missed_votes_pct < b.missed_votes_pct) {
      return -1;
    }
    // si son iguales
    return 0;
  });
  //+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/++/+/+/+/+/+/+/+/+/+/+/
  //muestra el 10% de personas mas comprometidas del partido
  for (let i = 0; i < (valor1.length * 10) / 100; i++) {    
    obj.votantes_mas_comprometidos['datos'].push({"nombre":valor1[i].first_name,"numero_perdidas":valor1[i].missed_votes,"missed_votes_pct":valor1[i].missed_votes_pct})
  }    
  //+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/++/+/+/+/+/+/+/+/+/+/+/

  //*/*/*/**/*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
  //Parte 3 el 10% de los votantes menos comprometidos
  valor1.sort(function(a, b) {
    if (a.missed_votes_pct > b.missed_votes_pct) {
      return -1;
    }

    if (a.missed_votes_pct < b.missed_votes_pct) {
      return 1;
    }
    // si son iguales
    return 0;
  });


  //el ciclo recorre el 10% de los votantes menos comprometidos

  for (let i = 0; i < (valor1.length * 10) / 100; i++) {    
    obj.votantes_menos_comprometidos['datos'].push({"nombre":valor1[i].first_name,"numero_perdidas":valor1[i].missed_votes,"missed_votes_pct":valor1[i].missed_votes_pct})
  }
  //*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*

//*/*/*/**/*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
//Parte 4
valor1.sort(function(a, b) {
  if (a.votes_with_party_pct > b.votes_with_party_pct) {
    return -1;
  }
  if (a.votes_with_party_pct < b.votes_with_party_pct) {
    return 1;
  }
  // si son iguales
  return 0;
});

 //muestra el 10% de personas mas votan por el partido
for (let i = 0; i < (valor1.length * 10) / 100; i++) {
  obj.partido_mas_leal['datos'].push({"nombre":valor1[i].first_name,"total_votes":valor1[i].total_votes,"votes_with_party_pct":valor1[i].votes_with_party_pct})
 
}
//*/*/*/**/*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*

//*/*/*/**/*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
  //Parte 5 10% de personas que menos
  valor1.sort(function(a, b) {
    if (a.votes_with_party_pct > b.votes_with_party_pct) {
      return 1;
    }
    if (a.votes_with_party_pct < b.votes_with_party_pct) {
      return -1;
    }
    // si son iguales
    return 0;
  });
 
  //muestra el 10% de personas que menos  votan por el partido
  for (let i = 0; i < (valor1.length * 10) / 100; i++) {
    obj.partido_menos_comprometido['datos'].push({"nombre":valor1[i].first_name,"total_votes":valor1[i].total_votes,"votes_with_party_pct":valor1[i].votes_with_party_pct})
  }
  //*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
   //console.log(JSON.stringify(obj));
    crearTablas(obj)
  }

  function crearTablas(valor1)
  {
    var str = valor1

    var estadisticaMenosComprometido = document.getElementById("menos_comprometido")
    var estadisticaMenosLeal = document.getElementById("menos_leal")
    var estadisticaMasComprometido = document.getElementById("mas_comprometido")
    var estadisticaMasLeal = document.getElementById("mas_leal")
    var mostrarTabla2 =""
    //primera parte de las tablas
    var mayorAttendance = str.votantes_menos_comprometidos.datos
    var menorPartyLoyalty = str.partido_menos_comprometido.datos

    //segunda parte de las tablas
    var mayorAttendace = str.votantes_mas_comprometidos.datos
    var mayorPartyLoyalty = str.partido_mas_leal.datos

    if (document.body.contains(estadisticaMenosComprometido)) {
      mostrarTabla2 =
        "<thead><td>Name</td><td>Number of Missed Votes</td><td>% Missed</td></thead>";
      mostrarTabla2 += "<tbody>";
      for (let i = 1; i < str.votantes_menos_comprometidos.datos.length;i++) {
        mostrarTabla2 +=
          "<tr><td>" +
          mayorAttendance[i].nombre +
          "</td> <td>" +
          mayorAttendance[i].numero_perdidas +
          "</td> <td>" +
          mayorAttendance[i].missed_votes_pct +
          "</td> </tr>";
      }
      mostrarTabla2 += "</tbody>";
      estadisticaMenosComprometido.innerHTML = mostrarTabla2;
    } else if (document.body.contains(estadisticaMenosLeal)) {
      mostrarTabla2 =
        "<thead class='bg-black'><td>Name</td><th>Number Party Votes</th><th>% Party Votes</th></thead>";
      mostrarTabla2 += "<tbody>";
      for (let i = 1; i < str.partido_menos_comprometido.datos.length; i++) {
        mostrarTabla2 +=
          "<tr><td>" +
          menorPartyLoyalty[i].nombre +
          "</td> <td>" +
          menorPartyLoyalty[i].total_votes +
          "</td> <td>" +
          menorPartyLoyalty[i].votes_with_party_pct +
          "</td> </tr>";
      }
      mostrarTabla2 += "</tbody>";
      estadisticaMenosLeal.innerHTML = mostrarTabla2;
    }
 
   //Estadistica 2-4
   if(document.body.contains(estadisticaMasComprometido))
    {
    mostrarTabla2 ="<thead><td>Name</td><td>Number of Missed Votes</td><td>% Missed</td></thead>"  
    mostrarTabla2 += "<tbody>"
    for(let i=1;i<str.votantes_mas_comprometidos.datos.length;i++)
    {     
      mostrarTabla2 +="<tr><td>"+mayorAttendace[i].nombre+"</td> <td>"+ mayorAttendace[i].numero_perdidas+"</td> <td>"+ mayorAttendace[i].missed_votes_pct+"</td> </tr>"
    }
    mostrarTabla2 += "</tbody>"
    estadisticaMasComprometido.innerHTML=mostrarTabla2
  }
  else if(document.body.contains(estadisticaMasLeal))
  {
    mostrarTabla2 ="<thead class='bg-black'><td>Name</td><th>Number Party Votes</th><th>% Party Votes</th></thead>" 
    mostrarTabla2 += "<tbody>"
    for(let i=1;i<str.partido_mas_leal.datos.length;i++)
    {    
      
      mostrarTabla2 +="<tr><td>"+mayorPartyLoyalty[i].nombre+"</td> <td>"+ mayorPartyLoyalty[i].total_votes+"</td> <td>"+ mayorPartyLoyalty[i].votes_with_party_pct+"</td> </tr>"
    }
    mostrarTabla2 += "</tbody>"
    estadisticaMasLeal.innerHTML = mostrarTabla2
  }
}