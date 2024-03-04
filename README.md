### JVThèque

Pour ce projet, je vais créer un outil qui va permettre en s'inscrivant de créer une liste de jeux vidéos.

Le but ici est d'avoir sa liste partout avec soi pour pouvoir la consulter, la trier, et la modifier à loirsir.

C'est pourquoi je vais faire une approche en mobile first pour le design.

Les différentes fonctionnalités :

- S'inscrire sur le site
- Se connecter/déconnecter
- Une fois sur son espace dédié l'utilisateur va pouvoir :
- Ajouter un jeu à sa liste comprenant divers info comme le nom du jeu, sa plateforme, s'il détient le jeu ou non
- Trier sa liste, par ordre alphabétique, par plateforme, par détention du jeu ou non
- Modifier le jeu de son choix, afin de rectifier des erreurs, ou d'indiquer s'il a obtenu le jeu
- Supprimer des jeux de sa liste

C'est mon objectif initial, bien sur une fois fini, je pourrais ajouter d'autre chose en fonction de mes envies ^^

## Lancer le projet

Pour lancer le projet :

- le back :
  Aller dans le dossier API_JVTheque, npm install pour récupéré les nodes modules
  puis nodemon server pour lancer le serveur.
  Attention aux variable d'environnement (voir la section dédié au back)

- le front :

une fois le back lancé, sortez du dossier backend et rendez-vous dans le dossier Front_JVTheque puis faites la commandes npm run start ainsi que npm run tailwind.

## Front-End

Le front-end, je le fait avec React, combiner à Sass pour réaliser le style.

Les fichiers react sont triés de la manière suivante :

\* Un dossier "Page" qui contient le nécessaire pour afficher les pages usuels (home, etc) et qui accueil les composants dont ils ont besoin.

\* Un dossier "Component" pour tous ce qui est réutilisable et donc qui ont peu de logique ou pas de logique spécifique.

\* Un dossier "Container", qui rassemble tous les composants à logique spécifique, notamment tous ceux qui on un appel à l'api. Ce dossier contient un sous dossier "Forms" qui rassemble tous les composants ayant un formulaire, sauf le composant "CardGame" qui a une double fonction et que j'ai préféré laisser en dehors de ce sous dossier

\* Un dossier "Authentification", qui rassemble les fichiers nécessaires à l'authentification d 'un utilisateur

\* Un dossier "Api" qui rassemble tous ce qui touche aux appels à l'API afin de garder une structure de composant propre et si ultérieurement je dois modifier ou ajouter quelque chose en rapport avec les fonctions fetch, tout est dans ce dossier.

\* Un dossier "Styles" qui contient tous les fichiers .scss et qui est grossièrement décomposé comme les fichiers jsx du reste de l'application.

## Backend

Pour ma base de données, j'utilise MongoDB et je fais mon API grâce Express de node.js

Tous les fichiers nécessaires sont dans le dossier "Backend". Il est décomposé comme suit :

\* Un dossier "controllers" qui contient tous les logiques de traitement des données pour le bon fonctionnement du site

\* Un dossier "middleware" qui comprend tous ce qui touche à la logique d'authentification et de gestion du token.

\* Un dossier "models" qui reprend tous les modèles nécessaires à ma base de données pour bien enregistré les informations

\* Un dossier "routes" qui comprend les différentes routes et endpoint de mon API (endPoint développé plus bas)

\* Un dossier "Sécurity" qui comprend tous les fichiers liés à la vérification des informations transmises par l'utilisateur

J'ai également rajouter un fichier .env qui contient la clé de décryptage du token (TOKEN) et l'adresse de connexion à ma base de donnée MongoDB (CONNECT)

### Point sur les endpoints et les fetchs :

L'api que j'ai construite reçoit et envoie des données sous format JSON.
Voici les différents endPoint qui sont séparé en deux branches : la branche dédié à la connexion, et la branche dédié à la récupération des jeux enregistré par l'utilisateur.

#### La branche pour la connexion :

- endpoint pour enregistré un utilisateur : "/api/auth/signup"
- endpoint pour se connecter une fois son compte créer : "/api/auth/login"

Ce sont tous les deux des routes POST, sans authorisation particulière

#### La branche qui gère les jeux de l'utilisateur :

- endpoint pour récupéré les jeux de l'utilisateur mais aussi pour que ce dernier en enregistre : "/api/game"

Cette route peut être utiliser en GET pour récupéré les jeux de l'utilisateur connecter afin de les afficher via le front.
Mais aussi, elle permet à l'utilisateur, en utilisant POST, d'enregistrer de nouveaux jeux sur son compte.

- endpoint dédié à un jeu spécifique : "/api/game/:id"

Cette route peut être utiliser avec le PUT pour modifier un jeu spécifique en cliquant sur la card du jeu en question ou avec DELETE pour supprimer le jeu de la base de donnée.

Les routes liés aux jeux nécessitent d'être connecté et donc d'avoir une authentification. Comme j'ai mis en place une authentification par token, ce dernier est à mettre dans le header des requetes.
