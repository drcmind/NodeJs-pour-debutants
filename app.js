const express = require("express");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const notesRoutes = require("./routes/notesRoutes");

const optionBd = {
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "notes_bd",
};

const app = express();

//Extration des données du formulaire
app.use(express.urlencoded({ extended: false }));

//Définition du middleware pur connexion avec la bd
app.use(myConnection(mysql, optionBd, "pool"));

//Définition du moteur d'affichage
app.set("view engine", "ejs");
app.set("views", "IHM");

//Définition des routes pour notes
app.use(notesRoutes);

app.get("/apropos", (req, res) => {
  res.status(200).render("apropos");
});

app.use((req, res) => {
  res.status(404).render("pageIntrouvable");
});

app.listen(3001);
console.log("Attente des requêtes au port 3001");
