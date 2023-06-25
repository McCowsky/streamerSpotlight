import { Module } from '@nestjs/common';
import { StreamerModule } from './streamer/streamer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    StreamerModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'streamerDB',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
