import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  Param,
  NotFoundException,
  Put,
  ConflictException,
} from '@nestjs/common';
import { Response } from 'express';

import { StreamerService } from '../service/streamer.service';
import { Streamer } from '../streamer.entity';
import { UpdateResult } from 'typeorm';

@Controller('streamer')
export class StreamerController {
  constructor(private streamerService: StreamerService) {}

  @Post('/streamers')
  async addStreamer(@Res() response: Response, @Body() streamer: Streamer) {
    if (await this.streamerService.doesStreamerExists(streamer))
      throw new ConflictException('Streamer already exists');

    const newStreamer: Streamer = await this.streamerService.addStreamer(
      streamer,
    );
    return response.status(HttpStatus.OK).json({
      message: 'Streamer added succesfully',
      newStreamer,
    });
  }

  @Get('/streamers')
  async getAllStreamers(@Res() response: Response) {
    const streamers: Streamer[] = await this.streamerService.getAllStreamers();
    return response.status(HttpStatus.OK).json(streamers);
  }

  @Get('/streamer/:streamerId')
  async getStreamer(
    @Res() response: Response,
    @Param('streamerId') streamerId: number,
  ) {
    const streamer: Streamer = await this.streamerService.getStreamer(
      streamerId,
    );
    if (!streamer) throw new NotFoundException('Streamer does not exists');

    return response.status(HttpStatus.OK).json(streamer);
  }

  @Put('/streamers/:streamerId/vote')
  async updateStreamer(
    @Res() response: Response,
    @Param('streamerId') streamerId: number,
    @Body() vote: { sign: string },
  ) {
    const streamer: Streamer = await this.streamerService.getStreamer(
      streamerId,
    );
    if (!streamer) throw new NotFoundException('Streamer does not exists');

    const updatedStreamer: UpdateResult =
      await this.streamerService.updateStreamer(streamerId, vote.sign);
    return response.status(HttpStatus.OK).json({
      message: 'Your vote has been submitted',
      updatedStreamer,
    });
  }
}
