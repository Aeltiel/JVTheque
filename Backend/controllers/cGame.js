const Game = require('../models/mGame');

exports.createGame = (req, res, next) => {
    const gameObject = req.body;
    delete gameObject._id;
    const game = new Game({
        ...gameObject,
        userId : req.auth.userId,  
    });
    game.save()
    .then(() =>{
        res.status(201).json({message : "Jeu ajouté !"})
    })
    .catch(error => res.status(400).json({error : error}))
}

exports.getAllGame = (req, res, next) =>{
    Game.find()
    .then(games => res.status(200).send(games))
    .catch(error => res.status(400).json({ error }));
}

exports.modifyGame = (req, res, next) =>{
    const gameObject = req.body;
    delete gameObject._id;
    Game.findOne({_id: req.params.id})
    .then((game)=>{
        if(game.userId !== req.auth.userId){
            res.status(401).json({ message : "Modification non authorisé !"})
        } else{
            Game.updateOne({_id : req.params.id}, {...gameObject, _id : req.params.id})
            .then(() => res.status(200).json({message : "Jeu modifié avec succès !"}))
            .catch(error=> res.status(401).json({error}))
        }
    })
    .catch(error => res.status(401).json({error}));
}

exports.deleteGame = (req, res, next) =>{
    Game.findOne({_id : req.params.id})
    .then(game =>{
        if(game.userId !== req.auth.userId){
            res.status(401).json({ message: "Suppression non authorisé" })  
        }else{
            Game.deleteOne({_id : req.params.id})
            .then(() => res.status(200).json({message : "Jeu Supprimé !"}))
            .catch(error => res.status(401).json({error}));
        }
    })
}