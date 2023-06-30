import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Streamer } from '../streamer.entity';

@Injectable()
export class StreamerService {
  constructor(
    @InjectRepository(Streamer)
    private StreamerRepository: Repository<Streamer>,
  ) {}

  async addStreamer(streamer: Streamer): Promise<Streamer> {
    const newStreamer: Streamer = await this.StreamerRepository.save(streamer);
    return newStreamer;
  }

  async getAllStreamers(): Promise<Streamer[]> {
    const streamers: Streamer[] = await this.StreamerRepository.find({
      order: { votes: 'DESC' },
    });
    return streamers;
  }

  async getStreamer(streamerId: number): Promise<Streamer> {
    const streamer: Streamer = await this.StreamerRepository.findOne({
      where: { id: streamerId },
    });
    return streamer;
  }

  async updateStreamer(
    streamerId: number,
    vote: string,
  ): Promise<UpdateResult> {
    let updatedStreamer: UpdateResult;

    if (vote === '+')
      updatedStreamer = await this.StreamerRepository.update(streamerId, {
        votes: () => 'votes + 1',
        updatedAt: new Date(),
      });
    if (vote === '-')
      updatedStreamer = await this.StreamerRepository.update(streamerId, {
        votes: () => 'votes - 1',
        updatedAt: new Date(),
      });
    return updatedStreamer;
  }

  async doesStreamerExists(streamer: Streamer): Promise<boolean> {
    const { name } = streamer;
    const existingUser: Streamer = await this.StreamerRepository.findOne({
      where: { name: name },
    });
    if (!existingUser) return false;
    return true;
  }
}
