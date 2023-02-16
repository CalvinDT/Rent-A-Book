const User = require("../../models/user");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

// validates an existing user and logs them in
router.post("/", async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) return res.send(400).send("Invalid email or password")
        console.log(user);
        // valid password, plan text password the user enters compared to hashed password, returns a boolean
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        //if password is invalid sent bad request back to client/ user
        if(!validPassword)
        return res.status(400).send("Invalid email or password");
        //generate authorization token from schema method in user.js
        const token = user.generateAuthToken();
        res.header("x-auth-token", token).json(
            {
                success: true,
                data: {
                    _id: user._id,
                    token: token
                },
                message: "Successfully authenticated user."
            }
        );
    } catch (error) {
        res.json(error)
    }
})

module.exports = router;