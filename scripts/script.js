
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
		//jqXHR header de la requete (contient les informations de la requete)
		//textStatut de la requete (ex: 304 ou texte)
		//errorThrown gestion des erreurs (on ne le met pas)
  				alert( "Request failed: " + textStatus );

		});

//--------------------------------exercice 3--------------------------------------------------------
		//changer les quatres contenus par le contenu du titre et la description d'une autre page
		//récupérer les données en 1er:

		//-------------------correction Mike:
 			$.ajax({
				url:"https://jsonplaceholder.typicode.com/posts",
 				method:'GET',
 				dataType:'json'
 			})
 			.done(function(dataPosts){
 				console.log(dataPosts);
 				//On fait 1 boucle pour récupérer les 4 premiers titres des données
 				for (let i = 0; i < 4; i++) {
 					//console.log($(".one_quarter > strong").eq(i).text(dataPosts[i].title));
 					$(".one_quarter > strong").eq(i).text(dataPosts[i].title);
 					//un id recupére un seul element (1 objet par un tableau)
 					//une classe récupére les elements (en un tableau)
 					//On parcourt un tableau en jquery avec la fonction eq() (comme avec les crochets pour un indice)
 					//à chaque iteration  
 					//dataPosts[i].body.slice(0,97)+"...";
 					$(".jsDescription").eq(i).text(dataPosts[i].body.slice(0,97)+"...");
 					//La méthode slice permet de couper une chaine de caractéres
//event read more--------------------------------------------------------------------------------------------
 					/*Il faut mettre l'évenement dans done car sinon il n'existe pas. c'est là aussi que se trouve la fonction 
 					si on est en dehors de la fonction, il ne peut pas comprendre ce qu'est dataPost 
 					et ne pas oublier de mettre l'event dans dans la boucle*/
 					$('.more > a').eq(i).on("click",function(e){
 						e.preventDefault();
 						
 						//avant le   console.log('coucou'); en vérifiant on comprend que cela affiche coucou lorsquon clique sur read less donc on est  toujours dans l'evenement du dessus
 						if($(this).text() != 'Read less'){//on cible le a qu'on a cliqué avec this

 							$(".jsDescription").eq(i).text(dataPosts[i].body);
 							$(this).text('Read less');
 						}

 						else{

 							$(".jsDescription").eq(i).text(dataPosts[i].body.slice(0,97)+"...");
 							$(this).text("Read more");
 						}

 						

 					});
 				}
 			}) 
 			//le point de done doit etre directement relié à la parenthéses de la methode ajax (ne pas mettre de variable)
 			.fail(function(jqXHR, textStatus){
 				alert("Request failed: " + textStatus);
 			});
 			


 			//-----------------------exo sonia:
 			/*console.log(requete3);

 			requete3.done(function(donnee){

 				let contenu = '';
 				
 				for (let i = 0; i < 4; i++){

 					contenu += '<strong>' + donnee[i].title+ '</strong>';

 					$(".one_quarter").eq(i).html(contenu);

 					}


 				console.log(contenu);
 			
 				});

 				
 			});
				*/


//----------------------exercice:
/* On veut remplacer les 3 photos de ul clear et ensuite 
à chaque fois qu' on cliquera sur le read all, on veut  afficher 10 photos (3+7 la premiére fois) puis (10 à chaque clic)*/
			
			//exo sonia (pas bon voir correction plus bas)
			/*$.ajax({
				url:'https://jsonplaceholder.typicode.com/photos',
				method:'GET',
				dataType:'json'
			})

			.done(function(postPhoto){
				//console.log(postPhoto);
				
				$('#latest figcaption a').on('click',function(e){
					e.preventDefault();

					//for (let i = 0; i < 10; i++) {
						//boucle s'arrete à 10
						
						$('.clear img').attr("src",postPhoto[i].url);
						console.log(postPhoto.url);
					//}
				
				});

			})

			.fail(function(jqXHR, textStatus){
				"Request failed: " + textStatus;
			});*/
//-------------------------------------------------------------------------------
			//correction:

			let increment = 0;// on créé une variable globale qui nous servira pour effectuer la condition
			let pictures;// variable globale sans valeur 
			//nouvelle syntaxe ajax:
			$.get("https://jsonplaceholder.typicode.com/photos")//méthode get ou post et ensuite ('url')
			.done(function(data){
				//console.log(data);
			/*on a bien récupéré les 5000 images contenu sur la page récupéré par l'url
			mais on ne veut qu'afficher 3 photos qui prendront les places des anciennes*/

				for(let a = 0; a < 3; a++)
				//on effectue une boucle pour récupérer les 3 premiéres photos
					$(".one_third").eq(a).children().attr('src',data[a].url);//
					pictures = data;
					//on ajoute la valeur data à la variable créé ci-dessus
					//grace à la variable pictures qui globale, on peut accéder aux données de data partout
			});

			/*on créé mtn un event jquery lorqu'on clique sur "a"(view all Our recent....) 
			on veut afficher 10 nouvelles photos*/
			$("figcaption > a").click(function(e){

				e.preventDefault();
				//console.log('hi');on teste que l'event du click fonctionne

				let content="";//on créé 1 chaine vide pour concaténer les dix images d'un coup
				let indexLi = $(".one_third").length;
				/*on récupére veut la taille le nombre des li dans le ul*/

				//console.log(pictures);

					/*Lors du premier click, la valeur increment est égale à 0 (let i = increment), 
					tant que i est inférieur 10, la boucle incrémente (regarder console.log(i))
					 */

					for (let i = increment; i < increment+10; i++){
						//console.log(i); 
						let classHtml = "";
						if((indexLi+1)%3 ===0)//(si le chiffre est un multiple de 3, la class last box est prise ne compte)
							classHtml = "lastbox";
						content +='<li class="one_third"><img src="'+pictures[i].url+'" width="290" height="180" alt=""></li>';//on met l'url dans la source de l'image

					}

					$(".clear").append(content);

					increment += 10;
					/*aprés le 1er click, incrémentera de 10 à chaque autre click*/
					


		
			})

});