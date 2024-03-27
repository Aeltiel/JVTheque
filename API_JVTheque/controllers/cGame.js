const Game = require("../models/mGame");

exports.createGame = (req, res, next) => {
  const gameObject = req.body;
  delete gameObject._id;
  const game = new Game({
    ...gameObject,
    userId: req.auth.userId,
  });
  game
    .save()
    .then(() => {
      res.status(201).json({ message: "Jeu ajouté !" });
    })
    .catch((error) => res.status(400).json({ error: error }));
};

exports.getAllGame = (req, res, next) => {
  const authUser = req.auth.userId;
  Game.find({ userId: authUser })
    .then((games) => {
      if (games.length === 0) {
        res.status(404).json({ message: "Requête des jeux non authorisé !" });
      } else {
        res.status(200).send(games);
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getRetroGames = (req, res, next) => {
  const authUser = req.auth.userId;
  const retroConsole = [
    "Nes",
    "SuperNes",
    "N64",
    "Gamecube",
    "Wii",
    "Wii U",
    "Gameboy",
    "Gameboy Advance",
    "DS",
    "3DS",
    "PS1",
    "PS2",
    "PS3",
    "PSP",
    "PS Vita",
    "Xbox",
    "Xbox 360",
  ];

  Game.find({ userId: authUser, plateforme: retroConsole })
    .then((games) => {
      if (games.length === 0) {
        res.status(404).json({ message: "Requête des jeux non authorisé !" });
      } else {
        res.status(200).send(games);
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getRecentGames = (req, res, next) => {
  const authUser = req.auth.userId;
  const recentConsole = [
    "Switch",
    "PS4",
    "PS5",
    "Xbox One",
    "Xbox Series",
    "PC",
  ];

  Game.find({ userId: authUser, plateforme: recentConsole })
    .then((games) => {
      if (games.length === 0) {
        res.status(404).json({ message: "Requête des jeux non authorisé !" });
      } else {
        res.status(200).send(games);
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyGame = (req, res, next) => {
  const gameObject = req.body;
  delete gameObject._id;
  Game.findOne({ _id: req.params.id })
    .then((game) => {
      if (game.userId !== req.auth.userId) {
        res.status(401).json({ message: "Modification non authorisé !" });
      } else {
        Game.updateOne(
          { _id: req.params.id },
          { ...gameObject, _id: req.params.id }
        )
          .then(() =>
            res.status(200).json({ message: "Jeu modifié avec succès !" })
          )
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(401).json({ error }));
};

exports.deleteGame = (req, res, next) => {
  Game.findOne({ _id: req.params.id }).then((game) => {
    if (game.userId !== req.auth.userId) {
      res.status(401).json({ message: "Suppression non authorisé" });
    } else {
      Game.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Jeu Supprimé !" }))
        .catch((error) => res.status(401).json({ error }));
    }
  });
};
