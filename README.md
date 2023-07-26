Pour ce projet, je vais créer un outils qui va permettre en s'inscrivant de créer une liste de jeux vidéo.

Le but ici est d'avoir sa liste partout avec soi pour pouvoir la consulter, la trier, et la modifier à loirsirs.

C'est pourquoi je vais faire une approche en mobile first pour le design.

Les différentes fonctionnalités : 
    -S'inscrire sur le site
    -Se connecter/déconnecter
    -Une fois sur notre profil l'utilisateur va pouvoir : 
        -Ajouter un jeu à sa liste comprenant divers info comme le nom du jeu, sa plateforme, s'il détient le jeu ou non
        -Trier sa liste, par ordre alphabétique, par plateforme, par détention du jeu ou non
        -Supprimer des jeux de sa liste

C'est mon objectif initial, bien sur une fois fini, je pourrais ajouter d'autre chose en fonction de mes envies ^^

////////////////////////////////////////////////////////////////////////

Pour ma base de données, j'utilise MongoDB et je fais mon API grâce Express de node.js
Le front-end je le fait avec React, combiner à Sass pour réaliser le style.

Les fichiers react sont triés de la manière suivante : 
-Un dossier "Page" qui contient le nécessaire pour afiicher les pages usuels (home, etc) et qui accueil les composants dont ils ont besoin.
-Un dossier "Component" qui est subdivisé en plusieurs sous dossiers pour trier les composants.

note : 
-peut mettre le package pour valider le password coté back et faire la même écriture que pour la validaiton de mon email
-rajouter l'authentification pour le link dans la navbar afin de proposé une alternative quand on est pas connecté : 
    -refaire le bouton de co dans la navbar sous forme de burger ou autre
