import { Request, Response } from 'express';
import User from '../models/project.user';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // On crée l'utilisateur dans Postgres via Sequelize
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password // Plus tard, on apprendra à hacher le MDP pour la sécu !
        });

        res.status(201).json({ message: "Utilisateur créé !", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création", error });
    }
};