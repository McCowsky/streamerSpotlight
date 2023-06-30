import { FunctionComponent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./components/Card";

const StreamerView: FunctionComponent = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) navigate("/");
  }, [state, navigate]);

  return (
    <div
      className="fixed left-0 top-0 w-full h-screen overflow-y-scroll bg-black/50 overflow-hidden no-scrollbar"
      onClick={() => navigate("/")}
    >
      <Card
        streamer={{
          name: state.name,
          platform: state.platform,
          description: state.description,
          votes: state.votes,
          image: state.image,
          createdAt: state.createdAt,
        }}
      />
    </div>
  );
};

export default StreamerView;
