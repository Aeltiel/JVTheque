//insciption et log
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('email-validator');
const User = require('../models/mUser');
const passwordValidator = require('../Security/password');
const token = process.env.TOKEN;

exports.signup = (req, res, next) => {
    let statut = validator.validate(req.body.email);
    let password = passwordValidator.validate(req.body.password)
    if (statut === true && password === true) {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    pseudo : req.body.pseudo,
                    email: req.body.email,
                    password: hash
                });
                user.save()
                    .then(() => res.status(201).json({ message: "Utilisateur enregistré !" }))
                    .catch(error => res.status(400).json({ error }))
            })
            .catch(error => res.status(500).json({ error }))
    } else {
        res.status(500).json({ message: 'Adresse mail invalide' })
    }
};

exports.login = (req, res, next) => {
    if(req.body.mail === '' && req.body.password === ''){
        res.status(401).json({message : "Identifiant ou mot de passe incorrect"})
    }else{

        User.findOne({ mail: req.body.mail})
            .then(user => {
                if (!user) {
                    return res.status(401).json({ message: "Identifiant ou mot de passe incorrect" })
                }
                bcrypt.compare(req.body.password, user.password)
                .then(isValid => {
                    if(!isValid){
                        res.status(401).json({message : "Identifiant ou mot de passe incorrect"})
                    }
                })
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        token,
                        { expiresIn: '24h' }
                    )
                })
                .catch(() => res.status(500).json({ message: "Internal servor error with bcrypt"}));
            })
            .catch(error => res.status(500).json({ error }))
    }
};