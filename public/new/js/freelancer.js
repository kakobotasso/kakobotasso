// Freelancer Theme JavaScript

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){
            $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Floating label headings for the contact form
    $(function() {
        $("body").on("input propertychange", ".floating-label-form-group", function(e) {
            $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
        }).on("focus", ".floating-label-form-group", function() {
            $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function() {
            $(this).removeClass("floating-label-form-group-with-focus");
        });
    });

    // CARREGA ARTIGOS
    firebase.database().ref('artigos/').once('value').then(function(snapshot) {
      var artigos = [];
      var objeto = snapshot.val()
      for(var key in objeto){
        artigos.push("<p><a href='"+ objeto[key]["url"] +"' target='_blank'>"+ objeto[key]["nome"] +"</a></p>")
      }
      $("#guardaArtigos").html(artigos.reverse().join(''));
    });

    // CARREGA TEXTOS
    firebase.database().ref('textos/').once('value').then(function(snapshot) {
      var objeto = snapshot.val()

      for(var key in objeto){
        $("#textoTitle").text(objeto[key]['title']);
        $("#sobreEsquerdo").text(objeto[key]['esquerdo']);
        $("#sobreDireito").text(objeto[key]['direito']);
        $("#sobreRodape").text(objeto[key]['rodape'])
      }
    });

    // MOSTRA ANO ATUAL
    var mydate = new Date();
    var year = mydate.getYear();
    if (year < 1000){
        year+=1900
    }
    $("#ano").text(year)


    // DOWNLOAD CV
    var storage = firebase.storage();
    var storageRef = storage.ref();

    // DOWNLOAD CV PT-BR
    var cvPtBr = storage.refFromURL('gs://kako-botasso.appspot.com/cv-kako-botasso.pdf')
    cvPtBr.getDownloadURL().then(function(url) {
      $("#cvPtBr").attr('href', url)
    }).catch(function(error) {});

    // DOWNLOAD CV EN
    var cvEn = storage.refFromURL('gs://kako-botasso.appspot.com/resume-kako-botasso.pdf')
    cvEn.getDownloadURL().then(function(url) {
      $("#cvEN").attr('href', url)
    }).catch(function(error) {});

})(jQuery); // End of use strict
