<?php
//ajax est asynchrone

/*exemple: 
 sleep(15); //permet de mettre en pause le code php pendant x temps (ici 15 secondes)
 On a 1 réponse de la part du serveur quoiqu'il arrive. 
 //le php n'est pas asynchrone c'est donc utile d'utiliser ajax
 */
	try{
		$PDO = new PDO('mysql:host=localhost;dbname=mike','root','');
		$PDO -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);

	}catch(PDOException $e){
		
		echo "Connexion impossible. Message error:" .$e;
		/*endroit où on gére les erreurs 
		$e->ce qui se trouve dans  l'erreur affiche un message */
		//le try et catch permet d'éviter les fatals erreurs (donc les piratages)visibles pour le client
	}

	if(!empty($_POST)){
		$stmt = $PDO->prepare("INSERT INTO users(fistname, lastname, date_naiss, poste)VALUES(:fistname,:lastname,:date_naiss,:poste)");

	$stmt->bindParam(':fistname',$_POST["fistname"]);//on peut ajouter un param pour caster les valeurs 
	$stmt->bindParam(':lastname',$_POST["lastname"]);
	$stmt->bindParam(':date_naiss',$_POST["date_naiss"]);
	$stmt->bindParam(':poste',$_POST["poste"]);
	$stmt->execute(); 

	}
?>