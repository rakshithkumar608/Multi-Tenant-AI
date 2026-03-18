const Tenant = require("../models/Tenant");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const { email, password, companyName } = req.body;

        const tenant = await Tenant.create({ name: companyName });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            tenantId: tenant._id,
        });

        const token = jwt.sign({
  userId: user._id,
  tenantId: user.tenantId
}, process.env.JWT_SECRET);

        res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" })
    }
};

exports.login = async (req, res) => {
    console.log("GENERATING TOKEN WITH tenantId");
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({
            error: "User not found"
        })

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({
            error: "Invalid Password!"
        })

        const token = jwt.sign(
            { userId: user._id, tenantId: user.tenantId},
            process.env.JWT_SECRET
        );
        console.log("NEW TOKEN:", token);
        
        res.json({ token })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

