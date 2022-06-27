const asyncHandler = require("express-async-handler");
// @desc Get goals
// @route GET /api/goals
// @accsess Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get goals" });
});
// @desc Set goals
// @route POST /api/goals
// @accsess Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({ message: "Set goal" });
});
// @desc Update goals
// @route PUT /api/goals
// @accsess Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update goals" });
});
// @desc Delete goals
// @route DELETE /api/goals
// @accsess Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete goals" });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
