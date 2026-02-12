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

  // Clear existing timer if any
  if (partialRegistrations[id]) {
    clearTimeout(partialRegistrations[id].timer);
  }

  // ✅ FIX: Capture the current ID value for the timer
  const currentId = id;

  // Set NEW 8-minute timer with captured ID
  const timer = setTimeout(async () => {
    // ✅ Use captured currentId instead of closure variable
    if (partialRegistrations[currentId] && !partialRegistrations[currentId].completed) {
      console.log(`⏰ 8 minutes timeout for registration ${currentId} - sending email...`);
      try {
        await sendIncompleteMail({
          registrationId: currentId,
          ...partialRegistrations[currentId].data,
          timeoutAt: new Date().toISOString()
        });
        console.log(`✅ Incomplete registration email sent for ${currentId}`);
      } catch (error) {
        console.log(`❌ Failed to send email for ${currentId}:`, error.message);
      }
      delete partialRegistrations[currentId];
    }
  }, 8 * 60 * 1000); // 8 minutes

  // Store registration data with timer
  partialRegistrations[id] = {
    data: {
      ...stepData,
      savedAt: new Date().toISOString()
    },
    timer: timer,
    completed: false,
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
    
    // Delete immediately (no email will be sent)
    delete partialRegistrations[registrationId];
    
    console.log(`✅ Registration ${registrationId} completed successfully`);
  }

  console.log("Final registration data:", finalData);

  res.json({ 
    success: true, 
    message: "Registration completed successfully" 
  });
});

// Get pending registrations (for monitoring)
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