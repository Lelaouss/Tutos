(function($){ // $(document).ready(function() $(function(){ })(jQuery)
  /*
    definition des elements du slider
      connaitre le nombre de li dans le slider ?
      connaitre les dimension largeur et hauteur du li
        (voir si il existe dans jquery des methode pour connaitre ces infos)
      connaitre par calcul la longuer du ul

    on va modifier la largeur et la hauteur du slideshow en fonction de la largeur et hauteur du li
    en injectant du css dynamiquement dans la balise slideshow
    on va modifier la largeur et la hauteur du ul en fonction de la largeur et hauteur du li
    en injectant du css dynamiquement dans la balise slideshow

    module chekbox:
      il faudra definir l'autoplay
        il y aura un deplacement vers la droite de façon sequencée (setInterval)

    module deplacement vers la droite
      on va vouloir animé (animate() le ul en deplaçant à gauche (propriete left negative) sur une distance
      equivalente au slideshow
        avant l'animation, verfier le premier element li (en css first-child) pour le deplacé en bout de file de la liste (en jquery methode appendTo)
        inserer la propriete left à l'element ul (.css())

    module deplacement vers la gauche
      on va vouloir animé (animate() le ul en deplaçant à droite (propriete left positive) sur une distance
      equivalente au slideshow
        avant l'animation, verfier le dernier element li (en css last-child) pour le deplacé en debut de file de la liste (en jquery methode prependTo)
        inserer la propriete left à l'element ul (.css())

    gestion des evenement de nos modules de deplacement
      on encoute le click de deplacement vers la gauche sur le bouton prev
      on encoute le click de deplacement vers la droite sur le bouton next
  */
  /*creation d'une fonction qui étende jquery*/
  jQuery.fn.slideshow = function(options=null){

    /*Recuperation du nom de l'id de la div slideshow*/
    var div = "#" + $(this).attr("id")

    /*Options par default pour le slidershow*/
    var optionsDefault = {
      interval : 2000,
      speed : 1000,
      easing: "swing",
      autoplay: true
    }
    /*test et affectation des options*/
    if(!options){
      options = optionsDefault
    } else {
      $.each(optionsDefault, function(value, index){
        if(jQuery.type (options[index]) === "undefined"){
          options[index] = value
        }
      })
    }
    /*Declaration des variables*/
    var li = div + " ul li"
    var nbre_li = $(li).length
    var width_li = $(li).width()
    var height_li = $(li).height()
    var ul_width = nbre_li*width_li
    var ul = div + " ul"
    var set
    /*fonction autoplay*/
    $('#checkbox').change(function(){
      if(($(this).is(":checked"))){
        set = setInterval(function(){moveRight()}, options.interval)
      } else {
        clearInterval(set)
      }
    })

    $(div).css({width: width_li , height: height_li})
    $(ul).css({width: ul_width, height: height_li, marginLeft: - width_li})
    $(li + ":last-child").prependTo(ul)
    /*deplacement à droite*/
    function moveRight(){
      $(ul).animate({
        left: "-=" + width_li
      }, options.speed, options.easing,  function(){
        $(li + ":first-child").appendTo(ul)
        $(ul).css('left', '')
      })
    }
    /*deplacement à gauche*/
    function moveLeft(){
      $(ul).animate({
        left: "+=" + width_li
      }, options.speed, options.easing, function(){
        $(li + ":last-child").prependTo(ul)
        $(ul).css('left', '')
      })
    }
    /*evenements*/
    $(div + " a.prev").click(function(){
      moveLeft()
    })
    $(div + " a.next").click(function(){
      moveRight()
    })

  }
})(jQuery)
