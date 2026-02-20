import { describe, it, expect, beforeEach } from 'vitest';
import { GachaEngine } from '../../src/domain/services/GachaEngine';
import { ingredientPool } from '../../src/domain/data/ingredientPool';
import { Rarity } from '../../src/domain/models/Ingredient';
import { CollectionMethod } from '../../src/domain/models/Collection';

describe('GachaEngine', () => {
  let engine: GachaEngine;

  beforeEach(() => {
    engine = new GachaEngine();
  });

  it('should pull ingredient with auto method', () => {
    const result = engine.pull(ingredientPool, CollectionMethod.AUTO);
    expect(result).toBeDefined();
  });

  it('should guarantee rare after 10 pulls', () => {
    for (let i = 0; i < 9; i++) {
      engine.pull(ingredientPool);
    }
    const result = engine.pull(ingredientPool);
    expect([Rarity.RARE, Rarity.LEGENDARY]).toContain(result.rarity);
  });

  it('should guarantee rare+ with event method', () => {
    const result = engine.pull(ingredientPool, CollectionMethod.EVENT);
    expect([Rarity.RARE, Rarity.LEGENDARY]).toContain(result.rarity);
  });
});
