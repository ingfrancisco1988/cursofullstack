'use stritc'
//--------------------------------------------------------------------------------------------------
// console.log("conectado a js");
//Exercise 1:
var myName = "francisco";
var asignarTexto = document.getElementById("texto")

console.log(myName);
console.log("--------------------------");
//--------------------------------------------------------------------------------------------------
//Exercise 2:
var age = 30;
console.log(age);
console.log("--------------------------");
//--------------------------------------------------------------------------------------------------
//Exercise 3:
ignasiAge = 32;
ageDiff = (age - ignasiAge);
ageDiff = (ageDiff < 0) ? (-1) * ageDiff : ageDiff;//uso de operador ternario para eliminar el numero negativo

console.log("la diferencia de edad es: " + ageDiff);
console.log("--------------------------");
//--------------------------------------------------------------------------------------------------
//Exercise 4:
console.log("Aplicando condicional");

asignarTexto.innerHTML = "<h1>hola</h1> <br>";
if (ignasiAge <= 21) {
  asignarTexto.innerHTML = "<p>Tienes 21 o menos años tu edad es: " + ignasiAge + "</p>";
  console.log("Tienes 21 o menos años tu edad es: " + ignasiAge);

}
else {
  asignarTexto.innerHTML += "<p>Eres viejo tu edad es: " + ignasiAge + "</p>";
  console.log("Eres viejo tu edad es: " + ignasiAge);
}

console.log("--------------------------");
//--------------------------------------------------------------------------------------------------
//Exercise 5:
asignarTexto.innerHTML += "<br><p>Comparacion de la edad</p>";
if (age < ignasiAge) {
  console.log("Mi edad es Menor que " + ignasiAge);
  asignarTexto.innerHTML += "<br><p>Mi edad es Menor que " + ignasiAge + "</p>";
}
else if (age > ignasiAge) {
  console.log("Mi edad es Mayor que " + ignasiAge);
  asignarTexto.innerHTML += "<br><p>Mi edad es Mayor que " + ignasiAge + "</p>";
}
else {
  console.log("Mi edad es igual a " + ignasiAge);
  asignarTexto.innerHTML += "<br><p>Mi edad es igual que " + ignasiAge + "</p>";
}
console.log("--------------------------");
//--------------------------------------------------------------------------------------------------
//Exercise 6:
asignarTexto.innerHTML += "<p>Array</p>";
var arreglos = ["francisco", "gianfranco", "juan manuel", "eduar", "federico", "sebastian", "fernando", "carlos", "tomas", "gonzalo", "susana", "nicolas", "maxi", "nicolas", "maria", "ayelen", "florencia", "fiore", "neisa", "soledad", "karen"];
// console.log(arreglos.sort());
// asignarTexto.innerHTML+="<br><p>La lista es: "+arreglos.sort()+"</p>";
arreglos.sort();
for (var i = 0; i < arreglos.length; i++) {
  console.log(arreglos[i]);
  asignarTexto.innerHTML += "<p>nombre: " + arreglos[i] + "</p>";
  //valido el iterador para almacenar la el contenido en esa posicion si i==0 o si i==arreglos.length-1 
  //el -1 es por la condicion del for
  if (i == 0) {
    var primero = arreglos[i]
  }
  else if (i == (arreglos.length - 1)) {
    var ultimo = arreglos[i];
  }
}
console.log("El primer nombre de la lista es: " + primero)
asignarTexto.innerHTML += "<p><strong>El primer nombre de la lista es: </strong>" + primero + "</p>";

console.log("El segundo nombre de la lista es: " + ultimo)
asignarTexto.innerHTML += "<p><strong>El ultimo nombre de la lista es: </strong>" + ultimo + "</p>";
//--------------------------------------------------------------------------------------------------
//Exercise 7:
asignarTexto.innerHTML += "<br><h3>Array parte 2</h3>";
var arregloEdad = ["30", "26", "25", "23", "28", "23", "24", "29", "40", "27", "34", "42", "57", "35", "32", "19", "27", "34", "19", "40", "34"];
var j = 0, k = 0;
var arregloPar = []
console.log("arreglo de edades de los estudiantes")
asignarTexto.innerHTML += "<p><strong>listas de edades</strong></p>";
asignarTexto.innerHTML += "<p>"
while (j < arregloEdad.length) {
  console.log("edad " + arregloEdad[j]);
  asignarTexto.innerHTML +=  arregloEdad[j]+"\n\n";

  if (arregloEdad[j] % 2 == 0) {
    //a diferencia de la plataforma desidi almacenar la informacion en un nuevo areglo para que se vea mas visible la informacion
    arregloPar[k] = arregloEdad[j];
    k++;
  }
  j++;
}
asignarTexto.innerHTML +=  "</p><h2>edades pares</h2>";
asignarTexto.innerHTML +=  "<p>";
console.log("las edades pares son:")
//en esta parte mando a imprimir el el arreglo almacenado
for (let a = 0; a < arregloPar.length; a++) {
  console.log("edad par " + arregloPar[a]);
  asignarTexto.innerHTML +=  arregloPar[a] +"<br>";
}
asignarTexto.innerHTML +=  "</p>";
//--------------------------------------------------------------------------------------------------
//no sigo mandano a visualizar la informacion en el html
//Exercise 8:
console.log("Funcion con array");

arreglo =[10,15,7,8,10,74] //array de ejemplificacion

nMenorArreglo(arreglo)
console.log("-------------------")

function nMenorArreglo(valor)
{
  var aux=valor[0];
  for(let a=0;a<valor.length;a++)
  {
    if(aux>valor[a])
    {
      aux=valor[a];
    }
    
    
  }
  console.log("el menor del array es: "+aux)
}
//--------------------------------------------------------------------------------------------------
//Exercise 9:
console.log("-------------------")
nMayorArreglo(arreglo)
function nMayorArreglo(valor)
{
  var aux=valor[0];
  for(let a=0;a<valor.length;a++)
  {
    if(aux<valor[a])
    {
      aux=valor[a];
    }    
  }
  console.log("el mayor del array es: "+aux)
}
//--------------------------------------------------------------------------------------------------
//Exercise 10:
console.log("-------------------");
var array = [3, 6, 67, 6, 23, 11, 100];
var index = 3;
valorIndice(array, index);
function valorIndice(arreglo, indice) {
  let i = 0;
  let valor;
  if (indice > 0 && indice < arreglo.length) {
    for (i = 0; i < arreglo.length; i++) {
      if (i == indice) {
        valor = arreglo[i];
        break;
      }
    }
    console.log("el valor de la posision " + indice + " es: " + valor);
  } else {
    console.log(
      "el valor del indice se encuentra fuera del parametro del arreglo"
    );
  }
}
//--------------------------------------------------------------------------------------------------
//Exercise 11:
console.log("-------------------")
var array1 = [3,6,67,6,23,11,100,8,93,0,17,24,7,1,33,45,28,33,23,12,99,100];
numerosRepeditos(array1)

function numerosRepeditos(arreglo1) {
  var a = 0,
    i = 0,
    j = 0;
  var valor = [];
  let aux = 0;

  for (i = 0; i < arreglo1.length - 1; i++) {
    for (a = i + 1; a < arreglo1.length; a++) {
      if (arreglo1[i] == arreglo1[a]) {
        valor[j] = arreglo1[i];
        j++;
      }
    }
  }
  console.log("Los numeros repetidos son: \n")
  for (i = 0; i < valor.length; i++) {
    if (valor[i] > valor[i + 1]) {
      aux = valor[i];
      valor[i] = valor[i + 1];
      valor[i + 1] = aux;
    }
    console.log(valor[i]);
  }
}
//--------------------------------------------------------------------------------------------------
//Exercise 12:
console.log("-------------------")
myColor = ["Red", "Green", "White", "Black"];

var union =""

unionColores(myColor)
function unionColores(arreglo2)
{
  for(let i=0;i<arreglo2.length;i++)
  {
    union+=arreglo2[i];
  }
  console.log(union)
}
//--------------------------------------------------------------------------------------------------
//Exercise 13:
console.log("-------------------")
var arregloNumeros = "32443"
var newArray =[]
volteaNumeros(arregloNumeros)

function volteaNumeros(aVuelta)
{

  let i =0,j=0;
  var cadena =""
  for(i=aVuelta.length-1;i>=0;i--)
  {
    newArray[j]=aVuelta[i]
    j++
  }
  for(let i=0;i<newArray.length;i++)
  {
    cadena += newArray[i]
  }
  console.log(cadena)
}
//--------------------------------------------------------------------------------------------------
//Exercise 14:
console.log("-------------------")
var cadena = "webmaster"
var array =[]
var orden = " "
ordenAflabetico(cadena)
function ordenAflabetico(valor)
{
  let i=0
  for(i=0;i<valor.length;i++)
  {
    if(isNaN(valor[i]))
    {
      array[i] = valor[i];
    }
    else{
      break
    }    
  }
  array.sort()
  for(i=0;i<array.length;i++)
  {
    orden += array[i]
  }
  console.log(orden)
}
//--------------------------------------------------------------------------------------------------
//Exercise 15:
console.log("-------------------")
var cadena = "prince of persia"
var res
letraMayuscula(cadena)

function letraMayuscula(valor)
{
  //agregando una expresion regular que me lea tildes y carateres raros
  res =  valor.replace(/(^|[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ])([a-záéíóúüñ])/g,c=>c.toUpperCase())
  console.log(res)
}
//--------------------------------------------------------------------------------------------------
//Exercise 16:
console.log("-------------------")
var cadena = "Web Development Tutorial"

palabraLarga(cadena)
var arreglo = []


function palabraLarga (valor)
{
  var array = valor.split(" ");
  var guardado =""
  for(i=0;i<array.length-1;i++)
  {
    if(array[i].length>array[i+1].length)
    {
      aux=array[i]
      array[i]=array[i+1]
      array[i+1]=aux
      guardado =aux;
    }    
  }
  console.log("La parlabra mas grande es: " + guardado)
}

