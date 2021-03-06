import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, validationRequest } from '@rc27tickets/common';

import { User } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/api/users/signin", [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage("You must supply a password")
],
    validationRequest,
    async (req: Request, res: Response) => {

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }
        const passswordsMatch = await Password.compare(existingUser.password, password);
        if (!passswordsMatch) {
            throw new BadRequestError('Invalid Credientials')
        }
        // Generate JWT
        const userJwt = jwt.sign({
            id: existingUser._id,
            email: existingUser.email
        }, process.env.JWT_KEY!
        );

        // Store JWT
        req.session = {
            jwt: userJwt
        }

        res.status(200).send( existingUser )
    })

export { router as signinRouter }