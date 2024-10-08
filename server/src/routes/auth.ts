import express from 'express';
import {
	loginValidation,
	signupValidation,
} from '../middlewares/validations/userValidations';
import {
	check_auth,
	login,
	logout,
	signup,
} from '../controllers/authController';

const router = express.Router();

router.post('/login', loginValidation, login);

router.post('/signup', signupValidation, signup);

router.get('/logout', logout);

router.get('/check-auth', check_auth);

export default router;
