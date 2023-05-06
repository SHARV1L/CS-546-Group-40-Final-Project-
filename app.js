import express from 'express';
import configRoutes from './routes/index.js';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session'
import mwf from './middleware.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//import path from 'path';

const staticDirMedia = express.static(__dirname + '/public');
const staticDirStyles = express.static(__dirname + '/styles');
// console.log(staticDir1);

const app = express();

const rewriteUnsupportedBrowerMethods = (req, res, next) => {
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }
    next();
};

// Setup session middleware
app.use(session({
    name: 'sessions',
    secret: 'I have three german shephards and a labrador back home',
    resave: false,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use('/assets', staticDirMedia);
app.use('/styles', staticDirStyles);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowerMethods);

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
// app.engine('handlebars', exphbs);
app.set('view engine', 'handlebars');

// Middleware function:
//app.use('/hosts', mwf.checkAdminRoute);
app.use('/login', mwf.checkLoginAccess);
app.use('/sign-up', mwf.checkRegisterAccess);
//app.use('/', mwf.checkRegisterAccess);
app.use('/', mwf.loggingMiddleware);

configRoutes(app);

app.listen(3000, () => {
    console.log("Server has started...");
    console.log("Our routes will be running on http://localhost:3000");
})