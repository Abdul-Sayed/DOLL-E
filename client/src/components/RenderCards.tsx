import { CardType } from "../types";
import Card from "./Card";

const RenderCards = ({ posts, title }: CardType) => {
  if (posts?.length > 0) {
    return (
      <>
        {posts.map((post) => (
          <div key={post._id}>
            <Card post={post} />
          </div>
        ))}
      </>
    );
  }
  return <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>;
};

export default RenderCards;
