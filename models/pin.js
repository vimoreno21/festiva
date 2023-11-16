const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pinSchema = new Schema({
	email: { type: String, required: true},
	pin: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
}, {collection: 'pins'});

module.exports = mongoose.model("pin", pinSchema);