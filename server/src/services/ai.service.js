const axios = require("axios");
const FormData = require("form-data");

const PYTHON_API = "http://localhost:8000";

// ✅ ADD THIS (missing)
exports.askAI = async (question, tenantId) => {
  const response = await axios.post(`${PYTHON_API}/ask`, {
    question,
    tenant_id: tenantId,
  });

  return response.data.answer;
};

// ✅ Already correct
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
};