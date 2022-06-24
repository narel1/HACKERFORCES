const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const config = require("config");

const { JWT_SECRET } = config;

module.exports = {
    createUser(req, res) {
        const { email, password, isAdmin } = req.body;
        const newUser = new User({ email, password, isAdmin });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then((user) => {
                        jwt.sign(
                            { id: user.id },
                            JWT_SECRET,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) throw err;
                                return res.json({
                                    token,
                                    user: { id: user.id, email: user.email },
                                });
                            }
                        );
                    })
                    .catch((err) => res.status(400).json(err));
            });
        });
    },

    authUser(req, res) {
        const { email, password, isAdmin } = req.body;

        // Check if the user exists.
        User.findOne({ email, isAdmin })
            .then((user) => {
                if (!user)
                    return res.status(400).json({ msg: "User doesn't exist" });

                // Validate password
                bcrypt.compare(password, user.password).then((isMatch) => {
                    if (!isMatch)
                        return res
                            .status(400)
                            .json({ msg: "Invalid credentials" });

                    jwt.sign(
                        { id: user.id },
                        JWT_SECRET,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            return res.json({
                                token,
                                user: { id: user.id, email: user.email },
                            });
                        }
                    );
                });
            })
            .catch((err) => res.status(400).json(err));
    },
};
