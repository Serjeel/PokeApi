export { }
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String },
    favorites: { type: Array }
});
let User = {}

module.exports = User = mongoose.model("users", userSchema);