//insciption et log
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");
const User = require("../models/mUser");
const passwordValidator = require("../Security/password");
const token = process.env.TOKEN;

exports.signup = (req, res, next) => {
  let statut = validator.validate(req.body.email);
  let password = passwordValidator.validate(req.body.password);
  if (statut === true && password === true) {
    // Vérification d'unicité
    User.findOne({
      $or: [{ pseudo: req.body.pseudo }, { email: req.body.email }],
    })
      .then((existingUser) => {
        if (existingUser) {
          // Un utilisateur avec le même pseudo ou e-mail existe déjà
          return res
            .status(400)
            .json({ message: "Ce pseudo ou cet e-mail est déjà utilisé." });
        } else {
          // Aucun conflit d'unicité, vous pouvez insérer le nouvel utilisateur ici
          bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
              const user = new User({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash,
              });
              user
                .save()
                .then(() => {
                  const newToken = jwt.sign({ userId: user._id }, token, {
                    expiresIn: "24h",
                  });
                  res.status(201).json({
                    message: "Utilisateur enregistré !",
                    token: newToken,
                    userId: user._id,
                  });
                })
                .catch((error) => {
                  res.status(400).json({ error });
                });
            })
            .catch((error) => {
              res.status(500).json({ error });
            });
        }
      })
      .catch((error) => {
        // Gérez les erreurs de manière appropriée
        console.error(error);
        res
          .status(500)
          .json({ error: "Une erreur s'est produite lors de l'inscription." });
      });
  } else {
    res.status(400).json({ message: "Adresse mail ou mot de passe invalide" });
  }
};

exports.login = (req, res, next) => {
  if (req.body.email === "" && req.body.password === "") {
    res.status(401).json({ message: "Identifiant ou mot de passe incorrect" });
  } else {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: "Identifiant incorrect" });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((isValid) => {
            if (!isValid) {
              res.status(401).json({ message: "Mot de passe incorrect" });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, token, {
                  expiresIn: "24h",
                }),
              });
            }
          })

          .catch((bcryptError) => {
            console.log("Erreur bcrypt : " + bcryptError);
            res
              .status(500)
              .json({ message: "Internal servor error with bcrypt" });
          });
      })
      .catch((error) => res.status(500).json({ error }));
  }
};
