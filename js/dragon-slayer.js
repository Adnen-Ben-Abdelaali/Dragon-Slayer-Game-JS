'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/

var nombreDeViesJoueur = 0;
var nombreDeViesDragon = 0;
var niveauDeLaPartie ='';

function  initiGame() {

  var niveauxPossibles = new Array('FACILE', 'NORMAL', 'DIFFICILE', 'F', 'N', 'D', '1', '2', '3');
  while(niveauxPossibles.indexOf(niveauDeLaPartie.toUpperCase()) === -1) {

    niveauDeLaPartie= prompt('Merci de bien vouloir choisir la difficulté de la partie : "FACILE", "NORMAL", "DIFFICILE", "F", "N", "D" ,"1", "2", "3"')
  }

  return niveauDeLaPartie;

}

/* Début :  Création  des vies d'une façon Random  */

function getRandomNumber(min, max) {

  return min + Math.trunc(Math.random() * (max - min + 1));
}


function getRandomLives(nbrDees, nbrFaces) {

  var sommeDesLancees = 0;

  for(let i = 0; i < nbrDees; i++) {

    sommeDesLancees += getRandomNumber(1,nbrFaces);
  }

  return sommeDesLancees;
}


/* Fin :  Création  des vies d'une façon Random  */

/*

En mode facile :
--------------
* PV dragon : 100 + 5D10
* PV joueur : 100 + 10D10

En mode normal :
--------------
* PV dragon : 100 + 10D10
* PV joueur : 100 + 10D10

En mode difficile :
-----------------
* PV dragon : 100 + 10D10
* PV joueur : 100 + 7D10

--> Affichage des PV de départ
*/

function initPointsDeVie() {

  let niveauDeLaPartie = initiGame();

  switch(niveauDeLaPartie.toUpperCase()) {

    case 'FACILE':
    case 'F':
    case '1':
      nombreDeViesJoueur = 100 + getRandomLives(10, 10);
      nombreDeViesDragon = 100 + getRandomLives(5, 10);
      break;

    case 'NORMAL':
    case 'N':
    case '2':
      nombreDeViesJoueur = 100 + getRandomLives(10, 10);
      nombreDeViesDragon = 100 + getRandomLives(10, 10);
      break;

    case 'DIFFICILE':
    case 'D':
    case '3':
      nombreDeViesJoueur = 100 + getRandomLives(7, 10);
      nombreDeViesDragon = 100 + getRandomLives(10, 10);
      break;
    default:
      document.write("ERREUR !");
  }


}

initPointsDeVie();
document.write('<div class="game-state">' + '<figure class="game-state_player">' + '<img src="images/knight.png" alt="Chevalier">' + '<figcaption>' + nombreDeViesJoueur + ' PV</figcaption>' + '</figure>' + '<figure class="game-state_player">' + '<img src="images/dragon.png" alt="Dragon">' + '<figcaption>' + nombreDeViesDragon +' PV</figcaption>' + '</figure></div>');

/*

A chaque tour de jeu, les étapes suivantes ont lieu :

1) On détermine qui est le plus rapide et attaque l'autre : c'est l'initiative

	Calcul de l'initiative : chaque personnage lance 10D6. Celui qui a le plus grand score attaque l'autre.

2) On détermine le nombre de points de dommage causés par l'attaquant à son adversaire

	a) Si c'est le dragon qui attaque :

		Les points de dommages sont égaux à 3D6.
		Ensuite ces points de dommages sont majorés ou minorés en fonction de la difficulté et de la classe du héro.

		* Niveau facile : les points de dommages sont minorés de 2D6%.
		* Niveau difficile : les points de dommages sont majorés de 1D6%.

	b) Si c'est le héro qui attaque

		Les points de dommages sont égaux à 3D6.
		Ensuite ces points de dommages sont majorés ou minorés en fonction de la difficulté et de la classe du héro.

		* Niveau facile : les points de dommages sont majorés de 2D6%.
		* Niveau difficile : les points de dommages sont minorés de 1D6%.

3) Affichage du journal du jeu : que s'est-il passé pendant le tour ?

    - Affichage du numéro du tour
	- Affichage de qui a attaqué et combien de points de dommages ont été causés
	- Affichage de l'état du jeu

Fin de la partie
----------------
*/

function playTheGame() {

  var tour = 0;
  var attaqueDragon = 0;
  var attaqueJoueur = 0;

  while( (nombreDeViesJoueur > 0) && (nombreDeViesDragon > 0) ) {

    attaqueDragon = getRandomLives(10,6);
    attaqueJoueur = getRandomLives(10,6);

    if(attaqueDragon > attaqueJoueur) {

      switch(niveauDeLaPartie.toUpperCase()) {

        case 'FACILE':
        case 'F':
        case '1':
          nombreDeViesJoueur -= (getRandomLives(3,6) - (getRandomLives(3,6) / 100));
          break;

        case 'NORMAL':
        case 'N':
        case '2':
          nombreDeViesJoueur -= (getRandomLives(3,6) - (getRandomLives(3,6) / 100));
          break;

        case 'DIFFICILE':
        case 'D':
        case '3':
          nombreDeViesJoueur -= (getRandomLives(3,6) + (getRandomLives(1,6) / 100));
          break;
        default:
          document.write("ERREUR !");
      }



    }else if(attaqueDragon <= attaqueJoueur){

      switch(niveauDeLaPartie.toUpperCase()) {

        case 'FACILE':
        case 'F':
        case '1':
          nombreDeViesDragon -= (getRandomLives(3,6) + (getRandomLives(2,6) / 100));
          break;

        case 'NORMAL':
        case 'N':
        case '2':
          nombreDeViesDragon -= (getRandomLives(3,6) + (getRandomLives(2,6) / 100));
          break;

        case 'DIFFICILE':
        case 'D':
        case '3':
          nombreDeViesDragon -= (getRandomLives(3,6) - (getRandomLives(1,6) / 100));
          break;
        default:
          document.write("ERREUR !");
      }
    }

    attaqueDragon = 0;
    attaqueJoueur = 0;




        <img src="images/knight-winner.png" alt="Chevalier vainqueur">
        <figcaption>Vous êtes le plus rapide, vous attaquez le dragon et lui infligez 30 points de dommage !</figcaption>
    </figure>

    <div class="game-state">
        <figure class="game-state_player">
            <img src="images/knight.png" alt="Chevalier">
            <figcaption>124 PV</figcaption>
        </figure>
        <figure class="game-state_player">
            <img src="images/dragon.png" alt="Dragon">
            <figcaption>105 PV</figcaption>
        </figure>
    </div>

    document.write('<h3>Tour n°' + tour + '</h3>' + '<figure class="game-round">');

    tour++;

  }

/*
) Affichage du journal du jeu : que s'est-il passé pendant le tour ?

    - Affichage du numéro du tour
  - Affichage de qui a attaqué et combien de points de dommages ont été causés
  - Affichage de l'état du jeu

Fin de la partie
----------------

*/

}







/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/




/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/
