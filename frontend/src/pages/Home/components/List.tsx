import { FunctionComponent } from "react";
import { UseQueryResult } from "react-query";
import { useGetAllStreamers } from "../../../features/queries";
import { IStreamer } from "../../../features/types";
import ListItem from "./ListItem";

const List: FunctionComponent = () => {
  const { data, isError, isLoading, error }: UseQueryResult<IStreamer[], Error> =
    useGetAllStreamers();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <pre>{JSON.stringify(error.message)}</pre>;

  return (
    <div className="flex flex-col gap-3 justify-center items-center ">
      <h2>Click on stramer name to show more info</h2>
      <div className=" flex flex-col max-h-72 overflow-auto gap-3">
        {data?.map((streamer) => {
          return <ListItem key={streamer.id} streamer={streamer} />;
        })}
      </div>
    </div>
  );
};

export default List;
