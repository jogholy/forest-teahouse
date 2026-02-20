import { Guest } from '../models/Guest';
import { Recipe } from '../models/Recipe';
import { Satisfaction, SatisfactionFactor, SatisfactionLevel } from '../models/Satisfaction';

export class SatisfactionEngine {
  calculate(guest: Guest, recipe: Recipe, quality: number): Satisfaction {
    const factors: SatisfactionFactor[] = [];

    // 因素1: 口味匹配（40%权重）
    const tasteMatch = this.calculateTasteMatch(guest, recipe);
    factors.push({
      name: '口味匹配',
      score: tasteMatch,
      description: tasteMatch > 70 ? '非常喜欢' : tasteMatch > 40 ? '还不错' : '不太喜欢',
    });

    // 因素2: 制作品质（30%权重）
    const qualityScore = quality * 100;
    factors.push({
      name: '制作品质',
      score: qualityScore,
      description: qualityScore > 80 ? '完美' : qualityScore > 60 ? '良好' : '一般',
    });

    // 因素3: 好感度加成（30%权重）
    const affectionBonus = (guest.affection || 0) * 0.3;
    factors.push({
      name: '好感度',
      score: affectionBonus,
      description: `好感度 ${guest.affection || 0}`,
    });

    const totalScore = tasteMatch * 0.4 + qualityScore * 0.3 + affectionBonus;

    return {
      guest,
      recipe,
      score: Math.min(totalScore, 100),
      factors,
    };
  }

  private calculateTasteMatch(guest: Guest, recipe: Recipe): number {
    if (!guest.favoriteTag || !recipe.requiredTags) return 50;
    return recipe.requiredTags.includes(guest.favoriteTag) ? 90 : 50;
  }

  getLevel(score: number): SatisfactionLevel {
    if (score >= 81) return SatisfactionLevel.EXCELLENT;
    if (score >= 61) return SatisfactionLevel.GOOD;
    if (score >= 31) return SatisfactionLevel.AVERAGE;
    return SatisfactionLevel.POOR;
  }
}
