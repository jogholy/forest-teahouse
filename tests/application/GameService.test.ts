import { describe, it, expect, beforeEach } from 'vitest';
import { GameService } from '../../src/application/services/GameService';
import { CollectionMethod } from '../../src/domain/models/Collection';
import { guestPool } from '../../src/domain/data/guestPool';
import { recipePool } from '../../src/domain/data/recipePool';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    service = new GameService();
  });

  it('should collect ingredient', () => {
    const ingredient = service.collect(CollectionMethod.AUTO);
    expect(ingredient).toBeDefined();
  });

  it('should serve guest and gain affection', () => {
    const guest = guestPool[0];
    const recipe = recipePool[0];
    const result = service.serve(guest, recipe, 0.8);

    expect(result.satisfaction.score).toBeGreaterThan(0);
    expect(result.updatedGuest.affection).toBeGreaterThan(0);
  });

  it('should level up teahouse', () => {
    const guest = guestPool[0];
    const recipe = recipePool[0];

    // 多次服务以获得经验
    for (let i = 0; i < 5; i++) {
      service.serve(guest, recipe, 0.9);
    }

    const teaHouse = service.getTeaHouse();
    expect(teaHouse.experience).toBeGreaterThan(0);
  });
});
