// This file should set up the express server as shown in the lecture code
import express from 'express';
import configRoutesFunction from './routes/index.js';

import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir1 = express.static(__dirname + '/public');
const staticDir2 = express.static(__dirname + '/styles');
console.log(staticDir1);

const app = express();

app.use('/assets', staticDir1);
app.use('/styles', staticDir2);
app.use(express.json());

configRoutesFunction(app);


app.listen(3000, () => {
    console.log("Server has started...")
    console.log("Our routes will be running on http://localhost:3000")
})