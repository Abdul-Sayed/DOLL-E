# Doll-E

AI image generation app using OpenAi's createImage API (DALL-E).  
Full Stack application built using React with Typescript, None.js, Express.js, MongoDB (MERN stack), Tailwind, and Cloudinary for cloud image storage

Deployment status:
[![Netlify Status](https://api.netlify.com/api/v1/badges/0508758d-6252-42ea-a6e2-a1537ba73e57/deploy-status)](https://app.netlify.com/sites/doll-e/deploys)

## Backend

Setup:

**express.js** - Creates an Express server instance. Configures the '/api/posts' and '/api/dalle' api routes. Connects to MongoDB via mongoose connect, as defined in connect.js.

Model: The shape of the data in MongoDB is defined by PostSchema defined in post.js.

Controller functions:

**postRoutes.js** - Defines GET and POST crud operations for the '/api/posts' route. The GET method returns all posts from the DB, while the POST method sends a new post to the DB. Since the openai photo url in the req.body is only active for a few hours, the url was sent to an image hosting service, Cloudinary, which provides their durable url for the photo - and that's whats stored in the DB.

**dalleRoute.js** - Defines a POST method for the '/api/dalle' api route. Uses the createImage from openai to generate an image from the prompt in req.body. Returns the image url.

## FrontEnd

**App.tsx** - Defines two navigation routes; "/" which routes to the Home page, and "/create-post", which routes to the createPost page.

**Home.tsx** - Renders the image posts as well as an input to filter them. The posts state is set in useEffect upon component mount by sending a get request to the backend '/api/posts' endpoint. The handleChange method of the input filters the posts according to the searched text. The posts are passed to the RenderCard Component to render the array of posts, and uses the File-Saver node library to allow for downloading the image.

**CreatePost.tsx** - Renders a name and a prompt input field, as well as a photo, which all tie to the component's form state. The handleChange method on the input fields updates name and prompt state. The prompt input field has a 'Surprise me' button which populates form.prompt with a random taken from an array of prompts.
A generate image button sends a post request to the backend '/api/dalle' endpoint, and updates the photo in state with the url that's returned. The handleSubmit method of the form makes a post request to '/api/posts' with the form state and navigates to the home page.
