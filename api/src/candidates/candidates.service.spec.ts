import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { CandidatesService } from './candidates.service';
import { Candidate, CandidateSchema } from './schemas/candidate.schema';

describe('CandidatesService', () => {
  let service: CandidatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.DATABASE_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }),
        MongooseModule.forFeature([
          { name: Candidate.name, schema: CandidateSchema },
        ]),
      ],
      providers: [CandidatesService],
    }).compile();

    service = module.get<CandidatesService>(CandidatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an especific candidate 118172', async () => {
    const response = await service.search(['COBOL'], null, '12');
    expect(response.candidates[0].id).toEqual(118172);
  });

  it('should return an especific candidate 115789', async () => {
    const response = await service.search([], 'Campinas - SP', '12');
    expect(response.candidates[0].id).toEqual(115789);
  });

  it('should return an array of all cities of all candidates', async () => {
    const cities = await service.cities();

    expect(cities).toContain('Rio de Janeiro - RJ');
    expect(cities).toContain('Recife - PE');
    expect(cities).toContain('Curitiba - PR');
  });

  it('should return an array of all techs of all candidates', async () => {
    const techs = await service.techs();

    expect(techs).toContain('Java');
    expect(techs).toContain('Python');
    expect(techs).toContain('Java (Android)');
  });
});
