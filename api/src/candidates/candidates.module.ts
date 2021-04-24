import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { Candidate, CandidateSchema } from './schemas/candidate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Candidate.name, schema: CandidateSchema },
    ]),
  ],
  providers: [CandidatesService],
  controllers: [CandidatesController],
})
export class CandidatesModule { }
