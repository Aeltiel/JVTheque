const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();

const connect = process.env.CONNECT;
mongoose
  .connect(connect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//permet de prendre toutes les requetes qui on comme contenu un json et met a disposition le contenu sur l'objet req
app.use(express.json());
//ne prend pas de paramètre pour s'appliquer à toutes les routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //permet à tous d'accéder à notre API (le symbole * pour tous le monde)
  //ajouter les headers mentionnés aux requêtes vers notre APi
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  //permet d'envoyer des requetes avec les méthodes mentionnées
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const userRoutes = require("./routes/rUser");
const gameRoutes = require("./routes/rGame");

app.use("/api/auth", userRoutes);
app.use("/api/game", gameRoutes);

module.exports = app;
