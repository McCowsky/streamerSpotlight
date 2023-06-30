import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useAddStreamer } from "../../../features/mutations";
import { UseMutationResult } from "react-query";
import { AxiosError } from "axios";
import { ErrorResponse, GenericResponse } from "../../../features/types";

const PlatformTypeSchema = z.enum(["Twitch", "YouTube", "Kick", "Rumble", "TikTok"]);

const streamerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(30, { message: "Name cannot be longer than 30 characters" }),
  platform: PlatformTypeSchema,
  description: z
    .string()
    .max(300, { message: "Description cannot be longer than 300 characters" }),
});

export type AddStreamerType = z.infer<typeof streamerSchema>;

const Form: FunctionComponent = () => {
  const {
    mutate: addStreamer,
    isLoading,
  }: UseMutationResult<
    GenericResponse,
    AxiosError<ErrorResponse>,
    AddStreamerType
  > = useAddStreamer();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddStreamerType>({
    resolver: zodResolver(streamerSchema),
  });

  const onSubmit: SubmitHandler<AddStreamerType> = (data: AddStreamerType): void => {
    addStreamer(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-4"
    >
      <input
        type="text"
        id="name"
        placeholder="Name"
        {...register("name")}
        className="rounded-lg border-[#666666] border-[1px] p-3 w-80 focus:outline-none focus:border-[#8884FF]"
      />
      {errors.name && (
        <p className="text-xs italic text-red-500">{errors.name?.message}</p>
      )}
      <select
        id="platform"
        {...register("platform")}
        className="rounded-lg border-[#666666] border-[1px] p-3 w-80 focus:outline-none focus:border-[#8884FF]"
      >
        <option value="">Choose platform</option>
        <option value="Twitch">Twitch</option>
        <option value="YouTube">YouTube</option>
        <option value="Kick">Kick</option>
        <option value="TikTok">TikTok</option>
        <option value="Rumble">Rumble</option>
      </select>
      {errors.platform && (
        <p className="text-xs italic text-red-500">{errors.platform?.message}</p>
      )}
      <textarea
        id="description"
        cols={40}
        rows={4}
        placeholder="Description"
        {...register("description")}
        className="rounded-lg border-[#666666] border-[1px] p-3 w-80 focus:outline-none focus:border-[#8884FF]"
      ></textarea>
      {errors.description && (
        <p className="text-xs italic text-red-500">{errors.description?.message}</p>
      )}
      <button className="p-3 border-[#8884FF] border-[1px] rounded-lg w-40 hover:bg-[#8884FF] hover:text-white transition-all	font-semibold">
        {(isLoading && "Adding") || "Add Streamer"}
      </button>
    </form>
  );
};

export default Form;
