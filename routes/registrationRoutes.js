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

  // Clear existing timer if any (prevents multiple timers)
  if (partialRegistrations[id]) {
    clearTimeout(partialRegistrations[id].timer);
  }

  // Set NEW 8-minute timer
  const timer = setTimeout(async () => {
    // Check if registration still exists AND is not completed
    if (partialRegistrations[id] && !partialRegistrations[id].completed) {
      console.log(`⏰ 8 minutes timeout for registration ${id} - sending email...`);
      try {
        await sendIncompleteMail({
          registrationId: id,
          ...partialRegistrations[id].data,
          timeoutAt: new Date().toISOString()
        });
        console.log(`✅ Incomplete registration email sent for ${id}`);
      } catch (error) {
        console.log(`❌ Failed to send email for ${id}:`, error.message);
      }
      delete partialRegistrations[id];
    }
  }, 8 * 60 * 1000); // 8 minutes

  // Store registration data with timer
  partialRegistrations[id] = {
    data: {
      ...stepData,
      savedAt: new Date().toISOString()
    },
    timer: timer,
    completed: false, // Track if registration was completed
    createdAt: new Date().toISOString()
  };

  console.log(`✅ Registration step saved for ID: ${id}`);
  res.json({ registrationId: id });
});

// Complete Registration
router.post("/complete-registration", (req, res) => {
  const { registrationId, finalData } = req.body;

  if (partialRegistrations[registrationId]) {
    // Mark as completed and clear timer
    partialRegistrations[registrationId].completed = true;
    clearTimeout(partialRegistrations[registrationId].timer);
    
    // Option 1: Delete immediately (no email will be sent)
    delete partialRegistrations[registrationId];
    
    console.log(`✅ Registration ${registrationId} completed successfully`);
  }

  console.log("Final registration data:", finalData);

  res.json({ 
    success: true, 
    message: "Registration completed successfully" 
  });
});

// Optional: Get pending registrations (for monitoring)
router.get("/pending-registrations", (req, res) => {
  const pending = Object.keys(partialRegistrations).map(id => ({
    id,
    createdAt: partialRegistrations[id].createdAt,
    completed: partialRegistrations[id].completed,
    data: partialRegistrations[id].data
  }));
  
  res.json({ 
    count: pending.length, 
    registrations: pending 
  });
});

module.exports = router;