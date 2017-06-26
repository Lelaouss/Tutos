<?php
// List of classes needed for this program
require_once "config.php";

// Read Configuration datas in ini file
$GLOBALS_INI= listeGlobals();

if ((isset($_POST["iRowTableau"])) && ($_POST["iRowTableau"] != ""))	{
	error_log("iRowTableau = " . $_POST["iRowTableau"]);
	error_log("no_dossier = " . $_POST["no_dossier"]);
	error_log("nom = " . $_POST["nom"]);
	error_log("prenom = " . $_POST["prenom"]);
	error_log("adresse1 = " . $_POST["adresse1"]);
	error_log("cp = " . $_POST["cp"]);
	error_log("ville = " . $_POST["ville"]);
	echo json_encode(array(
							'commentaire' => "Enregistrement OK côté serveur !",
							'error' => 0,
							'message' => 'success'
							)
						);

}  else  {
	$aOfLines= file($GLOBALS_INI{'PATH_HOME'} . $GLOBALS_INI{'PATH_FILES'} . "personnes.txt");
	require_once $GLOBALS_INI{'PATH_HOME'} . $GLOBALS_INI{'PATH_VIEW'} . "tableau_JS.html";
}


?>
