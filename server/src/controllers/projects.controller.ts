import { Request, Response } from 'express';
import User from '../models/project.user';
import { validatePassword, hashPassword, comparePassword } from '../utils/Password'; 
import { isValidEmail } from '../utils/emailValidator';

export const registerUser = async (req: Request, res: Response) => {
    try {

        const { firstName, lastName, email, password, age } = req.body;


        if (!validatePassword(password, age)) {
            return res.status(400).json({
                message: "Le mot de passe ne respecte pas les règles de sécurité pour ton groupe d'âge."
            });
        }

        const hashedPassword = await hashPassword(password);


        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            age 
        });

        res.status(201).json({
            message: "Utilisateur créé avec succès !",
            user: { id: newUser.id, email: newUser.email }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création", error });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        // 1. On récupère le firstName au lieu de l'email
        const { firstName, password } = req.body;

        const user = await User.findOne({ where: { firstName: firstName } });

        if (!user) {
            // On garde un message générique pour la sécurité
            return res.status(401).json({ message: "Prénom ou mot de passe incorrect." });
        }

        // 3. Vérifier le mot de passe (ça ne change pas)
        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Prénom ou mot de passe incorrect." });
        }

        // 4. Succès
        res.status(200).json({
            message: `Bienvenue ${user.firstName} !`,
            user: { id: user.id, firstName: user.firstName }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la connexion" });
    }
};
