const express = require('express');
const multer = require('multer');
const path = require('path');
const cors=require ('cors');

const app = express();
const PORT = 5000;
app.use(cors());

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname); // Save files in the same directory as this file
  },
  filename: function (req, file, cb) {
    cb(null, 'test.jpg'); // Keep the original file name
  }
});

const upload = multer({ storage: storage });

// Endpoint to handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send(`File uploaded successfully: ${req.file.filename}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});