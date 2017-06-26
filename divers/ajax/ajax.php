<?php
// List of classes needed for this program
require_once "config.php";

// Read Configuration datas in ini file
$GLOBALS_INI= listeGlobals();

error_log("no_dossier = " . $_POST["no_dossier"]);
error_log("nom = " . $_POST["nom"]);
error_log("prenom = " . $_POST["prenom"]);
error_log("email = " . $_POST["email"]);
error_log("adresse = " . $_POST["adresse"]);
error_log("cp = " . $_POST["cp"]);
error_log("ville = " . $_POST["ville"]);
error_log("pays = " . $_POST["pays"]);

echo json_encode(array(
						'commentaire' => "Enregistrement OK !",
						'autre_message' => "coucou !",
						'error' => 0,
						'message' => 'success'
						)
					);



?>
