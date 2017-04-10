var config = {
  apiKey: "AIzaSyB7J4PgNvuFxeJeiZ0r_M3wxvOFV8_mWko",
  authDomain: "kako-botasso.firebaseapp.com",
  databaseURL: "https://kako-botasso.firebaseio.com",
  projectId: "kako-botasso",
  storageBucket: "kako-botasso.appspot.com",
  messagingSenderId: "156634629443"
};
firebase.initializeApp(config);

/* ********************************************************
***** CARREGA ARTIGOS
******************************************************** */
firebase.database().ref('artigos/').once('value').then(function(snapshot) {
  var artigos = [];
  var objeto = snapshot.val()
  for(var key in objeto){
    artigos.push("<p><a href='"+ objeto[key]["url"] +"' target='_blank'>"+ objeto[key]["nome"] +"</a></p>")
  }
  document.getElementById("guardaArtigos").innerHTML = artigos.reverse().join('');
});

/* ********************************************************
***** CARREGA TEXTOS
******************************************************** */
firebase.database().ref('textos/').once('value').then(function(snapshot) {
  var objeto = snapshot.val()

  for(var key in objeto){
    document.getElementById("textoTitle").innerHTML = objeto[key]['title'];
    document.getElementById("sobreEsquerdo").innerHTML = objeto[key]['esquerdo'];
    document.getElementById("sobreDireito").innerHTML = objeto[key]['direito'];
    document.getElementById("sobreRodape").innerHTML = objeto[key]['rodape'];
  }
});

/* ********************************************************
***** MOSTRA ANO ATUAL
******************************************************** */
var mydate = new Date();
var year = mydate.getYear();
if (year < 1000){
    year+=1900
}
document.getElementById("ano").innerHTML = year;


/* ********************************************************
***** DOWNLOAD CV
******************************************************** */
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

/* ********************************************************
***** LISTAGEM DE TRABALHOS
******************************************************** */

function itemPortifolio(titulo, index, site, imagem){
  var _html = ""

  if( site ){
    _html += "<div class='col-sm-4 portfolio-item portifolio-item-site'>";
    _html += "    <a href='#portfolioModal"+ index +"' class='portfolio-link portfolio-site-link' data-toggle='modal'>";
  }else{
    _html += "<div class='col-sm-4 portfolio-item'>";
    _html += "    <a href='#portfolioModal"+ index +"' class='portfolio-link' data-toggle='modal'>";
  }

  _html += "        <div class='caption'>";

  if(!site){
    _html += "            <div class='caption-content'>";
    _html += "                <i class='fa fa-search-plus fa-3x'></i>";
    _html += "            </div>";
  }
  _html += "        </div>";

  if( site ){
    _html += "        <p class='portfolio-site'>"+ titulo +"</p>";
  }else{
    _html += "        <img src='"+ imagem +"' class='img-responsive' alt='"+ titulo +"'>";
  }
  _html += "    </a>";
  _html += "</div>";

  return _html;
}

function itemModal(index, titulo, descricao, cliente, data, servico, imagem){
  var _html = "";

  _html += "<div class='portfolio-modal modal fade' id='portfolioModal"+ index +"' tabindex='-1' role='dialog' aria-hidden='true'>"
  _html += "    <div class='modal-content'>"
  _html += "        <div class='close-modal' data-dismiss='modal'>"
  _html += "            <div class='lr'>"
  _html += "                <div class='rl'>"
  _html += "                </div>"
  _html += "            </div>"
  _html += "        </div>"
  _html += "        <div class='container'>"
  _html += "            <div class='row'>"
  _html += "                <div class='col-lg-8 col-lg-offset-2'>"
  _html += "                    <div class='modal-body'>"
  _html += "                        <h2>"+ titulo +"</h2>"
  _html += "                        <hr class='star-primary'>"

  if( imagem ){
      _html += "                        <img src='"+ imagem +"' class='img-responsive img-centered' alt='"+ titulo +"'>"
  }


  if( descricao ){
      _html += "                        <p>"+ descricao +"</p>"
  }

  _html += "                        <ul class='list-inline item-details'>"
  _html += "                            <li>Client:"
  _html += "                                <strong><a href='http://startbootstrap.com'>"+ cliente +"</a></strong>"
  _html += "                            </li>"

  if( data ){
    _html += "                            <li>Date:"
    _html += "                                <strong><a href='http://startbootstrap.com'>"+ data +"</a></strong>"
    _html += "                            </li>"
  }

  _html += "                            <li>Service:"
  _html += "                                <strong><a href='http://startbootstrap.com'>"+ servico +"</a></strong>"
  _html += "                            </li>"
  _html += "                        </ul>"
  _html += "                        <button type='button' class='btn btn-default' data-dismiss='modal'><i class='fa fa-times'></i> Close</button>"
  _html += "                    </div>"
  _html += "                </div>"
  _html += "            </div>"
  _html += "        </div>"
  _html += "    </div>"
  _html += "</div>"

  return _html;
}

var index = 0;
var modals = [];

// ****** CARREGA APPS ******
firebase.database().ref('apps/').once('value').then(function(snapshot) {
  var apps = [];
  var objeto = snapshot.val()

  for(var key in objeto){
    var cliente = objeto[key]["cliente"];
    var data = objeto[key]["data"];
    var descricao = objeto[key]["descricao"];
    var servico = objeto[key]["servico"];
    var titulo = objeto[key]["titulo"];
    var imagem = objeto[key]["imagem"];

    apps.push( itemPortifolio(titulo, index, false, imagem) );
    modals.push( itemModal(index, titulo, descricao, cliente, data, servico, imagem) );
    index += 1;
  }
  document.getElementById("guardaApps").innerHTML = apps.reverse().join('');
  document.getElementById("guardaModals").innerHTML = modals.reverse().join('');
});

// ****** CARREGA SITES ******
firebase.database().ref('sites/').once('value').then(function(snapshot) {
  var sites = [];
  var objeto = snapshot.val()
  modals.push(document.getElementById("guardaModals").innerHTML);

  for(var key in objeto){
    var cliente = objeto[key]["cliente"];
    var data = objeto[key]["data"];
    var descricao = objeto[key]["descricao"];
    var servico = objeto[key]["tecnologias"];
    var titulo = objeto[key]["nome"];
    var imagem = objeto[key]["imagem"];

    sites.push( itemPortifolio(titulo, index, true) );
    modals.push( itemModal(index, titulo, descricao, cliente, data, servico, imagem) );
    index += 1;
  }

  document.getElementById("guardaWeb").innerHTML = sites.join('');
  document.getElementById("guardaModals").innerHTML = modals.reverse().join('');
});
