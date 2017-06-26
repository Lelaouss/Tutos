<?php

    //On déclare la variable resultat et sFormulaire comme des champs vides.
    $resultat = "";
    $sFormulaire = "";
    //On déclare une variable sFormulaire2 qui demande le nombre d'input que l'on veut rajouter avec un 
    //name : iNombreDeChamps. Le name sert à récupérer la valeur de l'utilisateur
    $sFormulaire2 = "<input type=\"text\" name=\"iNombreDeChamps\" placeholder=\"Nombre d'Input ?\"/><br>";
    //On s'assure que le iNombreDeChamps est renseigné
    if (isset($_POST['iNombreDeChamps'])) {
        //Remplace l'input name iNombreDeChamps par name Champ_Hidden en récupérant la valeur
        $sFormulaire2 = "<input type=\"text\" name=\"Champ_Hidden\" value=\"".$_POST['iNombreDeChamps']."\"/>";
        //pour 1 allant de 1 à la valeur saisie par l'utilisateur (avec un pas de 1)
        for($i=1; $i<=$_POST['iNombreDeChamps']; $i++) {
            //on rajoute le nombre d'input qu'à choisi l'utilisateur, le $i à la suite de iNombreUser permet d'avoir
            //iNombreUser1, iNombreUser2, etc...
            $sFormulaire .= $i."<input type=\"text\" name=\"iNombreUser".$i."\" placeholder=\"Nombre ?\"/><br>";// ".=" concaténation...
        }
    //sinon si, le/les champs qu'on vient de rajouté sont remplis
    } else if (isset($_POST['Champ_Hidden'])) {
        //alors le iNombreUser1 devient le nombre plus grand
        $iNombrePlusGrand = $_POST['iNombreUser1'];
        //pour i allant de 2 à le nombre de champ que l'utilisateur à choisi
        for($i=2; $i<=$_POST['Champ_Hidden']; $i++) {
            //Si le iNombrePlusGrand est inférieur au nombre de l'utilisateur
            if ($iNombrePlusGrand < $_POST['iNombreUser'.$i]) {
                //alors le iNombreUser devient le nombre le plus grand.
                $iNombrePlusGrand = $_POST['iNombreUser'.$i];
            }
        }

        //on affiche le résultat
        $resultat = $resultat."Le nombre le plus grand est : ".$iNombrePlusGrand."<br>";       
    }

    require_once('test.html');

?>



