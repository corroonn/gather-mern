const express = require("express");
const TeamMember = require("../models/teamMembers");
const router = express.Router();

//Routes
router.get("/", (req, res) => {
  TeamMember.find({})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

router.post("/save", (req, res) => {
  console.log("Body: ", req.body);
  res.json({
    msg: "Recieved data",
  });
});

module.exports = router;
