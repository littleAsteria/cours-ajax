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

	//if(!empty($_POST)) 
	if($_SERVER['REQUEST_METHOD'] == 'POST'){//ici, on vérifie que la methode utilisé par ajax est bien un POST quand on a lancé la page
		if(isset($_POST["id"]))
		{
			//on peut ajouter un param pour caster les valeurs
			/*$stmt = $PDO->prepare("INSERT INTO users(fistname, lastname, date_naiss, poste)VALUES(:fistname,:lastname,:date_naiss,:poste)");

			$stmt->bindParam(':fistname',$_POST["fistname"]); 
			$stmt->bindParam(':lastname',$_POST["lastname"]);
			$stmt->bindParam(':date_naiss',$_POST["date_naiss"]);
			$stmt->bindParam(':poste',$_POST["poste"]);
			$stmt->execute(); */
			$stmt = $PDO->prepare("DELETE FROM users WHERE id = :id");
			$stmt->bindParam(':id',$_POST["id"]);

		}else{
			$stmt = $PDO->prepare("INSERT INTO users(fistname, lastname, date_naiss, poste)VALUES(:fistname,:lastname,:date_naiss,:poste)");

			$stmt->bindParam(':fistname',$_POST["fistname"]); 
			$stmt->bindParam(':lastname',$_POST["lastname"]);
			$stmt->bindParam(':date_naiss',$_POST["date_naiss"]);
			$stmt->bindParam(':poste',$_POST["poste"]);
		}

		$stmt ->execute();

	}else if($_SERVER['REQUEST_METHOD'] == 'GET'){//pas de isset

		if(empty($_GET))
			$stmt=$PDO->prepare("SELECT * FROM users");
		
		else
			$stmt=$PDO->prepare("SELECT * FROM users WHERE id = ".$_GET['id']);

		$stmt->execute();
		//var_dump($stmt->fetchAll());// fait la meme chose qu'un fetch_assoc de toutes les données 
		echo json_encode($stmt->fetchAll()); // convertit les array php en objet json
		//mais ajax ne convertit pas les accents
	
	}
?>