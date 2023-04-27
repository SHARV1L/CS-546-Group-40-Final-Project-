import { Router } from 'express';
const router = Router();
import validation from '../validation.js';

// http://localhost:3000/
router.route('/').get(async (req, res) => {
    //code here for GET
    try {
        res.render('components/landingPage', { title: 'Landing Page' });
    } catch (error) {
        res.status(400).json({ error: e });
    }
});

// http://localhost:3000/login
router
    .route('/login')
    .get(async (req, res) => {
        //code here for GET
        try {
            res.render('components/login', { title: 'Login Page' });
        } catch (error) {
            res.status(400).json({ error: e });
        }
    })
    .post(async (req, res) => {
        //code here for GET
        try {
            //res.render('components/user-pref', {title: 'Login Page'}).redirect('/user-pref');
            // res.redirect('/login-user-pref');

            const { username, password } = req.body;
            // validating username and password
            const validationErrors = validation.login(username, password);
            if (validationErrors) {
                return res.render('components/login', { title: 'Login Page', errors: validationErrors });
            }
            res.redirect('/login/user-pref');
        } catch (error) {
            res.status(400).json({ error: 'Page Not Available' });
        }
    });

// http://localhost:3000/login/user-pref      /////////////// '.get' step is just for checking route - not required
router
    .route('/login/user-pref')
    .get(async (req, res) => {
        //code here for GET
        try {
            res.render('components/afterLogin', { title: 'User Preference Page' })
        } catch (error) {
            res.status(400).json({ error: e });
        }
    })
    .post(async (req, res) => {
        try {
            if (user - pref === guest) {
                res.render('components/guestHomepage', { title: 'Guest Homepage' });
            }
            else if (user - pref === hosts) {
                res.render('components/hostHomepage', { title: 'Host Homepage' });
            }
        } catch (error) {
            res.status(400).json({ error: e });
        }
    });

// http://localhost:3000/sign-up
router
    .route('/sign-up')
    .get(async (req, res) => {
        //code here for GET
        try {
            res.render('components/signUp', { title: 'Sign Up Page' });
        } catch (error) {
            res.status(400).json({ error: e });
        }
    })
    .post(async (req, res) => {
        //code here for GET
        try {
            const { username, password, email, phone } = req.body;
            console.log(username);
            const validationErrors = validation.signup(username, password, email, phone);
            if (validationErrors) {
                return res.render('components/signUp', { title: 'Sign Up Page', errors: validationErrors });
            }
            res.redirect('/login/user-pref');
            //res.render('components/signUp', {title: 'Sign Up Page'});
        } catch (error) {
            res.status(400).json({ error: 'Sign up error' });
        }
    });
export default router;