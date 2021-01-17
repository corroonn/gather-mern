const express = require("express");
const TeamMember = require("../models/teamMembers");
const router = express.Router();

//Routes
router.get("/", async (req, res) => {
  await TeamMember.find({})
    .then((data) => {
      // console.log("Data: ", data);
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

//Delete

router.delete("/:postId", async (req, res) => {
  console.log("Params: ", req.params.postId);
  const data = req.params.postId;
  console.log(data);

  try {
    const removedMember = await TeamMember.remove({ _id: data });
    res.json(removedMember);
  } catch {
    console.log("no dice");
  }
});

module.exports = router;
