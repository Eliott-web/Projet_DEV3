import express from "express";
import { displayBanner } from './startup';

import authRoutes from './routes/auth.routes';

// On affiche la bannière au lancement
displayBanner();

const app = express();
const PORT = 3000;

app.use('/api/auth', authRoutes);


app.get("/", (req, res) => {
  res.send("Bienvenue sur notre serveur ");
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

// Ton code de logique commence ici
const projetNom: string = "Gestionnaire de Projets Électronique";
console.log(`Initialisation de ${projetNom} terminée.`);