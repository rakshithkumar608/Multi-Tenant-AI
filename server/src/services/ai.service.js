const axios = require("axios");


const PYTHON_API = process.env.PYTHON_API;
console.log("Python API:", PYTHON_API);

exports.askAI = async (question, tenantId) => {
    const response = await axios.post(`${PYTHON_API}/ask`, {
        question,
        tenant_id: tenantId,
    });

    return response.data.answer;
};

exports.uploadFile = async (file, tenantId) => {
    const formData = new FormData();
    formData.append("file", file.buffer, file.originalname);

    await axios.post(
        `${PYTHON_API}/upload?tenant_id=${tenantId}`,
    formData,
    {
    headers: formData.getHeaders(),
    }
    );

    await axios.post(`${PYTHON_API}/train/${tenantId}`)
}