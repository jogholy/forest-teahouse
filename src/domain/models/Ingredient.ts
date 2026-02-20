// 稀有度枚举
export enum Rarity {
  COMMON = 'COMMON', // 60%
  UNCOMMON = 'UNCOMMON', // 30%
  RARE = 'RARE', // 8%
  LEGENDARY = 'LEGENDARY', // 2%
}

// 食材接口
export interface Ingredient {
  id: string;
  name: string;
  rarity: Rarity;
  description: string;
  tags: string[]; // 风味标签：清香、甘甜、苦涩、花香、果香
}
