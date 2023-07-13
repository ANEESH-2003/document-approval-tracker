const express = require('express');
const docsControllers = require('../controllers/documentController');
const usersControllers = require('../controllers/usersControllers');
const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".pdf") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }

    cb(null, true);
  }
});

const router = express.Router();

router.post('/upload', usersControllers.isAuthenticated, upload.single("document"), docsControllers.upload);

router.post('/approve', usersControllers.isAuthenticated, upload.single("document"), docsControllers.approve);

router.get('/', usersControllers.isAuthenticated, docsControllers.myDocs);

module.exports = router;