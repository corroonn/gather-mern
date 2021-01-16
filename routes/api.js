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

  const data = req.body;
  const newTeamMember = new TeamMember(data);

  newTeamMember.save((error) => {
    if (error) {
      res.status(500).json({ msg: "Sorry, internal server errors" });
    } else {
      res.json({
        msg: "Recieved data",
      });
    }
  });
});

router.delete("/delete", (req, res) => {
  console.log("Body: ", req.body);
  res.json({
    msg: "Recieved data",
  });
});

// router.delete("/:postId", async (req, res) => {
//   try {
//     const removedpost = await Post.remove({ _id: req.params.postId });
//     res.json(removedpost);
//   } catch (err) {
//     rest.json({ message: err });
//   }
// });

module.exports = router;
