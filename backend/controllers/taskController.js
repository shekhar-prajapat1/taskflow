const mongoose = require('mongoose');
const Task = require('../models/taskModel');

// @desc    Get tasks with pagination, sorting & filtering
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const {
      status,
      priority,
      search,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;


    const query = { user: req.user.id };

    if (status) query.status = status;
    if (priority) query.priority = priority;

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const tasks = await Task.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(query);

    res.status(200).json({
      tasks,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });


  } catch (error) {
    next(error);
  }
};

// @desc    Get task analytics
// @route   GET /api/tasks/analytics
// @access  Private
const getTaskAnalytics = async (req, res, next) => {
  try {
    const stats = await Task.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id) // 🔥 FIXED
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          completed: {
            $sum: {
              $cond: [{ $eq: ['$status', 'Done'] }, 1, 0]
            },
          },
          pending: {
            $sum: {
              $cond: [{ $ne: ['$status', 'Done'] }, 1, 0]
            },
          },
        },
      },
    ]);


    if (stats.length === 0) {
      return res.status(200).json({
        total: 0,
        completed: 0,
        pending: 0,
        completionPercentage: 0
      });
    }

    const result = stats[0];
    const percentage =
      result.total > 0
        ? (result.completed / result.total) * 100
        : 0;

    res.status(200).json({
      total: result.total,
      completed: result.completed,
      pending: result.pending,
      completionPercentage: Math.round(percentage),
    });


  } catch (error) {
    next(error);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const setTask = async (req, res, next) => {
  try {
    if (!req.body.title) {
      res.status(400);
      throw new Error('Please add a task title');
    }


    const task = await Task.create({
      description: (req.body.description || '').replace(/```/g, ''),
      title: (req.body.title || '').replace(/```/g, ''),
      status: req.body.status || 'Pending',
      priority: req.body.priority || 'Medium',
      dueDate: req.body.dueDate || null,
      user: req.user.id,
    });

    res.status(201).json(task);


  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);


    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    if (task.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true // 🔥 added for safety
      }
    );

    res.status(200).json(updatedTask);


  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);


    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    if (task.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await task.deleteOne();

    res.status(200).json({ id: req.params.id });


  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskAnalytics,
  setTask,
  updateTask,
  deleteTask,
};
