import express from 'express';
import { getUserById, getUsers, deleteUserById } from '../db/users'; // Import functions from db/users


// Fetch all users
export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};

// Delete user by ID
export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUserById(id);
        return res.status(200).json(deletedUser);
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};

// Update user by ID
export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;  // Extract id from req.params
        const { username } = req.body;
        
        if (!username) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);

        // if (!user) {
        //     return res.sendStatus(404); // User not found
        // }

        user.username = username;
        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};
