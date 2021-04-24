import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CandidatesModule } from './candidates/candidates.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    CandidatesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
