// This file should set up the express server as shown in the lecture code
import express from 'express';
import configRoutesFunction from './routes/index.js';

const app = express();

app.use(express.json());

configRoutesFunction(app);


app.listen(3000, () => {
    console.log("Server has started...")
    console.log("Our routes will be running on https://localahost:3000")
})