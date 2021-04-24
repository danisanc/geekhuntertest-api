import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CandidateDocument = Candidate & Document;

@Schema()
export class Candidate {
  @Prop()
  id: number;

  @Prop()
  city: string;

  @Prop()
  minExp: number;

  @Prop()
  maxExp: number;

  @Prop([
    raw({
      name: { type: String },
      is_main_tech: { type: Boolean },
    }),
  ])
  technologies: [Record<string, any>];
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
