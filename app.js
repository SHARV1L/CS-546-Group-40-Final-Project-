// This file should set up the express server as shown in the lecture code
import express from 'express';
import configRoutes from './routes/index.js';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session'
import mwf from './middleware.js'
import multer from 'multer';



import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//import path from 'path';

const staticDirMedia = express.static(__dirname + '/public');
const staticDirStyles = express.static(__dirname + '/styles');
//console.log(staticDir1);

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(upload.single('image'));


const rewriteUnsupportedBrowerMethods = (req, res, next) => {
    if (req.body && req.body._method){
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

app.engine('handlebars', exphbs.engine('handlebars', exphbs ));
//app.engine('handlebars', exphbs);
app.set('view engine', 'handlebars');

// Middleware function:
app.use('/admin', mwf.checkAdminRoute);
app.use('/login', mwf.checkLoginAccess); 
app.use('/sign-up', mwf.checkRegisterAccess);
app.use('/logout', mwf.checkLogoutAccess);
app.use('/', mwf.loggingMiddleware);
app.use('/user-pref', mwf.checkProtectedRoute);
app.use('/guest',mwf.checkProtectedRoute);
app.use('/host',mwf.checkProtectedRoute);
app.use('/search',mwf.checkProtectedRoute);
configRoutes(app);

app.listen(3000, () => {
    console.log("Server has started...")
    console.log("Our routes will be running on http://localhost:3000")
})