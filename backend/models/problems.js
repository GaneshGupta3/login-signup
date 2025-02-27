const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
    problemStatement: {
        type: String,
        required: true,
        trim: true, // Removes leading/trailing spaces
    },
    tags:[{
        type:String,
        required: true,
    }],
    difficulty:{
        type:String,
        required: true,
    },
    githubLink: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+$/i.test(v);
            },
            message: "Invalid GitHub link!",
        },
    },
    goodies: {
        type: String,
        default: "No goodies", // Default message if empty
    },
    attempters: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Refers to User model
                required: true,
            },
            solved: {
                type: Boolean,
                default: false, // Default: Not solved
            },
            attemptedAt: {
                type: Date,
                default: Date.now, // Stores attempt time
            },
        },
    ],
    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the user who issued the problem
        required: true, // Ensures every problem has an issuer
    },
    deadline: {
        type: Date,
        required: true, // Ensures the problem has a deadline
    },
    solved: {
        type: Boolean,
        default: false,
        index: true, // Optimizes queries for solved problems
    },
}, { timestamps: true }); // Adds createdAt and updatedAt

const Problem = mongoose.model("Problem", ProblemSchema);

module.exports = Problem;
