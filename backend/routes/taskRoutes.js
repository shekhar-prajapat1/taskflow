const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskAnalytics,
  setTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getTasks).post(protect, setTask);
router.route('/analytics').get(protect, getTaskAnalytics);
router.route('/:id').delete(protect, deleteTask).put(protect, updateTask);

module.exports = router;
