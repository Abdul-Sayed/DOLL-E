import { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../components";

const Home = () => {
  const [posts, setPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <section className="max-w-7xl mx-auto">
      <div className="">
        <h1 className="font-extrabold text-[32px] text-[#222328]"></h1>
      </div>
    </section>
  );
};

export default Home;
