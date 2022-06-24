const jwt = require("jsonwebtoken");

const config = require("config");
const { JWT_SECRET } = config;

function auth(req, res, next) {
    const token = req.header("x-auth-token");

    // Check for token
    if (!token)
        return res
            .status(401)
            .json({ msg: "No token found, authorization denied" });

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add user from payload
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(400).json({ msg: "Token is invalid" });
    }
}

module.exports = auth;
