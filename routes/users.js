import {Router} from 'express';

const router = Router();

// http://localhost:3000/
router.route('/').get(async (req, res) => {
  //code here for GET
  try {
    res.render('users', {title: 'Rental Finder Homepage'});
  } catch (error) {
    res.status(400).json({error: e});
  }
});

export default router;