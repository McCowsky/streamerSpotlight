import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  streamer: {
    name: string;
    platform: string;
    description: string;
    votes: number;
    image: string;
    createdAt: string;
  };
}

const Card: FunctionComponent<CardProps> = ({ streamer }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white max-w-lg  w-[298px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-lg px-6 pb-6"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={streamer.image}
        alt="streamer photo"
        width={250}
        className="rounded-lg my-6"
      />
      <h2 className="text-2xl font-semibold">{streamer.name}</h2>
      <h2 className="text-lg pb-1">{streamer.platform}</h2>
      <p className="pb-3">{streamer.description}</p>
      <div className="flex items-center">
        <h3>{streamer.createdAt.slice(0, 10)}</h3>
        <button
          className="ml-auto bg-[#8884FF] py-1 px-3 rounded-lg hover:text-white"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Card;
