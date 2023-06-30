import { FunctionComponent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ErrorResponse, GenericResponse, IStreamer } from "../../../features/types";
import { useVoteStreamer } from "../../../features/mutations";
import { AxiosError } from "axios";
import { UseMutationResult } from "react-query";

interface ListItemProps {
  streamer: IStreamer;
}

const ListItem: FunctionComponent<ListItemProps> = ({ streamer }) => {
  const [useStreamerId, setStreamerId] = useState<number>(-1);
  const location = useLocation();
  const {
    mutate: voteStreamer,
  }: UseMutationResult<
    GenericResponse,
    AxiosError<ErrorResponse>,
    { sign: string }
  > = useVoteStreamer(useStreamerId);

  const vote = async (sign: string, streamerId: number): Promise<void> => {
    await setStreamerId(streamerId);
    voteStreamer({ sign: sign });
  };

  return (
    <div
      key={streamer.id}
      className="w-[275px] py-2 px-3 bg-[#8884FF]/25 transition-all rounded-xl"
    >
      <div className="flex gap-3 text-xl ">
        <Link
          to="/streamerModal"
          state={{
            previousLocation: location,
            id: streamer.id,
            name: streamer.name,
            description: streamer.description,
            platform: streamer.platform,
            image: streamer.image,
            createdAt: streamer.createdAt,
          }}
          className="hover:text-[#8884FF] font-semibold"
        >
          {streamer.name}
        </Link>
        <div className="flex ml-auto gap-2">
          <button
            className="text-xl font-bold hover:text-[#8884FF] "
            onClick={() => {
              vote("-", streamer.id);
            }}
          >
            -
          </button>
          <h3 className="font-bold">{streamer.votes}</h3>
          <button
            className="text-xl font-bold hover:text-[#8884FF] "
            onClick={() => {
              vote("+", streamer.id);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
