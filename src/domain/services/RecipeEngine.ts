import { Ingredient } from '../models/Ingredient';
import { Recipe, RecipeMatch } from '../models/Recipe';

export class RecipeEngine {
  matchRecipe(ingredients: Ingredient[], recipe: Recipe): RecipeMatch {
    const ingredientIds = ingredients.map(i => i.id);
    const matched = recipe.requiredIngredients.filter(id => ingredientIds.includes(id));
    const matchedIngredients = ingredients.filter(i => recipe.requiredIngredients.includes(i.id));

    return {
      recipe,
      matchedIngredients,
      isComplete: matched.length === recipe.requiredIngredients.length,
    };
  }

  findMatches(ingredients: Ingredient[], recipes: Recipe[]): RecipeMatch[] {
    return recipes
      .map(recipe => this.matchRecipe(ingredients, recipe))
      .filter(match => match.matchedIngredients.length > 0)
      .sort((a, b) => b.matchedIngredients.length - a.matchedIngredients.length);
  }
}
