import { AxiosResponse } from "axios";
import { AddStreamerType } from "../pages/Home/components/Form";
import axiosClient from "../features/axios";
import { GenericResponse, IStreamer } from "./types";

export const getStreamer = async (streamerId: number) => {
  const res: AxiosResponse<IStreamer> = await axiosClient.get(
    `/streamer/streamer/${streamerId}`
  );
  return res.data;
};

export const getAllStreamers = async () => {
  const res: AxiosResponse<IStreamer[]> = await axiosClient.get("/streamer/streamers");
  return res.data;
};

export const addStreamer = async (streamer: AddStreamerType) => {
  const res: AxiosResponse<GenericResponse> = await axiosClient.post<GenericResponse>(
    "/streamer/streamers",
    streamer
  );
  return res.data;
};

export const voteStreamer = async (vote: { sign: string }, streamerId: number) => {
  const res: AxiosResponse<GenericResponse> = await axiosClient.put<GenericResponse>(
    `/streamer/streamers/${streamerId}/vote`,
    vote
  );
  return res.data;
};
