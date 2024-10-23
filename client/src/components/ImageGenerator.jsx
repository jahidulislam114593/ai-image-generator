import { useState } from "react";
import axios from "axios";
import img1 from "../assets/image1.jpg";

const ImageGenerator = () => {
  const [text, setText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [image, setImage] = useState(null);

  const Url = "http://localhost:8000/img-generate";

  const generateImage = async () => {
    const payload = {
      text_prompts: [
        {
          text: text,
          weight: 1,
        },
        {
          text: "",
          weight: -1,
        },
      ],
      cfg_scale: 5,
      sampler: "K_EULER_ANCESTRAL",
      seed: 0,
      steps: 25,
    };

    try {
      setGenerating(true);
      setImage(null);
      const res = await axios.post(Url, payload);

      const imageData = res.data.artifacts[0].base64;
      setImage(`data:image/jpeg;base64,${imageData}`);
      setGenerating(false);
    } catch (error) {
      console.log("this is error: ", error);
      setGenerating(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-md flex w-10/12 h-3/4">
        <div className="flex-1 p-4">
          <div className="text-and-cat flex items-center space-x-4">
            <h2 className="text-xl font-bold mb-4">Enter Your Prompt</h2>
          </div>
          <textarea
            className="w-full h-full p-3 border-2 border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your image prompt here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <button
            onClick={generateImage}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={generating}
          >
            {generating ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="flex-1 p-4">
          <h2 className="text-xl font-bold mb-4">Generated Image</h2>
          <div className="flex justify-center items-center w-full h-full border-2 border-gray-300 rounded-md overflow-hidden">
            <img
              src={image ? image : img1}
              alt="Generated"
              className="max-w-full max-h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
