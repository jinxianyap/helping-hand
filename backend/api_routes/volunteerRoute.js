const express = require("express");
const router = express.Router();

const Volunteer = require("../models/volunteerSchema");

//@route GET /volunteers
//@desc Get All volunteers
//@access Public
router.get("/", (req, res) => {
  Volunteer.find().then((volunteers) => res.json(volunteers));
});

//@route POST /volunteers/login
//@desc Post volunteer login authentication
//@access Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Volunteer.find({ email: email })
    .then((item) => {
      if (item != null && item.length > 0 && item[0].password == password) {
          res.json({
            success: true,
            id: item[0]._id,
            type: 'volunteer'
          })
      } else {
        res.status(404).json({
          success: false,
          error: 'No combo found'
        })
      }
    })
    .catch(err =>
      res.status(404).json({
        success: false,
        error: err
      }))
})

//@route Post /volunteers
//@desc Post A volunteers
//@access Public
router.post("/", (req, res) => {
  const { name, email, phoneNumber, password } = req.body;
  const newVolunteer = new Volunteer({
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    password: password
  });
  newVolunteer
    .save()
    .then((item) => res.json(item))
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error creating Volunteer",
      })
    );
});

//@route delete /volunteers/:id
//@desc Delete A volunteers
//@access Public
router.delete("/:id", (req, res) => {
  Volunteer.findById(req.params.id)
    .then((item) => item.remove())
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
