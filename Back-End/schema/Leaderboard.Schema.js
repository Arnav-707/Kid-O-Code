const mongoose = require("mongoose");
const leaderboardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    score: { type: Number, required: true },
    avatar: { type: String, required: true },
  });

module.exports = mongoose.model("leaderboard", leaderboardSchema);
