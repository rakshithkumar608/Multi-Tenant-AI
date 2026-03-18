const aiService = require("../services/ai.service");

exports.upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const tenantId = req.user.tenantId; // ✅ real tenant

    await aiService.uploadFile(req.file, tenantId);

    res.json({
      success: true,
      message: "Uploaded & trained ✅",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};