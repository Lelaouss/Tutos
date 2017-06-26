<?php 
	function listeGlobals() {
		$aOfPaths= split("/", $_SERVER{'DOCUMENT_ROOT'});
		$sPath= "";
		for ($i=0; $i<count($aOfPaths)-2; $i++)	{
			$sPath.= $aOfPaths[$i] . "/";
		} 
		return parse_ini_file($sPath . "files/config.ini");
	}

?>
