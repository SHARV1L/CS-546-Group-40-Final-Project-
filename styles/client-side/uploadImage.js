import multer from 'multer';
const upload = multer({ dest: 'guest/dashboard/' }); // specify the upload directory

router.post('/guest/dashboard', upload.single('fileUpload'), async (req, res) => {
  try {
    const file = req.file; // retrieve the uploaded file information
    const userId = req.session.user.id; // retrieve the user ID from the session
    const user = await user.getUserById(req.session.userId); // retrieve the user document from the database

    // Add the file information to the user document
    user.profilePicture = {
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size
    };
    await user.updateUserPatch(userId, { profilePicture: user.profilePicture }); // save the updated user document to the database

    res.redirect('/guest/dashboard');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});