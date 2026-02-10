const express = require("express");
const router = express.Router();

const {
  getAllRooms,
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
  addMaintenanceLog
} = require("../controllers/roomController");

router.get("/", getAllRooms);
router.post("/", createRoom);
router.get("/:id", getRoomById);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

// ✅ EMBEDDED MAINTENANCE
router.put("/:id/maintenance", addMaintenanceLog);

module.exports = router;
