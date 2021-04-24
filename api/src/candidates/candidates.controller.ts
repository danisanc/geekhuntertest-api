import { Controller, Get, Query } from '@nestjs/common';
import { CandidatesService } from './candidates.service';

@Controller('candidates')
export class CandidatesController {
  constructor(private candidatesService: CandidatesService) { }

  @Get('search')
  search(@Query() query: any) {
    const { techs, city, exp } = query;

    const searchTechs = typeof techs == 'string' ? techs.split(',') : [];
    const searchCity = typeof city == 'string' ? city : null;
    const searchExp = typeof exp == 'string' ? exp : null;

    return this.candidatesService.search(searchTechs, searchCity, searchExp);
  }

  @Get('cities')
  cities() {
    return this.candidatesService.cities();
  }

  @Get('techs')
  techs() {
    return this.candidatesService.techs();
  }
}
