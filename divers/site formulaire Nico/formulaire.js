   
    ////////////////////////////////////VARIABLES///////////////////////////////////////////////
    
    //On déclare le bouton ajouter/modifier ,supprimer et reset
    var ajouter = document.getElementById("valider") ;
    var supprimer = document.getElementById("supprimer") ;
    var efface = document.getElementById("reset") 

    //On déclare les éléments du tableau
    var table = document.getElementById("tabl") ;
    var tableau = document.getElementById("tabl").rows ;

    //On déclare les lignes pleins du tableau
    var full = document.querySelectorAll(".full")

    //On déclare les élements du formulaire
    var numCommande = document.getElementById("commande") ;
    var marque = document.getElementById("marque")  ;
    var model = document.getElementById("model") ;
    var type = document.getElementById("type")  ;
    var porte = document.getElementById("porte") ;
    var porte2 = document.getElementById("porte2") ;
    var moteur = document.getElementById("moteur")  ;
    var cuir = document.getElementById("cuir") ;
    var clim = document.getElementById("clim") ;
    var vitre = document.getElementById("vitre") ;
    var couleur = document.getElementById("color")  ;
    var prix = document.getElementById("prix");

    //On crée les variable du prix des options
    var optionCuir = 0 ;
    var optionClim = 0 ;
    var optionVitre = 0 ;

    //On déclare un tableau qui stokera les tableaux créé dynamiquement
    var tableauJS = [];
    //Schématiquement ça donnera ce résultat
    /*  tableauJS = [
            tableauJS[0] = [x1, x2, x3, x4, ...] ==> ici pour rechercher x1 on fera tableauJS[0][0]
            tableauJS[1] = [x1, x2, x3, x4, ...] ==> ici pour rechercher x3 on fera tableauJS[1][2]
            tableauJS[2] = [x1, x2, x3, x4, ...] ==> ici pour rechercher x2 on fera tableauJS[2][1]
        ]
    */

//////////////////////////////////////////INITIALISATION DE LA PAGE///////////////////////////////////

    //On vide les inputs du html 
    clear()

    //On initialise les 5 premiere ligne du tableau
    for (var i = 1 ; i <=5 ; i++){
    i%2 == 0 ? tableau[i].style.background = "#bdc3c7" : tableau[i].style.background = "#3498db" ;//=>ligne de couleurs differentes
    tableau[i].style.height = "30px" ;
    }

    //On initialise le numero de commande dans l'input n° de commande
    //Dans ce tp il commencera toujours à 1 mais on gere le cas ou l'on pourrait par la suite enregister
    //son tableau et qu'il soit chargé au chargement de la page 
    var j = 0 ;
    while (tableauJS[j] != undefined){
        j++ ;
    }
    if(tableauJS[0] != undefined){
        numCommande.value = 1
    } else {
        numCommande.value = j+1
    }

/////////////////////////////////////////////////LES FONCTIONS////////////////////////////////////////////////
    
    //On gere les options à choix multiples
    function option(i){

        //portes
        porte.checked == true ? tableauJS[i][4]="3" : tableauJS[i][4]="5" ;

        //options
        clim.checked || cuir.checked || vitre.checked ? tableauJS[i][6] = "oui" : tableauJS[i][6] = "non" ;
        clim.checked ? tableauJS[i][9] = "ok" : tableauJS[i][9] ="non" ;
        cuir.checked ? tableauJS[i][10] = "ok" : tableauJS[i][10] = "non" ;
        vitre.checked ? tableauJS[i][11] = "ok" : tableauJS[i][11] ="non" ;
        
        //prix
        clim.checked ? optionClim = 500 : optionClim = 0 ;
        cuir.checked ? optionCuir = 1000 : optionCuir = 0 ;
        vitre.checked ? optionVitre = 1500 : optionVitre = 0 ;
        tableauJS[i][7] = Number(prix.value) + optionClim + optionCuir + optionVitre ;
    }

    //On vide les inputs
    function clear(){
        marque.value = model.value = type.value =  moteur.value = couleur.value = prix.value  = "" ;
        clim.checked = cuir.checked = vitre.checked = porte.checked = porte2.checked = false ;
    }

    //On gere les remise à 0
    function reset(){
        //On affecte à l'input N° de commande l'id de la prochaine commande
        var j = 0
         while(tableauJS[j] != undefined && j < tableauJS.length){
            j++
        }
        numCommande.value = Number(tableauJS[j-1][0])+1
        
        // On passe le bouton ajouter en mode ajout
        ajouter.className = "ajouter" ;
        ajouter.value = "ajouter" ;
        
        //On vide les inputs du html 
        clear()
    }

///////////////////////////////////////////LES EVENEMENTS//////////////////////////////////////////////////////

//EVENEMENT "AJOUTER/MODIFIER UNE LIGNE"
    ajouter.addEventListener("click", function(){
                            
        if ( ajouter.className == "ajouter"){ //AJOUTER UNE COMMANDE (ajouter.className = "ajouter")

            //On recherche l'endroit du tableauJS ou il n'y a pas de tableau javascript
            var j = 0 ;
            while (tableauJS[j] != undefined){
                j++ ;
            }

            //On construit une nouvelle ligne au tablau html si j > 4
            if (j > 4){
                var newLine = table.insertRow(j+1) ;
                newLine.setAttribute("class", "") ;
                newLine.style.height = "30px" ;
                j%2 == 0 ? newLine.style.background = "#3498db" : newLine.style.background = "#bdc3c7" ;
                for (var i = 0 ; i < 9 ; i++){
                    var cell = newLine.insertCell(i) ;
                }  
            } 

            //on crée un nouveau tableau javascript avec les valeurs des input et de l'id et on l'integre au tableauJS
            if (j == 0){
                tableauJS[j] = new Array(Number(j+1), marque.value, model.value, type.value," " , moteur.value," " , " ", couleur.value) ;
            } else if (j > 0){
                tableauJS[j] = new Array(Number(tableauJS[j-1][0] + 1), marque.value, model.value, type.value," " , moteur.value," " , " ", couleur.value) ;    
            }
            
            //On affecte à l'input N° de commande l'id de la prochaine commande
            numCommande.value = Number(tableauJS[j][0] + 1)

            //On gere les options à choix multiples
            option(j)

            //On insere les lignes du tableauJS rempli dans le tableau html et on affecte la classe full
            for(var i = 0 ; i < 8 ; i++){
                tableau[j+1].cells[i].textContent = tableauJS[j][i] ;
                tableau[j+1].className = "full" ;
            }

            //On vide les inputs du html 
            clear()
            
        } else { //MODIFIER UNE COMMANDE (ajouter.className = "modifier")

            //On recherche dans le tableau html la ligne ayant pour nom de class "focus"
            var j = 0 ;
            while ( tableau[j].className != "focus" && j < tableau.length){
                j++ ;
            }

            //on remplace les valeurs du tableauxJS par les nouvelles valeurs des inputs
            //méthode .splice : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/splice
            tableauJS[j-1].splice(0,11,numCommande.value ,  marque.value, model.value, type.value," " , moteur.value," " ," " , couleur.value) ;
            
            //On gere les options à choix multiples
            option(j-1)

            //On insere les lignes du tableauJS modifié dans le tableau html
            for(var i = 0 ; i < 8 ; i++){
                tableau[j].cells[i].textContent = tableauJS[j-1][i] ;
            }

            //On réinitialise le formulaire
            reset()
        }
    })

    //EVENEMENT "RECUPERER UNE LIGNE"
    table.addEventListener("click", function(e){

    //==> La ligne qui suit est importante, elle introduis la notion de propagation d'évenement en javascript.
    // le "e" placé en parametre de ma fonction click indique l'évenement du click. 
    // e.target indique l'évenement ciblé au click
    // En résumé lorsque je click sur mon tableau cela genere un evenement, pour ciblé l'évenement on utilise target
    // Donc au click sur mon tableau je vais ciblé une cellule (l'enfant le plus bas de tableau), pour avoir la ligne qui correspond je dois
    // remonter avec parentElement.
    // Cette méthode permet d'atteindre des évenements générés dynamiquement. 
        var evt = e.target.parentElement ;

        //Si la 1er cellule de la ligne est différente de vide
        if (evt.children[0].textContent != ""){

            //On gere la class focus pour qu'il n'y ait pas de doublon (cas ou l'utilisateur cliquerait sur une ligne puis sur une autre)
            for (var i = 0; i < tableau.length; i++){
                if (tableau[i].className == "focus"){
                    tableau[i].className = "full"
                    evt.className = "focus" ;
                } else {
                    evt.className = "focus" ;
                }
            }

            //On recherche l'endroit ou la class est différente de focus
            var j = 0
            while (tableau[j].className != "focus" && j < tableau.length){
                j++ ;
            }
            
            // On récupere les valeurs de notre tableauJS et on les insere dans les inputs sur notre page HTML
            numCommande.value = tableauJS[j-1][0] ;
            marque.value = tableauJS[j-1][1] ;
            model.value = tableauJS[j-1][2] ;
            type.value = tableauJS[j-1][3] ;
            tableauJS[j-1][4] == "3" ? porte.checked = true : porte.checked = false ;
            tableauJS[j-1][4] == "5" ? porte2.checked = true : porte2.checked = false ;
            moteur.value = tableauJS[j-1][5] ;
            prix.value = tableauJS[j-1][7] ;
            color.value = tableauJS[j-1][8] ;
            tableauJS[j-1][9] == "ok" ? clim.checked = true : clim.checked = false ;
            tableauJS[j-1][10] == "ok" ? cuir.checked = true : cuir.checked = false ;
            tableauJS[j-1][11] == "ok" ? vitre.checked = true : vitre.checked = false ;

            //Indique au bouton de validation que l'on est en mode modification/suppression
            ajouter.className = "modifier" ;
            ajouter.value = "Modifier" ;
            supprimer.style.display = "block"

        } else {  
        
            //On réinitialise le formulaire
            reset()
        }
    })

 ////EVENEMENT "SUPPRIMER UNE LIGNE"  
    supprimer.addEventListener("click", function(){

        //On recherche le focus
        var j = 0 ;
        while ( tableau[j].className != "focus" && j < tableau.length){
            j++ ;
        }
      
        //Cas ou la ligne supprimer est la derniere de la liste
        if (tableauJS[j] == undefined){

            for(var i = 0 ; i < 8 ; i++){
                tableau[j].cells[i].textContent = " "
                tableau[j].removeAttribute("class")
            }
            //Le tableau html de base comporte 6 lignes, on supprime la ligne si le nombre de lignes du tableau est > 6
            if ( j > 5){
                table.deleteRow(j)
            }
            
        } else { //Cas où la ligne supprimée se trouve entre d'autres lignes

            //On remplace la ligne à supprimée par la ligne suivante et on repete l'opération jusqu'a la fin du tableau
            //Si vous n'arrivez pas à comprendre la ligne tableau[k].cells[i].textContent = tableauJS[k][i] 
            //faire un schéma papier tout s'éclaircira :)
            for(var k = j ; k < tableauJS.length ; k++){
                for(var i = 0 ; i < 8 ; i++){
                    tableau[k].cells[i].textContent = tableauJS[k][i]
                }
            }

            //On recherche la derniere ligne pleine du tableauJS pour la supprimer
            var k = 1 
            while(tableauJS[k] != undefined && k < tableau.length){
                k++
            }
            //On supprime les valeurs des cellules de la derniere ligne du tableau html
            for(var i = 0 ; i < 8 ; i++){
                tableau[k].cells[i].textContent = ""
            }
            //Cas ou le nombre de ligne du tableau est > à 6
            if ( k > 5){
                table.deleteRow(k)
            }
        }
        
        //On utilise la méthode splice pour réorganiser le tableauJS 
        tableauJS.splice(j-1,1)

        //On réinitialise le formulaire
        reset()

        //On cache le bouton supprimer
        supprimer.style.display = "none"
       
    })

/////EVENEMENT RESET///////////

    efface.addEventListener("click", function(){
        reset()
    })











