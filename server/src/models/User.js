const mongoose  = require("mongoose");


const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
    },
});

module.exports = mongoose.model("User", userSchema)
