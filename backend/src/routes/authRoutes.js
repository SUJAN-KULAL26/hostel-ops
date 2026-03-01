import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('username').notEmpty()
], register);

router.post('/login', login);

export default router;