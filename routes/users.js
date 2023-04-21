import {Router} from 'express';
const router = Router();
import {usersData} from '../data/index.js';
import validation from '../validation.js';
//import {exportedFunctions} from '../data/users.js';

router
  .route('/')
  .get(async (req, res) => {
    try {
      let userList = await usersData.getAllUsers();
      res.json(userList);
    } catch (e) {
      res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    let userInfo = req.body;
    if (!userInfo || Object.keys(userInfo).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }

    try {
      userInfo.firstName = validation.checkString(
        userInfo.firstName,
        'First Name'
      );
      userInfo.lastName = validation.checkString(
        userInfo.lastName,
        'Last Name'
      );
      userInfo.email=validation.checkValidEmail(userInfo.email,"email");
      userInfo.password=validation.checkValidPassword(userInfo.password,"passwd");
      userInfo.phoneNumber=validation.checkValidPhone(userInfo.phoneNumber,"phone");
      userInfo.accountType=validation.checkString(userInfo.accountType,"accountType");

    } catch (e) {
      return res.status(400).json({error: e});
    }
    try { 
      const newUser = await usersData.createUser(
        userInfo.firstName,
        userInfo.lastName,
        userInfo.email,
        userInfo.password,
        userInfo.phoneNumber,
        userInfo.accountType
      );
      res.json(newUser);
    } catch (e) {
      res.status(500).send("Error creating user");

    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'ID URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      let user = await usersData.getUserById(req.params.id);
      res.json(user);
    } catch (e) {
      res.status(404).json({error: 'User not found'});
    }
  })
  .put(async (req, res) => {
    let userInfo = req.body;
    if (!userInfo || Object.keys(userInfo).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    try {
      req.params.id = validation.checkId(req.params.id);
      userInfo.firstName = validation.checkString(
        userInfo.firstName,
        'First Name'
      );
      userInfo.lastName = validation.checkString(
      userInfo.lastName,
      'Last Name'
      );
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      const updatedUser = await usersData.updateUserPut(
      req.params.id,
      userInfo.firstName,
      userInfo.lastName
      );
      res.json(updatedUser);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).send({error: message});
    }
  })
  .patch(async (req, res) => {
    let userInfo = req.body;
    if (!userInfo || Object.keys(userInfo).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    try {
      req.params.id = validation.checkId(req.params.id);
      if (userInfo.firstName) {
        userInfo.firstName = validation.checkString(
          userInfo.firstName,
          'First Name'
        );
      }

      if (userInfo.lastName) {
        userInfo.lastName = validation.checkString(
          userInfo.lastName,
          'Last Name'
        );
      }
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      const updatedUser = await usersData.updateUserPatch(
        req.params.id,
        userInfo
      );
      res.json(updatedUser);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).send({error: message});
    }
  })
  .delete(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id);
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      let deletedUser = await usersData.removeUser(req.params.id);
      res.json(deletedUser);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).send({error: message});
    }
  });

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