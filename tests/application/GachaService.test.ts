import { describe, it, expect, beforeEach } from 'vitest';
import { GachaService } from '../../src/application/services/GachaService';
import { Rarity } from '../../src/domain/models/Ingredient';

describe('GachaService', () => {
  let service: GachaService;

  beforeEach(() => {
    service = new GachaService();
  });

  it('should pull one ingredient', () => {
    const result = service.pullOne();
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.name).toBeDefined();
  });

  it('should pull multiple ingredients', () => {
    const results = service.pullMultiple(5);
    expect(results).toHaveLength(5);
  });

  it('should guarantee rare after 10 pulls', () => {
    const results = service.pullMultiple(10);
    const hasRareOrBetter = results.some(
      i => i.rarity === Rarity.RARE || i.rarity === Rarity.LEGENDARY
    );
    expect(hasRareOrBetter).toBe(true);
  });
});
