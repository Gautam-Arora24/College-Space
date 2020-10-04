var express = require("express");
var router = express.Router();
var Teacher = require("../Schemas/teacher");
var Notes = require("../Schemas/notes");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var formidable = require("formidable");
var _ = require("lodash");
var fs = require("fs");
var requireLogin = require("../Authorization/requireLogin");

// SIGNUP A USER AND ADD IT TO THE DATABASE
router.post(
  "/signup",
  [
    body("name", "Kindly provide us a name").not().isEmpty(),
    body("emailID", "Kindly provide us an appropriate email address").isEmail(),
    body("branch", "Kindly provide your branch").not().isEmpty(),
    body(
      "password",
      "Kindly enter a password that is 6 characters long"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    var teacher = new Teacher(req.body);
    // HASHING THE PASSWORD
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(teacher.password, salt);
    // USING HASHED PASSWORD FOR DATABASE
    teacher.password = hash;

    // SAVING THE TEACHER TO THE DATABASE
    teacher.save((err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          err: "NOT able to save the teacher to the database",
        });
      }
      res.json({
        name: teacher.name,
        email: teacher.emailID,
        branch: teacher.branch,
        _id: teacher._id,
      });
    });
  }
);

// SIGNIN A USER AND GET A TOKEN
router.post(
  "/signin",
  [
    body("emailID", "Kindly provide us an appropriate email address").isEmail(),
    body("password", "Kindly provide us a password").isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    const { emailID, password } = req.body;
    Teacher.findOne({ emailID }, function (err, teacher) {
      if (!teacher) {
        return res.status(400).json({
          err: "Email ID does not exist",
        });
      }
      bcrypt
        .compare(password, teacher.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(400).json({
              err: "Email and Password does not match",
            });
          } else {
            const token = jwt.sign(
              {
                _id: teacher._id,
                expiresIn: 360000,
              },

              "sh"
            );
            return res.json({
              token,
              teacher,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
);

// GET DETAILS OF A TEACHER USING NAME
router.post("/details", (req, res) => {
  Teacher.find({ name: req.body.name })
    .then((teacher) => {
      return res.json({
        teacher,
      });
    })
    .catch((err) => {
      return res.json({ err });
    });
});

// ADD A ANNOUNCEMENTS
router.post("/announcements", requireLogin, (req, res) => {
  Teacher.findByIdAndUpdate(
    req.teacher._id,
    {
      $push: {
        announcements:
          req.body.announcements == "" ? undefined : req.body.announcements,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((teacher) => {
      return res.json({
        teacher,
      });
    })
    .catch((err) => {
      return res.json({ err });
    });
});

// DELETE AN ANNOUNCEMENT
router.post("/announcements/delete", requireLogin, (req, res) => {
  Teacher.findById(req.teacher._id)
    .then((teacher) => {
      teacher.announcements.pop();
      teacher
        .save()
        .then((teacher) => {
          return res.json({ announcements: teacher.announcements });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);

      return res.json({ err });
    });
});

// ADD NOTES TO THE DATABASE
router.post("/addNotes", requireLogin, (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors });
  // }
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    let notes = new Notes(fields);
    console.log(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 10000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      notes.photo.data = fs.readFileSync(file.photo.path);
      notes.photo.contentType = file.photo.type;
    }

    //save to the DB
    notes.save((err, notes) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          error: "Saving notes in DB failed",
        });
      }
      res.json(notes);
    });
  });
});

// GET ALL THE PHOTOS FROM A PARTICULAR OBJECTID
router.post("/getphoto", (req, res) => {
  Notes.find({
    subject: req.body.subject,
  }).then((note) => {
    console.log(note);
    return res.json(note);
  });
});

module.exports = router;
