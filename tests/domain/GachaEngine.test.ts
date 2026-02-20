import { describe, it, expect, beforeEach } from 'vitest';
import { GachaEngine } from '../../src/domain/services/GachaEngine';
import { Ingredient, Rarity } from '../../src/domain/models/Ingredient';

describe('GachaEngine', () => {
  let engine: GachaEngine;
  let pool: Ingredient[];

  beforeEach(() => {
    engine = new GachaEngine();
    pool = [
      { id: '1', name: '晨露茶叶', rarity: Rarity.COMMON, description: '', tags: [] },
      { id: '2', name: '月光白茶', rarity: Rarity.UNCOMMON, description: '', tags: [] },
      { id: '3', name: '星屑普洱', rarity: Rarity.RARE, description: '', tags: [] },
      { id: '4', name: '时之茶叶', rarity: Rarity.LEGENDARY, description: '', tags: [] },
    ];
  });

  it('should guarantee rare after 10 pulls', () => {
    for (let i = 0; i < 9; i++) {
      engine.pull(pool);
    }
    const result = engine.pull(pool);
    expect([Rarity.RARE, Rarity.LEGENDARY]).toContain(result.rarity);
  });

  it('should guarantee legendary after 50 pulls', () => {
    for (let i = 0; i < 49; i++) {
      engine.pull(pool);
    }
    const result = engine.pull(pool);
    expect(result.rarity).toBe(Rarity.LEGENDARY);
  });
});
