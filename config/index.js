const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    MONGO_DB_SECRET: process.env.MONGO_DB_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    COMPILER_API: process.env.COMPILER_API,
    COMPILER_ACCESS_TOKEN: process.env.COMPILER_ACCESS_TOKEN,
    PROBLEM_API: process.env.PROBLEM_API,
    PROBLEM_ACCESS_TOKEN: process.env.PROBLEM_ACCESS_TOKEN,
};
