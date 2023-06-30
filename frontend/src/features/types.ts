export interface IStreamer {
  id: number;
  name: string;
  platform: string;
  description: string;
  image: string;
  votes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
