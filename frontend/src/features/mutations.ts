import { QueryClient, useMutation, useQueryClient } from "react-query";
import { AddStreamerType } from "../pages/Home/components/Form";
import { addStreamer, voteStreamer } from "./services";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { ErrorResponse, GenericResponse } from "./types";

export const useAddStreamer = () => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation<GenericResponse, AxiosError<ErrorResponse>, AddStreamerType, string>(
    {
      mutationFn: (formData: AddStreamerType) => addStreamer(formData),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["allStreamers"],
          exact: true,
        });
        toast.success("Streamer added succesfully");
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        if (error.response) toast.error(error.response.data.message);
        else toast.error(error.message);
      },
    }
  );
};

export const useVoteStreamer = (streamerId: number) => {
  const queryClient: QueryClient = useQueryClient();
  return useMutation<
    GenericResponse,
    AxiosError<ErrorResponse>,
    {
      sign: string;
    },
    string
  >({
    mutationKey: ["vote", streamerId],
    mutationFn: (vote: { sign: string }) => voteStreamer(vote, streamerId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allStreamers"],
        exact: true,
      });
      toast.success("Voted succesfully");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) toast.error(error.response.data.message);
      else toast.error(error.message);
    },
  });
};
