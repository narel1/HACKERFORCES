const mongoose = require("mongoose");

// Create Schema
const ProblemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    code: {
        type: String,
    },
    testcases: [{
        type: Object,
    }],
    id: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Problem", ProblemSchema);
