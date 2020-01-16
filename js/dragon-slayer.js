'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/
var msgDragonAttaquantAvant = '<figure class="game-round"><img src="images/dragon-winner.png" alt="Dragon vainqueur"><figcaption>';
var msgDragonAttaquantApres = '</figcaption></figure>';
var msgJoueurAttaquantAvant = '<figure class="game-round"><img src="images/knight-winner.png" alt="Chevalier vainqueur"><figcaption>';
var msgJoueurAttaquantApres = '</figcaption></figure>';


var msgVaniqueur = 'Vous avez gagné ,Le Dragon vous supplie de le laisser en vie !';
var msgJoueurVainqueurAvant = '<figure class="game-round"><img src="images/knight-winner.png" alt="Chevalier vainqueur"><figcaption>';
var msgDragonVainqueurApres = '</figcaption></figure>';

var msgPerdant = 'Vous avez perdu le combat, le dragon vous a carbonisé !';
var msgDragonVainqueurAvant = '<footer><h3>Fin de la partie</h3><figure class="game-end"><figcaption>';
var msgDragonVainqueurApres = '</figcaption><img src="images/dragon-winner.png" alt="Dragon vainqueur"></figure></footer>';


var dernierAttaquantDragon = false;
var nombreDeViesJoueur = 0;
var nombreDeViesDragon = 0;
var niveauDeLaPartie ='';
var pointsDeDommage = 0;
var messageSuivantAttaquant = '';
function  initiGame() {

  var niveauxPossibles = new Array('FACILE', 'NORMAL', 'DIFFICILE', 'F', 'N', 'D', '1', '2', '3');
  while(niveauxPossibles.indexOf(niveauDeLaPartie.toUpperCase()) === -1) {

    niveauDeLaPartie= prompt('Merci de bien vouloir choisir la difficulté de la partie : "FACILE", "NORMAL", "DIFFICILE", "F", "N", "D" ,"1", "2", "3"')
  }

  return niveauDeLaPartie;

}

/* Début :  Création  des vies d'une façon Random  */

function getRandomNumber(min, max) {

  return Math.floor(min + Math.random() * (max - min + 1));
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

function affichageMiniatureDragonJoueur() {

  var messagePointsDeVieJoueur ="";
  var messagePointsDeVieDragon ="";

  if(nombreDeViesJoueur <= 0) {
    messagePointsDeVieJoueur = "GAME OVER";
    messagePointsDeVieDragon = nombreDeViesDragon + " PV";
  }else if(nombreDeViesDragon <= 0) {
    messagePointsDeVieDragon = "GAME OVER";
    messagePointsDeVieJoueur = nombreDeViesJoueur + " PV";
  }else {
    messagePointsDeVieDragon = nombreDeViesDragon + " PV";
    messagePointsDeVieJoueur = nombreDeViesJoueur + " PV";
  }
    document.write('<div class="game-state">' + '<figure class="game-state_player">' + '<img src="images/knight.png" alt="Chevalier">');
    document.write('<figcaption>' + messagePointsDeVieJoueur + ' </figcaption>' + '</figure>' + '<figure class="game-state_player">' + '<img src="images/dragon.png" alt="Dragon">' + '<figcaption>' + messagePointsDeVieDragon +' </figcaption>' + '</figure></div>');
}


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

  affichageMiniatureDragonJoueur();

}

function makeLiveZero(live) {
  if (live < 0) {
    live = 0;
  }
  return 0;
}


function playTheGame() {

  var tour = 1;
  var attaqueDragon = 0;
  var attaqueJoueur = 0;

  while( (nombreDeViesJoueur > 0) && (nombreDeViesDragon > 0) ) {

    attaqueDragon = getRandomLives(10,6);
    attaqueJoueur = getRandomLives(10,6);

    if(attaqueDragon > attaqueJoueur) {

      dernierAttaquantDragon = true;

      switch(niveauDeLaPartie.toUpperCase()) {

        case 'FACILE':
        case 'F':
        case '1':
          pointsDeDommage = (getRandomLives(3,6) - Math.floor((getRandomLives(3,6) / 100)));
          nombreDeViesJoueur -= pointsDeDommage;
          break;

        case 'NORMAL':
        case 'N':
        case '2':
          pointsDeDommage = (getRandomLives(3,6) - Math.floor((getRandomLives(3,6) / 100)));
          nombreDeViesJoueur -= pointsDeDommage;
          break;

        case 'DIFFICILE':
        case 'D':
        case '3':
          pointsDeDommage = (getRandomLives(3,6) + Math.floor((getRandomLives(1,6) / 100)));
          nombreDeViesJoueur -= pointsDeDommage;

          break;
        default:
          document.write("ERREUR !");
      }
      messageSuivantAttaquant = "Le dragon prend l'initiative, vous attaque et vous inflige " + pointsDeDommage + "points de dommage !";
      document.write('<h3>Tour n°' + tour + '</h3>' + msgDragonAttaquantAvant + messageSuivantAttaquant + msgDragonAttaquantApres);



    }else if(attaqueDragon <= attaqueJoueur){

      switch(niveauDeLaPartie.toUpperCase()) {

        case 'FACILE':
        case 'F':
        case '1':
          pointsDeDommage = (getRandomLives(3,6) + Math.floor((getRandomLives(2,6) / 100)));
          nombreDeViesDragon -= pointsDeDommage;
          break;

        case 'NORMAL':
        case 'N':
        case '2':
          pointsDeDommage = (getRandomLives(3,6) + Math.floor((getRandomLives(2,6) / 100)));
          nombreDeViesDragon -= pointsDeDommage;
          break;

        case 'DIFFICILE':
        case 'D':
        case '3':
          pointsDeDommage = (getRandomLives(3,6) - Math.floor((getRandomLives(1,6) / 100)));
          nombreDeViesDragon -= pointsDeDommage;

          break;
        default:
          document.write("ERREUR !");
      }
      messageSuivantAttaquant = "Vous êtes le plus rapide, vous attaquez le dragon et lui infligez" + pointsDeDommage + "points de dommage !";
      document.write('<h3>Tour n°' + tour + '</h3>' + msgJoueurAttaquantAvant + messageSuivantAttaquant + msgJoueurAttaquantApres);

    }
/*
    makeLiveZero(nombreDeViesDragon);
    makeLiveZero(nombreDeViesJoueur);

*/
    affichageMiniatureDragonJoueur();

    tour++;
    attaqueDragon = 0;
    attaqueJoueur = 0;
    pointsDeDommage = 0;
    messageSuivantAttaquant = '';

  }

  if(dernierAttaquantDragon)  {

    document.write(msgDragonVainqueurAvant + msgPerdant + msgDragonVainqueurApres);

  }else if(!dernierAttaquantDragon) {
    document.write(msgJoueurVainqueurAvant + msgVaniqueur + msgDragonVainqueurApres);
  }

}

initPointsDeVie();

playTheGame();











/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/




/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/
