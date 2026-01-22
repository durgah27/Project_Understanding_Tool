import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

export const uploadFiles = async (files) => {
  const formData = new FormData();
  files.forEach((f) => formData.append("files", f));

  const res = await API.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const askQuestion = async (question) => {
  const res = await API.post("/ask", { question });
  return res.data;
};

export const generateDoc = async (task) => {
  const res = await API.post("/generate", { task });
  return res.data;
};
