import { Module } from '@nestjs/common';
import { StreamerService } from './service/streamer.service';
import { StreamerController } from './controller/streamer.controller';
import { Streamer } from './streamer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Streamer])],
  providers: [StreamerService],
  controllers: [StreamerController],
})
export class StreamerModule {}
