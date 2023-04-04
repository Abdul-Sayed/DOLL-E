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
    setLoading(true);
    if (form.name && form.prompt && form.photo) {
      try {
        const response = await fetch(`http://localhost:8080/api/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await response.json();

        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill out all the fields");
    }
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

  // Generate an image based on the prompt
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(`http://localhost:8080/api/dalle`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        setForm((form) => ({ ...form, photo: data.url }));
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <>
        <h1 className="font-extrabold text-4xl text-app_black">Create</h1>
        <p className="mt-2 text-app_gray text-base max-w-[500px]">
          Create imaginative and visually stunning images through DALL-E AI and share them with the
          community
        </p>
      </>

      <form onSubmit={handleSubmit} className="flex flex-col mt-12 max-w-3xl">
        <div className="flex flex-col gap-4">
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
            name="prompt"
            value={form.prompt}
            placeholder="an oil painting portrait of a capybara wearing medieval royal robes and an ornate crown on a dark background"
            handleChange={handleChange}
            isSurpriseMe={true}
            handleSurpriseMe={handleSurpriseMe}
          />
        </div>
        <div className="flex items-center justify-center justify-self-center self-center relative bg-gray-50 border-2 border-gray-300 shadow-inner ring-2 ring-gray-400 rounded-lg w-3/4 h-auto p-1 mt-10">
          {form.photo ? (
            <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
          ) : (
            <img
              src="https://cdn.britannica.com/29/72029-050-B6BFB4EC/Dolly-sheep-adult-mammal-Edinburgh-Roslin-Institute.jpg"
              alt="preview"
              className="w-full h-full object-contain opacity-50"
            />
          )}

          {generatingImg && (
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] rounded-lg">
              <Loader />
            </div>
          )}
        </div>

        <div className="flex mt-5 justify-self-center self-center">
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
