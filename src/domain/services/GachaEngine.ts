import { Ingredient, Rarity } from '../models/Ingredient';
import { CollectionMethod } from '../models/Collection';

export class GachaEngine {
  private pityCounter = 0;
  private legendaryPity = 0;

  private readonly RATES = {
    [Rarity.COMMON]: 0.6,
    [Rarity.UNCOMMON]: 0.3,
    [Rarity.RARE]: 0.08,
    [Rarity.LEGENDARY]: 0.02,
  };

  private readonly RARE_PITY = 10;
  private readonly LEGENDARY_PITY = 50;

  pull(pool: Ingredient[], method: CollectionMethod = CollectionMethod.AUTO): Ingredient {
    this.pityCounter++;
    this.legendaryPity++;

    // 手动采集：稀有率+20%
    const rateBonus = method === CollectionMethod.MANUAL ? 0.2 : 0;

    // 事件采集：必得稀有以上
    if (method === CollectionMethod.EVENT) {
      this.pityCounter = 0;
      const rarity = Math.random() < 0.5 ? Rarity.RARE : Rarity.LEGENDARY;
      return this.getRandomByRarity(pool, rarity);
    }

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

    // 正常抽取（带加成）
    const rarity = this.rollRarity(rateBonus);
    return this.getRandomByRarity(pool, rarity);
  }

  private rollRarity(bonus: number = 0): Rarity {
    const rand = Math.random();
    let cumulative = 0;

    // 应用加成到稀有和传说
    const rates = { ...this.RATES };
    if (bonus > 0) {
      rates[Rarity.RARE] += bonus * 0.15;
      rates[Rarity.LEGENDARY] += bonus * 0.05;
      rates[Rarity.COMMON] -= bonus * 0.2;
    }

    for (const [rarity, rate] of Object.entries(rates)) {
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
