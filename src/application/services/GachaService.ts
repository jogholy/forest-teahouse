import { GachaEngine } from '../../domain/services/GachaEngine';
import { Ingredient } from '../../domain/models/Ingredient';
import { ingredientPool } from '../../domain/data/ingredientPool';

export class GachaService {
  private engine: GachaEngine;
  private pool: Ingredient[];

  constructor() {
    this.engine = new GachaEngine();
    this.pool = ingredientPool;
  }

  pullOne(): Ingredient {
    return this.engine.pull(this.pool);
  }

  pullMultiple(count: number): Ingredient[] {
    const results: Ingredient[] = [];
    for (let i = 0; i < count; i++) {
      results.push(this.engine.pull(this.pool));
    }
    return results;
  }

  reset(): void {
    this.engine.reset();
  }
}
