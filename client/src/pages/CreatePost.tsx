import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
import { preview } from "../assets";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Submit the form
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the form state
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  const handleSurpriseMe = () => {
    // Grab a new random prompt suggestion
    setForm((form) => ({ ...form, prompt: getRandomPrompt(form.prompt) }));
  };

  const generateImage = () => {
    // Generate an image based on the prompt
    setGeneratingImg(true);
  };

  return (
    <section className="max-w-7xl mx-auto">
      <>
        <h1 className="font-extrabold text-[32px] text-app_black">Create</h1>
        <p className="mt-2 text-app_gray text-[16px] max-w-[500px]">
          Create imaginative and visually stunning images through DALL-E AI and share them with the
          community
        </p>
      </>

      <form onSubmit={handleSubmit} className="mt-16 max-w-3xl">
        <div className="flex flex-col gap-5">
          <FormField
            type="text"
            labelName="Your name"
            name="name"
            value={form.name}
            placeholder="Enter your name"
            handleChange={handleChange}
          />
          <FormField
            type="text"
            labelName="Prompt"
            name="name"
            value={form.prompt}
            placeholder="an oil painting portrait of a capybara wearing medieval royal robes and an ornate crown on a dark background"
            handleChange={handleChange}
            isSurpriseMe={true}
            handleSurpriseMe={handleSurpriseMe}
          />
        </div>
        <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex-justify-center items-center">
          {form.photo ? (
            <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
          ) : (
            <img src={preview} alt={preview} className="w-9/12 h-9/12 object-contain opacity-40" />
          )}

          {generatingImg && (
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] rounded-lg">
              <Loader />
            </div>
          )}
        </div>
        <div className="flex gap-5 mt-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate Image"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image you want, you can share it with others in the community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
