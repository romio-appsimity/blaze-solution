const express = require('express');
const router = express.Router();
const User = require('../model/contact');
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const maxFileSize = 2 * 1024 * 1024; 

const fileFilter = (req, file, cb) => {
  if (file.size > maxFileSize) {
    return cb(new Error('File size exceeds the maximum limit (2MB).'));
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: maxFileSize },
}).single("file");

router.post('/contacts', async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(404).json({ error: 'File  exceeds the maximum size limit.' });
      }
      return res.status(500).json({ error: 'Internal server error.' });
    }

    const {
      companyName,
      firstName,
      lastName,
      address,
      city,
      province,
      postalCode,
      contactNumber,
      emailAddress,
      message,
      service,
    } = req.body;

    if (!companyName || !firstName || !lastName || !emailAddress ) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    try {
      const newUser = new User({
        companyName,
        firstName,
        lastName,
        address,
        city,
        province,
        postalCode,
        contactNumber,
        emailAddress,
        message,
        service,
        file: req.file.buffer,
        fileType: req.file.mimetype.split('/')[1],
      });

      const savedUser = await newUser.save();

      res.status(201).json({
        success: true,
        message: 'Contact submitted successfully.',
        user: savedUser,
        serverMessage: 'Thank you for contacting us. We will get back to you soon!',
      });
    } catch (error) {
      console.error('Error submitting contact:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
});

router.get("/:id/file", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    res.contentType(user.fileType);
    res.send(user.file);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;