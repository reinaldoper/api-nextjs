import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import serviceUsers from '@/services/userService';
import { statusCode } from '@/statusCode';
import dotenv from 'dotenv';
import { User } from '@/types/userTypes';

dotenv.config();

class ControllerUsers {
    async login(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const { email, password } = req.body;
        try {
            const user: User | null = await serviceUsers.getUserByEmail(email);
            if (!user) {
                return res.status(statusCode.NOT_FOUND).json({ message: 'Invalid email.' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(statusCode.NOT_FOUND).json({ message: 'Invalid password.' });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
            return res.status(statusCode.OK).json({ token: token });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Error logging in';
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
        }
    }

    async register(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const { email, password, name } = req.body;
        try {
            const existingUser = await serviceUsers.getUserByEmail(email);
            if (existingUser) {
                return res.status(statusCode.BAD_REQUEST).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await serviceUsers.createUser({ email, password: hashedPassword, name });
            return res.status(statusCode.OK).json({ message: newUser });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Error creating user';
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
        }
    }

    async getUserById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const userId = Number(req.query.id);
        try {
            const user = await serviceUsers.getUserById(userId);
            if (!user) {
                return res.status(statusCode.NOT_FOUND).json({ message: 'User not found' });
            }

            return res.status(statusCode.OK).json({ message: user });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Error getting user';
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
        }
    }

    async deleteUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const userId = Number(req.query.id);
        try {
            const user = await serviceUsers.getUserById(userId);
            if (!user) {
                return res.status(statusCode.NOT_FOUND).json({ message: 'User not found' });
            }

            await serviceUsers.deleteUser(userId);
            return res.status(statusCode.OK).json({ message: 'User deleted' });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Error deleting user';
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
        }
    }
}

const controllerUser = new ControllerUsers();
export default controllerUser;
