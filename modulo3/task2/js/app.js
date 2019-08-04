'use strict'
$(function(){         //script para la ventana modal del login
   
  $("#login").modal({
    backdrop: 'static',
        keyboard: false      
  });
 });


function registrar(){
  var logEmail = document.getElementById('logEmail').value
  var logPass = document.getElementById('logPass').value

  
  firebase.auth().createUserWithEmailAndPassword(logEmail, logPass)
  
  .then(function (){
    verificar()
  })
  
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
    // ...
  }); 
}
function logUser(){
  var logEmail = document.getElementById('logEmail').value
  var logPass = document.getElementById('logPass').value

  firebase.auth().signInWithEmailAndPassword(logEmail, logPass)
  
  .then(function(){
    
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
    //observar()
  }); 

}
function observar(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log(email);
      console.log(user.emailVerified)
      aparecer(user)
      // ...
    } else {
      // User is signed out.
      console.log("no esxite usuario activo")
      // ...
    }
  });
}
function aparecer(user){
var user = user
let mostrarInfo = document.getElementById("contenido")
  if (user.emailVerified){
    mostrarInfo.innerHTML = `  
    <div class="alert alert-success" role="alert">
    <h4 class="alert-heading">Well done!</h4>
    <p>Aww yeah, usiaro logueado correctamente.</p>
    <hr>
    
    <button type="button" data-dismiss="modal" class="btn btn-secondary text-center mx-auto" data-dismiss="modal">ingresar</button>
  </div>
    `
  }
  else{
    mostrarInfo.innerHTML = `  
    <div class="alert alert-danger" role="alert">
    <h4 class="alert-heading">Cuanta creada!</h4>
    <p>Ahora para poder acceder, debes validar el correo que te mandamos.</p>
    <hr>
    
    <div class="alert alert-danger" role="alert">
     <a href="https://www.google.com/gmail/" class="alert-link">Ir al correo</a>.
</div>
  </div>
    `    
  }  
  
}

window.onload = function() {
  outUser();
  observar();   
};




function outUser(){
  firebase.auth().signOut()
  .then(function (){
    mostrarInfo.innerHTML = `  
    <div class="alert alert-success" role="alert">
    <h4 class="alert-heading">Well done!</h4>
    <p>Aww yeah, usiaro creado se te envio la verificacion a tu correo.</p>
    <hr>
    
    <div class="alert alert-danger" role="alert">
     <a href="https://www.google.com/gmail/" class="alert-link">Ir al correo</a>.
</div>
  </div>
    `
  })
  .catch(function (error){
    console.log(error)
  })
}

function verificar(){
  var user = firebase.auth().currentUser;
  user.sendEmailVerification()
  .then(function (){
    console.log("enviando correo")
  })
  .catch(function(error){
    console.log(error)
  })


}


