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
        "personas_menos_votan": 
        {
          datos: [
            { nombre: " ", total_votes: 0, votes_with_party_pct: 0 }
          ]
        },
        "personas_mas_votan": 
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
  //muestra el 10% de personas menos comprometidas del partido
  for (let i = 0; i < (valor1.length * 10) / 100; i++) {    
    obj.votantes_mas_comprometidos['datos'].push({"nombre":valor1[i].first_name,"numero_perdidas":valor1[i].missed_votes,"missed_votes_pct":valor1[i].missed_votes_pct})
  }    
  //+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/++/+/+/+/+/+/+/+/+/+/+/

  //*/*/*/**/*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
  //Parte 3
  valor1.sort(function(a, b) {
    if (a.missed_votes > b.missed_votes) {
      return -1;
    }

    if (a.missed_votes < b.missed_votes) {
      return 1;
    }
    // si son iguales
    return 0;
  });


  //el ciclo recorre el 10% de los votantes mas comprometidos

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
  obj.personas_mas_votan['datos'].push({"nombre":valor1[i].first_name,"total_votes":valor1[i].total_votes,"votes_with_party_pct":valor1[i].votes_with_party_pct})
 
}
//*/*/*/**/*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*

//*/*/*/**/*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
  //Parte 5
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
 
  //muestra el 10% de personas que menos  votan por el partido
  for (let i = 0; i < (valor1.length * 10) / 100; i++) {
    obj.personas_menos_votan['datos'].push({"nombre":valor1[i].first_name,"total_votes":valor1[i].total_votes,"votes_with_party_pct":valor1[i].votes_with_party_pct})
  }
  //*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
   //console.log(JSON.stringify(obj));
    crearTablas(obj)
  }

  function crearTablas(valor1)
  {
    var str = valor1

    var estadisticaAsistencia = document.getElementById("menos_asistencia")
    var estadisticaPartido = document.getElementById("menos_partido")
    var mostrarTabla2 =""
    var mostrar = str.votantes_menos_comprometidos.datos
    mostrarTabla2 = "<tbody>"
    for(let i=1;i<str.votantes_menos_comprometidos.datos.length;i++)
    {     
      mostrarTabla2 +="<tr><td>"+mostrar[i].nombre+"</td> <td>"+ mostrar[i].numero_perdidas+"</td> <td>"+ mostrar[i].missed_votes_pct+"</td> </tr>"
    }
    estadisticaAsistencia.innerHTML=mostrarTabla2
     

   //Estadistica 1
  }