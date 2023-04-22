// This file should set up the express server as shown in the lecture code
import express from 'express';
import configRoutesFunction from './routes/index.js';
import exphbs from 'express-handlebars';

import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//import path from 'path';

//const staticDirMedia = express.static(__dirname + '/public');
const staticDirStyles = express.static(__dirname + '/styles');
//console.log(staticDir1);

const app = express();

const rewriteUnsupportedBrowerMethods = (req, res, next) => {
    if (req.body && req.body._method){
        req.method = req.body._method;
        delete req.body._method;
    }
    next();
};

//app.use('/assets', staticDir1);
app.use('/styles', staticDirStyles);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowerMethods);

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
//app.engine('handlebars', exphbs);
app.set('view engine', 'handlebars');

//app.set('views', path.join(__dirname, 'views/'));

configRoutesFunction(app);


app.listen(3000, () => {
    console.log("Server has started...")
    console.log("Our routes will be running on http://localhost:3000")
})