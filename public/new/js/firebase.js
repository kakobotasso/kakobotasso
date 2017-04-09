var config = {
  apiKey: "AIzaSyB7J4PgNvuFxeJeiZ0r_M3wxvOFV8_mWko",
  authDomain: "kako-botasso.firebaseapp.com",
  databaseURL: "https://kako-botasso.firebaseio.com",
  projectId: "kako-botasso",
  storageBucket: "kako-botasso.appspot.com",
  messagingSenderId: "156634629443"
};
firebase.initializeApp(config);

// CARREGA ARTIGOS
firebase.database().ref('artigos/').once('value').then(function(snapshot) {
  var artigos = [];
  var objeto = snapshot.val()
  for(var key in objeto){
    artigos.push("<p><a href='"+ objeto[key]["url"] +"' target='_blank'>"+ objeto[key]["nome"] +"</a></p>")
  }
  document.getElementById("guardaArtigos").innerHTML = artigos.reverse().join('');
});

// CARREGA TEXTOS
firebase.database().ref('textos/').once('value').then(function(snapshot) {
  var objeto = snapshot.val()

  for(var key in objeto){
    document.getElementById("textoTitle").innerHTML = objeto[key]['title'];
    document.getElementById("sobreEsquerdo").innerHTML = objeto[key]['esquerdo'];
    document.getElementById("sobreDireito").innerHTML = objeto[key]['direito'];
    document.getElementById("sobreRodape").innerHTML = objeto[key]['rodape'];
  }
});

// MOSTRA ANO ATUAL
var mydate = new Date();
var year = mydate.getYear();
if (year < 1000){
    year+=1900
}
document.getElementById("ano").innerHTML = year;


// DOWNLOAD CV
var storage = firebase.storage();
var storageRef = storage.ref();

// DOWNLOAD CV PT-BR
var cvPtBr = storage.refFromURL('gs://kako-botasso.appspot.com/cv-kako-botasso.pdf')
cvPtBr.getDownloadURL().then(function(url) {
  document.getElementById("cvPtBr").setAttribute("href", url);
}).catch(function(error) {});

// DOWNLOAD CV EN
var cvEn = storage.refFromURL('gs://kako-botasso.appspot.com/resume-kako-botasso.pdf')
cvEn.getDownloadURL().then(function(url) {
  document.getElementById("cvEN").setAttribute("href", url);
}).catch(function(error) {});
