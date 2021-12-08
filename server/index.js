import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./models/user.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("JWT Authentictaion API");
})

app.post("/login",async(req,res) => {

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
        res.status(500).json({ message: err});
    }
})

app.post("/signup", async(req,res) => {
    
    try{
        const {username, password, email} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12)
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
        res.status(500).json({ message: err});
    }
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() =>  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));
