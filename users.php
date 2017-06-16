<?php
//On récupére les données du formulaire 
$pdo = new PDO('mysql:host=localhost;dbname=mike','root','',array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_WARNING,PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8'));

if($_POST){

	$resultat = $pdo->exec("INSERT INTO users(lastname,firstname,date_naissance,post)VALUES('$_POST[firstname]','$_POST[lastname]','$_POST[date_naiss]','$_POST[poste]')");

}


?>