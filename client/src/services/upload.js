import api from "./api";


export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return api.post("/upload", formData)
}