const express = require("express");
const router = express.Router();

const {protect, authorize} = require('../middleware/authMiddleware');

// routes defined below using controller functions

const {
  getAllRooms,
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
  addMaintenanceLog
} = require("../controllers/roomController");

// protect and authorize middleware applied to sensitive routes below

router.get("/", getAllRooms);

// only authenticated admins or managers can create rooms
router.post("/", protect, authorize('admin', 'manager'), createRoom);

router.get("/:id", getRoomById);

// updates and deletions also restricted to admins or managers
router.put("/:id", protect, authorize('admin', 'manager'), updateRoom);
router.delete("/:id", protect, authorize('admin', 'manager'), deleteRoom);

// ✅ EMBEDDED MAINTENANCE (requires authentication but any logged-in user)
router.put("/:id/maintenance", protect, addMaintenanceLog);

module.exports = router;
