import { describe, it, expect, beforeEach } from 'vitest';
import { RecipeEngine } from '../../src/domain/services/RecipeEngine';
import { ingredientPool } from '../../src/domain/data/ingredientPool';
import { recipePool } from '../../src/domain/data/recipePool';

describe('RecipeEngine', () => {
  let engine: RecipeEngine;

  beforeEach(() => {
    engine = new RecipeEngine();
  });

  it('should match complete recipe', () => {
    const ingredients = [
      ingredientPool.find(i => i.id === 'common-001')!,
      ingredientPool.find(i => i.id === 'common-003')!,
    ];
    const recipe = recipePool[0];

    const match = engine.matchRecipe(ingredients, recipe);

    expect(match.isComplete).toBe(true);
    expect(match.matchedIngredients).toHaveLength(2);
  });

  it('should find partial matches', () => {
    const ingredients = [ingredientPool.find(i => i.id === 'common-001')!];

    const matches = engine.findMatches(ingredients, recipePool);

    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0].isComplete).toBe(false);
  });
});
