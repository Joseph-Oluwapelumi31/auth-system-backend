import express from 'express';
import { login, signup, forgotpassword, resetpassword, verifyOTP } from '../controllers/authcontroller.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotpassword);
router.post('/verify-otp', verifyOTP);
router.post('/resetpassword', resetpassword);

export default router;
