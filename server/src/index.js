//entry point of the server

import express from "express";
import cors from "cors";
import {StreamChat} from 'stream-chat';
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

const app = express();  //inicate express
dotenv.config()

app.use(cors());
app.use(express.json()); //make our routes accept json as a form when send to the frontend

//keys
const api_key = process.env.API_KEY
const api_secret = process.env.API_SECRET

//server instance of our connection
const serverClient = StreamChat.getInstance(api_key, api_secret);

//routes
app.post("/signup", async (req, res) => {

    try{
        //receive all the information of the "form" passed from the frotend
    const {firstName, lastName, username, password} = req.body;
    const userId = uuidv4();  //generate random IDs
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);  //this will say to frontend witch user is authenticated
    res.send({token, userId, firstName, lastName, username, hashedPassword}); //send to fronend
    } catch (error){
        res.json(error);
    }
    
});

app.post("/login", async (req, res) => {
    try {
        const { username, password} = req.body; //receive all the information of the "form" passed from the frotend
        const { users } = await serverClient.queryUsers({name: username});
        if (users.length === 0) return res.json({message: "User not Found"});

        const token = serverClient.createToken(users[0].id);
        const passwordMatch = await bcrypt.compare(password, users[0].hashedPassword);

        if(passwordMatch) {
            res.json({
                token, 
                firstName: users[0].firstName,
                lastName: users[0].lastName,
                username,
                userId: users[0].id
            });
        }
    } catch (error) {
        res.json(error);
    }
});


//starting server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
})