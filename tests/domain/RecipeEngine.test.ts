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
    expect(match.tagMatch).toBeGreaterThan(0);
  });

  it('should brew with recipe', () => {
    const ingredients = [
      ingredientPool.find(i => i.id === 'common-001')!,
      ingredientPool.find(i => i.id === 'common-003')!,
    ];
    const recipe = recipePool[0];

    const result = engine.brew(ingredients, recipe);

    expect(result.success).toBe(true);
    expect(result.quality).toBeGreaterThan(0.5);
  });

  it('should experiment without recipe', () => {
    const ingredients = [ingredientPool[0], ingredientPool[1]];
    const result = engine.experiment(ingredients);

    expect(result).toBeDefined();
    expect(typeof result.success).toBe('boolean');
  });
});
