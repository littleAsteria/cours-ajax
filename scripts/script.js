$(function(){//lance le code seulement lorsque le html est pret

		//console.log('ouille!'); on verifie si on est bien connecter au jquery

		//On récupére l'ur ld'image (copier l'adresse de l'image)
		let images =['http://static.boredpanda.com/blog/wp-content/uploads/2015/07/panda-daycare-nursery-chengdu-research-base-breeding-8.jpg',
		'http://md1.libe.com/photo/548972-deux-pandas-geants-mangent-du-bambou-dans-le-centre-bifengxia-en-chine-le-20-avril-2013.jpg',
		'http://www.seriousfacts.com/wp-content/uploads/2017/03/panda-sleeping.jpg'];
		let index =0;//index commence à 0

		setInterval(function(){
		


			if(index == images.length)//taille des 3 images
				index = 0;

			$("#slider_image").attr("src",images[index]);
				//on veut changer la source de l'image par une nouvelle pour l'id de l'image via array

			index++; //change d'index (incrémente)


		},3000);//toutes les 3 secondes

	

		
});