import { FunctionComponent } from "react";
import Form from "./components/Form";
import List from "./components/List";

const Home: FunctionComponent = () => {
  return (
    <div className=" w-full h-screen flex">
      <div className=" max-w-6xl w-fit py-10 md:pt-2 m-auto md:mx-auto md:my-0 h-fit ">
        <h1 className="text-4xl font-semibold text-center pb-6 md:pb-10">
          Streamer Spotlight
        </h1>
        <p className="text-lg text-center px-60 xl:px-40 lg:px-32 pb-20 md:hidden">
          In this application, users can add their favorite streamers along with some
          relevant details. Other users can then upvote or downvote these streamers.
        </p>
        <div className="flex justify-center items-center gap-20 md:gap-10 md:flex-col">
          <Form />
          <List />
        </div>
      </div>
    </div>
  );
};

export default Home;
