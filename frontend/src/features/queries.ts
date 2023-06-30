import { QueryKey, useQuery } from "react-query";
import { getAllStreamers, getStreamer } from "./services";
import { IStreamer } from "./types";

export const useGetAllStreamers = () => {
  return useQuery<IStreamer[], Error, IStreamer[], QueryKey>({
    queryKey: ["allStreamers"],
    queryFn: () => getAllStreamers(),
    refetchOnWindowFocus: false,
  });
};

export const useGetStreamer = (streamerId: number) => {
  return useQuery<IStreamer, Error, IStreamer, QueryKey>({
    queryKey: ["streamer", streamerId],
    queryFn: () => getStreamer(streamerId),
    refetchOnWindowFocus: false,
  });
};
