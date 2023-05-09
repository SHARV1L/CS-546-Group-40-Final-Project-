import {Router} from 'express';
const router = Router();
import {usersData} from '../data/index.js';
import validation from '../validation.js';
import { ObjectId } from 'mongodb';
import bookingData from '../data/bookings.js';
import multer from 'multer';
import fs from 'fs/promises';
import multiparty from 'multiparty';

// Create a storage engine
const storage = (userId) => {
  const userFolder = `uploads/${userId}`;
  // create the user folder if it doesn't exist
  fs.mkdir(userFolder, { recursive: true }).catch((error) => {
    console.log(error);
  });

  const writeStream = fs.createWriteStream((file) => {
    return `${userFolder}/${file.originalFilename}`;
  });

  const partHandler = (chunk) => {
    writeStream.write(chunk);
  };

  return { writeStream, partHandler };
};

// Initialize multer upload object with the storage engine
const upload = multer();

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
  .route('/dashboard')
  .get(async (req,res) => {
    try {
    // const userCollection = await guest();
    const user = req.session.user;
    const profilePictureBase64 = user.profilePicture ? user.profilePicture.toString('base64') : null;
    console.log("in guest dash");
    res.render('components/guestHomepage',{title: 'Guest Dashboard Page',user: req.session.user});
    } catch(error) {
      res.status(400).json({error: 'could not find the user, try again'})
    }
  })
  .post(async(req,res)=>{
    try{
      let {selected_option}=req.body;

       if(selected_option=="user_personal"){
         res.redirect('/guest/personal');
       }
       else if(selected_option=="bookings")
       {
        res.redirect('/guest/bookings');
       }
      
      else if(selected_option=="search")
      {
        res.redirect('/search');
      }
    }
    catch(error){
      console.log(error);
      res.status(400).json({error: 'could not find the user, try again'})
    }
  })




  // .post(upload('image'), async (req, res) => {
  //   try {
  //     const files = req.files;
  //     if (files) {
  //       const userId = req.session.user._id;
  //       const user = await usersData.getUserById(userId);

  //       const { writeStream, partHandler } = storage(user._id);
  //       for (const file of files) {
  //         if (
  //           file.mimetype === 'image/jpeg' ||
  //           file.mimetype === 'image/jpg'  ||
  //           file.mimetype === 'image/png' ||
  //           file.mimetype === 'image/gif'
  //         ) {
  //           const { filename, size } = file;
  //           const readStream = fs.createReadStream(file.path);
  //           readStream.pipe(partHandler(filename, size));
  //         } else {
  //           await fs.unlink(file.path);
  //         }
  //       }

  //       const profilePicture = {
  //         filename: files.filename,
  //         mimetype: files.mimetype,
  //         size: files.size,
  //       };

  //       await usersData.updateUserPatch(userId, { profilePicture });

  //       // Update the user object in the session
  //       req.session.user.profilePicture = profilePicture;

  //       // Remove the uploaded files from the server
  //       for (const file of files) {
  //         await fs.unlink(file.path);
  //       }
  //     }

  //     let { selected_option } = req.body;

  //     if (selected_option == "user_personal") {
  //       res.redirect('/guest/personal');
  //     } else if (selected_option == "bookings") {
  //       res.redirect('/guest/bookings');
  //     } else if (selected_option == "search") {
  //       res.redirect('/search');
  //     } else {
  //       res.redirect('/guest/dashboard');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).json({ error: 'could not find the user, try again' });
  //   }
  // });


  
  

  

  router
  .route('/personal')
  .get(async(req,res)=>{
    res.render('components/personal-details',{title:'Personal Details',user:req.session.user});
  })
  .post(async(req,res)=>{
    console.log("req.body:",req.body);
    //define logic to update the user details
  });

  router
  .route('/bookings')
  .get(async(req,res)=>{
    //fetch data from db for list of past bookings for current user
    let bookings = await bookingData.getBookingsByUserId(req.session.user.id);
    console.log(bookings);
    res.render('components/pastBookings', {title:'Guest Bookings', user: req.session.user,bookings:bookings});
  }).
  post(async(req,res)=>{
    console.log("req.body:",req.body);
    //define logic to update the user details
  });


  // // Render the upload form
  // router
  // .get('/upload', (req, res) => {
  //   res.render('upload', { title: 'Upload Image' });
  // })
  // // Handle file upload
  // .post('/upload', upload.single('image'), async (req, res) => {
  //   try {
  //     const file = req.file; // retrieve the uploaded file information
  //     const userId = req.session.user._id; // retrieve the user ID from the session
  //     const userObj = await user.getUserById(userId); // retrieve the user document from the database
  
  //     // Add the file information to the user document
  //     userObj.profilePicture = {
  //       filename: file.filename,
  //       mimetype: file.mimetype,
  //       size: file.size,
  //       data: await fs.readFile(file.path)
  //   };
  //   await user.updateUserPatch(userId, { profilePicture: userObj.profilePicture }); // save the updated user document to the database

  //   // remove the uploaded file from the server
  //   await fs.unlink(file.path);
    
  //   res.redirect('/guest/dashboard');
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ error: 'Error uploading file' });
  // }
//});
  
  

  

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