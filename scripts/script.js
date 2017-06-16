
//---------------------------Appel de jquery---------------------------------------------------------------

$(function(){//lance le code seulement lorsque le html est pret

		//console.log('ouille!'); on verifie si on reçoit le jquery


//-----------------------------------------CAROUSSEL----------------------------------------------------------------------------
		
		//On récupére l'ur ld'image (copier l'adresse de l'image)
		let images =['http://static.boredpanda.com/blog/wp-content/uploads/2015/07/panda-daycare-nursery-chengdu-research-base-breeding-8.jpg',
		'http://md1.libe.com/photo/548972-deux-pandas-geants-mangent-du-bambou-dans-le-centre-bifengxia-en-chine-le-20-avril-2013.jpg'];
		let index =0;//index commence à 0

		setInterval(function(){
		


			if(index == images.length)//taille des 3 images
				index = 0;

			$("#slider_image").attr("src",images[index]);
				//on veut changer la source de l'image par une nouvelle pour l'id de l'image via array

			index++; //change d'index (incrémente)


		},3000);//toutes les 3 secondes



//----------------------------------------AJAX et GET----------------------------------------
	/*Consigne: on veut remplacer le contenu des li par une liste de noms d'utilisateurs présent sur une page web	*/

		//D'abord on fait une requete ajax permettant de récupérer l'url des tableau

		let request = $.ajax({

  				url: "https://jsonplaceholder.typicode.com/users",
  				//url du tableau

  				method: "GET",
  				//il faut utiliser GET car il ne s'agit pas d'un envoi de données

  				//data:{id:}, pas besoin de data pour 1 GET car on veut tous les utilisateurs et peut juste un id

  				dataType: "json" //optionnel

		});
 
		request.done(function(data) {// ce qui se trouve entre les parenthéses de la fonction c'est ce que nous renvoie le serveur (ici le tableau des utilisateurs peu importe le nom )
					
					let content="";// On créé un contenu vide auquel on ajoutera des valeurs (conf.boutique-php)

					data.forEach(function(element){//parcourt toutes les cases des tableaux
					//ce qui se trouve entre les parenthéses de la fonction correspond aux elements récupérés dans le tableau
						content +='<li id="User-'+ element.id+'"><a href="#">' + element.name +'</a><li>';
						//on ne veut que les noms (on associe element à l'indice nom du tableau pour ne récupérer que les noms)
						//on ajoute un id à li pour la suite de l'exercice
					});
					//on efface le code html précédent car il pourrait avoir plus d'utilisateur que de li
					//A la place on ajoute au "content" une nouvelle valeur correspondand aux noms des utilisateurs

					$("#right_column ul").html(content);
					//balise aside regroupant les li, on remplace le contenu  par le contenu du content
//--------------------------------------------------------Exercice 2-----------------------------------------------------------

					$("#right_column ul > li ").click(function(e){
					//si je clique sur une balise li
						
						e.preventDefault();

						/*recupération de l'id : */
						let idUser = $(this).attr("id");// on change l'id mike en idUser
						console.log(idUser.split("-"));//on ajoute un tiret pour chaque id User-3 = array("User","3") 
						//split coupe par rapport au caractére '-' 
						idUser= idUser.split("-");

							let ficheUser = $.ajax({
								url:"https://jsonplaceholder.typicode.com/users",
								method: "GET",
								data: {id : idUser[1]},
								dataType : "json"//option
							});

						ficheUser.done(function(dataUser){

							console.info(dataUser[0].username+" "+dataUser[0].email);

						});

					});
					


					/*$('#right_column ul li').on('click', function(e){

						e.stopPropagation();

							let request2 = $.ajax({

								url:'https://jsonplaceholder.typicode.com/users',
								method:'GET',
								dataType:'json'

						});



					});*/
/*
					request2.done(function(d){

		 				d.forEach(function(element){

		 				console.info(element.username) + '<br>' + console.info(element.email);

		 			});

		});*/



		});
 
		request.fail(function( jqXHR, textStatus ) {
  				alert( "Request failed: " + textStatus );
		});

//-------------------------------Console info----------------------------------
// faire un console.info de username et email de chaque utilisateur lorsqu'on clique sur un li
		

		


	
});