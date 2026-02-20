import { Ingredient, Rarity } from '../models/Ingredient';

export class GachaEngine {
  private pityCounter = 0; // 保底计数器
  private legendaryPity = 0; // 传说保底

  // 稀有度概率配置
  private readonly RATES = {
    [Rarity.COMMON]: 0.6,
    [Rarity.UNCOMMON]: 0.3,
    [Rarity.RARE]: 0.08,
    [Rarity.LEGENDARY]: 0.02,
  };

  // 保底机制：10抽1稀有，50抽1传说
  private readonly RARE_PITY = 10;
  private readonly LEGENDARY_PITY = 50;

  pull(pool: Ingredient[]): Ingredient {
    this.pityCounter++;
    this.legendaryPity++;

    // 传说保底
    if (this.legendaryPity >= this.LEGENDARY_PITY) {
      this.legendaryPity = 0;
      this.pityCounter = 0;
      return this.getRandomByRarity(pool, Rarity.LEGENDARY);
    }

    // 稀有保底
    if (this.pityCounter >= this.RARE_PITY) {
      this.pityCounter = 0;
      return this.getRandomByRarity(pool, Rarity.RARE);
    }

    // 正常抽取
    const rarity = this.rollRarity();
    return this.getRandomByRarity(pool, rarity);
  }

  private rollRarity(): Rarity {
    const rand = Math.random();
    let cumulative = 0;

    for (const [rarity, rate] of Object.entries(this.RATES)) {
      cumulative += rate;
      if (rand < cumulative) return rarity as Rarity;
    }

    return Rarity.COMMON;
  }

  private getRandomByRarity(pool: Ingredient[], rarity: Rarity): Ingredient {
    const filtered = pool.filter(i => i.rarity === rarity);
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  reset() {
    this.pityCounter = 0;
    this.legendaryPity = 0;
  }
}
