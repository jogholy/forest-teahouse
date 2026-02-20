import { GachaEngine } from '../../domain/services/GachaEngine';
import { Ingredient } from '../../domain/models/Ingredient';
import { ingredientPool } from '../../domain/data/ingredientPool';
import { CollectionMethod } from '../../domain/models/Collection';

export class GachaService {
  private engine: GachaEngine;
  private pool: Ingredient[];

  constructor() {
    this.engine = new GachaEngine();
    this.pool = ingredientPool;
  }

  pullOne(method: CollectionMethod = CollectionMethod.AUTO): Ingredient {
    return this.engine.pull(this.pool, method);
  }

  pullMultiple(count: number, method: CollectionMethod = CollectionMethod.AUTO): Ingredient[] {
    const results: Ingredient[] = [];
    for (let i = 0; i < count; i++) {
      results.push(this.engine.pull(this.pool, method));
    }
    return results;
  }

  reset(): void {
    this.engine.reset();
  }
}
