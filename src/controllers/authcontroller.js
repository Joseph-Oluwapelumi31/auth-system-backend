import User from '../models/user.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import transporter from '../config/mailer.js';
import { generateOTP } from '../utils/generateOTP.js';
import sendEmail  from '../config/sendEmail.js';


export const forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        const otp = generateOTP();
        const hashedOTP = await bcrypt.hash(otp, 10);


        user.resetOTP = hashedOTP;
        user.resetOTPExpires = Date.now() + 15 * 60 * 1000;
        await user.save();

        await sendEmail({
            to: user.email,
            subject: 'Password Reset OTP',
            html: `
              <h2>Password Reset</h2>
              <p>Your OTP is:</p>
              <h1>${otp}</h1>
              <p>This expires in 10 minutes.</p>
            `, 
        })
        await transporter.sendMail({
            to: user.email,
            subject: 'Password Reset OTP',
            html: `
              <h2>Password Reset</h2>
              <p>Your OTP is:</p>
              <h1>${otp}</h1>
              <p>This expires in 10 minutes.</p>
            `
        })
        res.status(200).json({ message: 'OTP sent to email' });
        
    } 
        catch (error) {
        console.log('Error in forget password route', error);
        res.status(500).json({ error: error.message });
    }}


export const verifyOTP = async (req,res) => {
    try {
        const {email, otp} = req.body;
        const emailNormalized = email.trim().toLowerCase();
        const otpTrimmed = otp.trim();

        const user = await User.findOne({ email: emailNormalized });

    if (!user) return res.status(400).json({ error: "User not found" });
    if (!user.resetOTP || !user.resetOTPExpires || user.resetOTPExpires < Date.now())
    return res.status(400).json({ error: "OTP expired" });

    const isValid = await bcrypt.compare(otpTrimmed, user.resetOTP)
    if(!isValid){
        return res.status(400).json({error: 'Invalid OTP'})
    }
    res.status(200).json({message: 'OTP verified successfully'})
        
    } catch (error) {
        console.log('Error in verify-otp route', error);
        res.status(500).json({ error: error.message });
    }
    
}

export const resetpassword = async (req,res) => {
    try {
        const {email, newPassword} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error: 'User not found'})
        }
        const hashed = await bcrypt.hash(newPassword, 10)
        user.password = hashed;
        user.resetOTP = null;
        user.resetOTPExpires = null;
        await user.save();
        res.status(200).json({message: 'Password reset successfully'})
    } catch (error) {
        console.log('Error in reset-passwordroute route', error);
        res.status(500).json({ error: error.message });
    }
    
}
export const signup = async(req,res)=>{
    try {
        const {username, email, password} = req.body
        const existing = await User.findOne({email: email})
        if (existing) return res.status(400).json({error: 'Email already exist try login instead'})
        const hashed = await bcrypt.hash(password, 10)
        const user = new User({username, email, password:hashed})
        await user.save()
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
        res.status(201).json({
            token,
            user:{id: user._id, username: user.username, email: user.email}})
        // get data from req.body
        // check if the email already exist
        // hash the password given from req.body
        // save user with hashed password
        // optional create tod=ken and send is as json

    } catch (error) {
        console.log('error creating user', error)
        res.status(500).json({error: error.message})
    }
    
    
}


export const login = async (req,res)=>{
    try {
       const {email, password} = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({error: 'Invalid credentials'})
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({error: 'Invalid credentials'})
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        
        res.status(200).json({
            token,
            user:{id: user._id, username: user.username, email: user.email}})
        // get data from req.body
        // check for user 
        // if user exist compare using bycrypt.compare to compare password
        // if password is correct send token redirect to home/where the person was before 
    } catch (error) {
        console.log('error in login route', error)
        res.status(500).json({error: error.message})
    }
    
}