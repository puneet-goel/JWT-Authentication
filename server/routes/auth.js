import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import User from "../models/user.js";

const router = express.Router();
const url = "http://localhost:3000/reset-password/";

router.post("/login",async(req,res) => {

    try{
        
        const { username, email, password } = req.body;
        const user = await User.findOne({ username }).lean()
        
        if (!user) {
            return res.json({ message: 'Invalid username/password'});
        }

        const match = await bcrypt.compare(password, user.password);
        
        if(!match ||  email!==user.email){
            return res.json({ message: 'Invalid email/password'});
        }

        const token = jwt.sign({
                id: user._id,
                email: email
            },
            process.env.JWT_SECRET
        );
        
        return res.status(200).json({ message: "ok", token: token });
        
    }catch(err){
        res.status(500).json({ message: err.message});
    }
})

router.post("/signup", async(req,res) => {
    
    try{
        const {username, password, email} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({ 
            username: username,
            email: email, 
            password: hashedPassword 
        });

        res.status(201).json({ message: "ok"});
    
    }catch (error) {
        if (error.code === 11000) {
			// duplicate key
            return res.json({ message: 'Username/Email already exists'});
		} 
        res.status(500).json({ message: err.message});
    }
})

router.post("/change",async(req,res) => {

    try{
        
        const { username, email, oldPassword, newPassword } = req.body;
        const user = await User.findOne({ username }).lean();
        
        if (!user) {
            return res.json({ message: 'Invalid username/password'});
        }

        const match = await bcrypt.compare(oldPassword, user.password);
        
        if(!match ||  email!==user.email){
            return res.json({ message: 'Invalid email/password'});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        
        return res.status(200).json({ message: "ok" });
        
    }catch(err){
        res.status(500).json({ message: err.message});
    }
})

router.post('/forgot', async(req,res) => {

    try{
        const email = req.body.email;
        const user = await User.findOne({ email }).lean()
        
        if (!user) {
            return res.json({ message: 'Invalid Email'});
        }
        
        const html = `
            <h3>Hello , </h3>
            <p>Please click on the link below to reset your password for ${email}.</p>
            <p>Reset Link: ${url + user._id}</p>
            <br/>
            <p> If you didn't request this, please ignore this email.</p>
            <p>Thank You</p>
        `

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'puneetvideomeet@gmail.com',
                pass: process.env.VMEET_PASS
            }
        });
        
        let mailDetails = {
            from: 'no-reply puneetvideomeet@gmail.com',
            to: email,
            subject: 'Password Change',
            html: html 
        };
        
        await mailTransporter.sendMail(mailDetails);
        res.status(200).send({ message: 'ok'});
    }catch(err){
        res.status(500).json({ message: err.message});
    }
})

export default router;