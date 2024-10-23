import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

const PORT = 8000;

dotenv.config();

const app = express();
app.use(cors());

const invoke_url =
  "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-xl";

const api = process.env.API_KEY;
app.use(express.json());

app.post("/img-generate", async (req, res) => {
  try {
    const api_response = await axios.post(invoke_url, req.body, {
      headers: {
        Authorization: `Bearer ${api}`,
        Accept: "application/json",
      },
    });
    res.json(api_response.data);
  } catch (error) {
    console.error("Post Error: ", error.response?.data || error.message);
    res.status(500).send({ error: "API Request not successful" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is Running on: ${PORT}`);
});
