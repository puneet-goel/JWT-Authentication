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

app.get('/users',(req,res) => {
    res.status(200).json(emails);
})

// app.post("/login",(req,res) => {
//     const { username, email, password } = req.body
// 	const user = await User.findOne({ username }).lean()

// 	if (!user) {
// 		return res.json({ status: 'error', error: 'Invalid username/password' })
// 	}

// 	if (await bcrypt.compare(password, user.password)) {
// 		// the username, password combination is successful

// 		const token = jwt.sign(
// 			{
// 				id: user._id,
// 				username: user.username
// 			},
// 			JWT_SECRET
// 		)

// 		return res.json({ status: 'ok', data: token })
// 	}

// 	res.json({ status: 'error', error: 'Invalid username/password' })
// })

app.post("/signup", async(req,res) => {
    
    try{
        const {username, password, email} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12)
        await User.create({ 
            username: username,
            email: email, 
            password: hashedPassword 
        });

        res.status(201).json('user added');
    
    }catch (error) {
        if (error.code === 11000) {
			// duplicate key
            return res.json('duplicate user');
		} 
        res.json(err);
    }
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() =>  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));
