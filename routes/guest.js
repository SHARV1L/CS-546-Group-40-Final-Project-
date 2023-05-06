import { Router } from 'express';
const router = Router();
import { usersData } from '../data/index.js';
import validation from '../validation.js';
import { ObjectId } from 'mongodb';
//import {exportedFunctions} from '../data/users.js';
import multer from 'multer';
import path from 'path';

router
  .route('/')
  .get(async (req, res) => {
    try {
      console.log('in guest 12');
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
        .json({ error: 'There are no fields in the request body' });
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
      userInfo.email = validation.checkValidEmail(userInfo.email, "email");
      userInfo.password = validation.checkValidPassword(userInfo.password, "passwd");
      userInfo.phoneNumber = validation.checkValidPhone(userInfo.phoneNumber, "phone");
      userInfo.accountType = validation.checkString(userInfo.accountType, "accountType");

    } catch (e) {
      return res.status(400).json({ error: e });
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
  .route('/dashboard')
  .get(async (req, res) => {
    try {
      // const userCollection = await guest();
      console.log("in guest dash");
      res.render('components/guestHomepage', { title: 'Guest Dashboard Page', user: req.session.user });
    } catch (error) {
      res.status(400).json({ error: 'could not find the user, try again' })
    }
  })
  .post(async (req, res) => {
    try {
      let { selected_option } = req.body;
      if (selected_option == "user_personal") {
        res.redirect('/guest/personal');
      }
      else if (selected_option == "past_bookings") {
        res.redirect('/guest/past_bookings');
      }
      else if (selected_option == "upcoming_bookings") {
        res.redirect('/guest/upcoming_bookings');
      }
      else if (selected_option == "search") {
        res.redirect('/search');
      }
    }
    catch (error) {
      res.status(400).json({ error: 'could not find the user, try again' })
    }
  })

router
  .route('/dashboard/upload')
  .get(async (req, res) => {
    try {
      // const userCollection = await guest();
      console.log("in guest dash upload");
      res.render('components/guestHomepage', { title: 'Guest Dashboard Page' });
    } catch (error) {
      res.status(400).json({ error: 'could not find the user, try again' })
    }
  })
  .post(async (req, res) => {
    // Image upload 
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        console.log(file);
        cb(null, '../assests/Images');
      },
      filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
      }
    })
    const imageUpload = multer({ storage: storage });
    imageUpload.single("image");
    res.send("Image uploaded");
  });

router.route('/personal').get(async (req, res) => {
  res.render('components/personal-details', { title: 'Personal Details', user: req.session.user });
}).post(async (req, res) => {
  console.log("req.body:", req.body);
  //define logic to update the user details
});

router.route('/past_bookings').get(async (req, res) => {
  //fetch data from db for list of past bookings for current user
  res.render('components/pastBookings', { title: 'Past Bookings', user: req.session.user, bookings: [] });
}).post(async (req, res) => {
  console.log("req.body:", req.body);
  //define logic to update the user details
});

router.route('/upcoming_bookings').get(async (req, res) => {
  //fetch data from db for list of past bookings for current user
  res.render('components/upcomingBookings', { title: 'Upcoming Bookings', user: req.session.user, bookings: [] });
}).post(async (req, res) => {
  console.log("req.body:", req.body);
  //define logic to update the user details
});



//   router
//   .route('/:id') ////////// commented lines for checking the code, should be uncommented later
//   .get(async (req, res) => {
//     // try {
//     //   req.params.id = validation.checkId(req.params.id, 'ID URL Param');
//     // } catch (e) {
//     //   return res.status(400).json({error: e});
//     // }
//     try {
//       // let user = await usersData.getUserById(req.params.id);
//       //res.json(user).render('components/guestHomepage', {title: 'Guest Homepage'});
//       res.render('components/guestHomepage', {title: 'Guest Homepage'});
//     } catch (e) {
//       res.status(404).json({error: 'User not found'});
//     }
//   })
//   .put(async (req, res) => {
//     let userInfo = req.body;
//     if (!userInfo || Object.keys(userInfo).length === 0) {
//       return res
//         .status(400)
//         .json({error: 'There are no fields in the request body'});
//     }
//     try {
//       req.params.id = validation.checkId(req.params.id);
//       userInfo.firstName = validation.checkString(
//         userInfo.firstName,
//         'First Name'
//       );
//       userInfo.lastName = validation.checkString(
//       userInfo.lastName,
//       'Last Name'
//       );
//     } catch (e) {
//       return res.status(400).json({error: e});
//     }

//     try {
//       const updatedUser = await usersData.updateUserPut(
//       req.params.id,
//       userInfo.firstName,
//       userInfo.lastName
//       );
//       res.json(updatedUser);
//     } catch (e) {
//       let status = e[0] ? e[0] : 500;
//       let message = e[1] ? e[1] : 'Internal Server Error';
//       res.status(status).send({error: message});
//     }
//   })
//   .patch(async (req, res) => {
//     let userInfo = req.body;
//     if (!userInfo || Object.keys(userInfo).length === 0) {
//       return res
//         .status(400)
//         .json({error: 'There are no fields in the request body'});
//     }
//     try {
//       req.params.id = validation.checkId(req.params.id);
//       if (userInfo.firstName) {
//         userInfo.firstName = validation.checkString(
//           userInfo.firstName,
//           'First Name'
//         );
//       }

//       if (userInfo.lastName) {
//         userInfo.lastName = validation.checkString(
//           userInfo.lastName,
//           'Last Name'
//         );
//       }
//     } catch (e) {
//       return res.status(400).json({error: e});
//     }

//     try {
//       const updatedUser = await usersData.updateUserPatch(
//         req.params.id,
//         userInfo
//       );
//       res.json(updatedUser);
//     } catch (e) {
//       let status = e[0] ? e[0] : 500;
//       let message = e[1] ? e[1] : 'Internal Server Error';
//       res.status(status).send({error: message});
//     }
//   })
//   .delete(async (req, res) => {
//     try {
//       req.params.id = validation.checkId(req.params.id);
//     } catch (e) {
//       return res.status(400).json({error: e});
//     }

//     try {
//       let deletedUser = await usersData.removeUser(req.params.id);
//       res.json(deletedUser);
//     } catch (e) {
//       let status = e[0] ? e[0] : 500;
//       let message = e[1] ? e[1] : 'Internal Server Error';
//       res.status(status).send({error: message});
//     }
//   });

// // http://localhost:3000/
// router.route('/user-id').get(async (req, res) => {
//   //code here for GET
//   try {
//     res.render('users', {title: 'User Overview Page'});
//   } catch (error) {
//     res.status(400).json({error: e});
//   }
// });



export default router;