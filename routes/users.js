import {Router} from 'express';

const router = Router();

// http://localhost:3000/
router.route('/user-id').get(async (req, res) => {
  //code here for GET
  try {
    res.render('users', {title: 'User Overview Page'});
  } catch (error) {
    res.status(400).json({error: e});
  }
});

export default router;