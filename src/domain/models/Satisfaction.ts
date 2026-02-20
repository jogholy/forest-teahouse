import { Guest } from './Guest';
import { Recipe } from './Recipe';

export interface Satisfaction {
  guest: Guest;
  recipe: Recipe;
  score: number; // 满意度分数（0-100）
  factors: SatisfactionFactor[];
}

export interface SatisfactionFactor {
  name: string;
  score: number;
  description: string;
}

export enum SatisfactionLevel {
  POOR = 'POOR', // 0-30
  AVERAGE = 'AVERAGE', // 31-60
  GOOD = 'GOOD', // 61-80
  EXCELLENT = 'EXCELLENT', // 81-100
}
