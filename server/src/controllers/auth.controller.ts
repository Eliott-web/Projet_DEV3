import { Request, Response } from 'express';
// import User from '../models/project.user';

// validation email
import { isValidEmail } from '../utils/emailValidator';


// =====================
// INSCRIPTION
// =====================
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email } = req.body;

        // 1. vérifier champs (email surtout)
        if (!firstName || !lastName || !email) {
            return res.status(400).json({ message: "Champs manquants" });
        }

        // 2. vérifier format email
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Email invalide" });
        }

        // 3. vérifier si email existe déjà
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: "Email déjà utilisé" });
        }

        // ⚠️ création → on laisse password pour ton collègue
        const newUser = await User.create(req.body);

        res.status(201).json({ message: "Utilisateur créé !", user: newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// =====================
// CONNEXION
// =====================
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        // 1. vérifier email présent
        if (!email) {
            return res.status(400).json({ message: "Email requis" });
        }

        // 2. vérifier format email
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Email invalide" });
        }

        // 3. vérifier si user existe
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Email incorrect" });
        }

        // OK côté email  
        res.status(200).json({ message: "Email valide" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};