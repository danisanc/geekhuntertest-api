import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Candidate, CandidateDocument } from './schemas/candidate.schema';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectModel(Candidate.name)
    private candidateModel: Model<CandidateDocument>,
  ) { }

  async search(
    searchTechs: string[],
    searchCity: string,
    searchExp: string,
  ): Promise<any> {
    const filter = [];

    // Filter by city
    if (searchCity) filter.push({ $match: { city: { $eq: searchCity } } });

    // Filter by experience
    if (searchExp) {
      const min = parseInt(searchExp.split('-')[0]) || 0;
      const max = parseInt(searchExp.split('-')[1]) || 100;

      filter.push({
        $match: {
          $and: [{ minExp: { $gte: min } }, { maxExp: { $lte: max } }],
        },
      });
    }

    // Filter by candidate technologies
    if (searchTechs.length > 0) {
      searchTechs.map((stech) => {
        filter.push({
          $match: { technologies: { $elemMatch: { name: stech } } },
        });
      });
    }

    // Get only best 5 candidates
    filter.push({
      $limit: 5,
    });

    // Normalize response
    filter.push({
      $project: { _id: 0, id: 1, city: 1, experience: 1, technologies: 1 },
    });

    /**
     * GET CANDIDATES
     */
    const candidates = await this.candidateModel.aggregate(filter);

    return { searchTechs, searchCity, searchExp, candidates: candidates };
  }

  async cities() {
    /**
     * GET ALL CANDIDATES CITIES
     */
    const candidatesCities = await this.candidateModel.aggregate([
      {
        $group: {
          _id: null,
          cities: { $addToSet: '$city' },
        },
      },
    ]);

    return candidatesCities[0].cities;
  }

  async techs() {
    /**
     * GET ALL CANDIDATES CITIES
     */
    const candidatesTechs = await this.candidateModel.aggregate([
      {
        $group: {
          _id: null,
          candidateTechs: { $addToSet: '$technologies.name' },
        },
      },
      { $unwind: '$candidateTechs' },
      { $unwind: '$candidateTechs' },
      {
        $group: {
          _id: null,
          candidateTechs: { $addToSet: '$candidateTechs' },
        },
      },
    ]);

    return candidatesTechs[0].candidateTechs;
  }
}
