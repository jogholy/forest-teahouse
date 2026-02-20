import { Ingredient } from '../models/Ingredient';
import { Recipe, RecipeMatch, BrewResult } from '../models/Recipe';

export class RecipeEngine {
  // 实验成功率（无食谱时）
  private readonly EXPERIMENT_SUCCESS_RATE = 0.3;

  // 计算风味标签匹配度
  calculateTagMatch(ingredients: Ingredient[], recipe: Recipe): number {
    if (!recipe.requiredTags || recipe.requiredTags.length === 0) return 1;

    const ingredientTags = ingredients.flatMap(i => i.tags);
    const matchedTags = recipe.requiredTags.filter(tag => ingredientTags.includes(tag));

    return matchedTags.length / recipe.requiredTags.length;
  }

  matchRecipe(ingredients: Ingredient[], recipe: Recipe): RecipeMatch {
    const ingredientIds = ingredients.map(i => i.id);
    const matched = recipe.requiredIngredients.filter(id => ingredientIds.includes(id));
    const matchedIngredients = ingredients.filter(i => recipe.requiredIngredients.includes(i.id));

    const tagMatch = this.calculateTagMatch(ingredients, recipe);

    return {
      recipe,
      matchedIngredients,
      isComplete: matched.length === recipe.requiredIngredients.length,
      tagMatch,
    };
  }

  findMatches(ingredients: Ingredient[], recipes: Recipe[]): RecipeMatch[] {
    return recipes
      .map(recipe => this.matchRecipe(ingredients, recipe))
      .filter(match => match.matchedIngredients.length > 0)
      .sort((a, b) => {
        // 优先完整匹配，其次标签匹配度
        if (a.isComplete !== b.isComplete) {
          return a.isComplete ? -1 : 1;
        }
        return b.tagMatch - a.tagMatch;
      });
  }

  // 试茶台实验（无食谱时）
  experiment(ingredients: Ingredient[]): BrewResult {
    const success = Math.random() < this.EXPERIMENT_SUCCESS_RATE;

    if (!success) {
      return {
        success: false,
        quality: 0,
        message: '制作失败！这是一杯黑暗茶饮...',
      };
    }

    return {
      success: true,
      quality: Math.random() * 0.5 + 0.3, // 0.3-0.8
      message: '实验成功！发现了新的风味组合',
    };
  }

  // 按食谱制作（有食谱时）
  brew(ingredients: Ingredient[], recipe: Recipe): BrewResult {
    const match = this.matchRecipe(ingredients, recipe);

    if (!match.isComplete) {
      return {
        success: false,
        quality: 0,
        message: '食材不足，无法制作',
      };
    }

    // 品质受标签匹配度影响
    const quality = 0.6 + match.tagMatch * 0.4; // 0.6-1.0

    return {
      success: true,
      recipe,
      quality,
      message: `成功制作：${recipe.name}`,
    };
  }
}
