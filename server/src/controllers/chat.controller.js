const  aiService  = require("../services/ai.service");



exports.askQuestion = async (req, res) => {
    try {
        const { question } = req.body;
        console.log("REQ BODY:", req.body);
        const tenantId = "tenant1";

        const answer = await aiService.askAI(question, tenantId);

        res.json({ answer });
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: error.message })
    }
};