import { Ingredient } from './Ingredient';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  requiredIngredients: string[]; // ingredient ids
  requiredTags?: string[]; // 风味标签要求（用于配方提示）
  effect: string;
  story?: string;
  stars?: number; // 当前星级（1-5）
  mastery?: number; // 精通度（0-100）
}

export interface RecipeMatch {
  recipe: Recipe;
  matchedIngredients: Ingredient[];
  isComplete: boolean;
  tagMatch: number; // 风味标签匹配度（0-1）
}

export interface BrewResult {
  success: boolean;
  recipe?: Recipe;
  quality: number; // 品质（0-1）
  message: string;
}
