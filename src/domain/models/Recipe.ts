import { Ingredient } from './Ingredient';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  requiredIngredients: string[]; // ingredient ids
  effect: string;
  story?: string;
}

export interface RecipeMatch {
  recipe: Recipe;
  matchedIngredients: Ingredient[];
  isComplete: boolean;
}
