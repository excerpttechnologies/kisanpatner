const express = require("express");
const router = express.Router();
const sendIncompleteMail = require("../services/mailService");

const partialRegistrations = {}; // RAM storage

// Save Step
router.post("/save-step", (req, res) => {
  const { registrationId, stepData } = req.body;

  let id = registrationId;

  if (!id) {
    id = Date.now().toString();
  }

  if (partialRegistrations[id]) {
    partialRegistrations[id].data = {
      ...partialRegistrations[id].data,
      ...stepData,
    };
  } else {
    const timer = setTimeout(async () => {
      if (partialRegistrations[id]) {
        await sendIncompleteMail(partialRegistrations[id].data);
        delete partialRegistrations[id];
      }
    }, 8 * 60 * 1000); // 8 minutes

    partialRegistrations[id] = {
      data: stepData,
      timer,
    };
  }

  res.json({ registrationId: id });
});

// Complete Registration
router.post("/complete-registration", (req, res) => {
  const { registrationId, finalData } = req.body;

  if (partialRegistrations[registrationId]) {
    clearTimeout(partialRegistrations[registrationId].timer);
    delete partialRegistrations[registrationId];
  }

  console.log("Final registration saved:", finalData);

  res.json({ message: "Registration completed successfully" });
});

module.exports = router;
