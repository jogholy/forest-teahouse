import Phaser from 'phaser';
import { GachaService } from '../../../application/services/GachaService';
import { RecipeEngine } from '../../../domain/services/RecipeEngine';
import { recipePool } from '../../../domain/data/recipePool';
import { Ingredient } from '../../../domain/models/Ingredient';

export class BrewScene extends Phaser.Scene {
  private gachaService!: GachaService;
  private recipeEngine!: RecipeEngine;
  private selectedIngredients: Ingredient[] = [];
  private ingredientsText!: Phaser.GameObjects.Text;
  private resultText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'BrewScene' });
  }

  create() {
    this.gachaService = new GachaService();
    this.recipeEngine = new RecipeEngine();

    // 标题
    this.add
      .text(400, 50, '🍵 试茶台', {
        fontSize: '48px',
        color: '#2d5016',
      })
      .setOrigin(0.5);

    // 采集按钮
    const pullButton = this.add
      .text(400, 150, '采集食材', {
        fontSize: '24px',
        color: '#fff',
        backgroundColor: '#4a7c59',
        padding: { x: 15, y: 8 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    pullButton.on('pointerdown', () => this.pullIngredient());

    // 已选食材显示
    this.add.text(100, 220, '已选食材:', { fontSize: '20px', color: '#333' });
    this.ingredientsText = this.add.text(100, 250, '(无)', {
      fontSize: '18px',
      color: '#666',
    });

    // 试茶按钮
    const brewButton = this.add
      .text(400, 350, '开始试茶', {
        fontSize: '24px',
        color: '#fff',
        backgroundColor: '#6b9b7f',
        padding: { x: 15, y: 8 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    brewButton.on('pointerdown', () => this.brewTea());

    // 结果显示
    this.resultText = this.add
      .text(400, 450, '', {
        fontSize: '18px',
        color: '#333',
        align: 'center',
      })
      .setOrigin(0.5);

    // 返回按钮
    const backButton = this.add
      .text(50, 550, '← 返回', {
        fontSize: '18px',
        color: '#666',
      })
      .setInteractive({ useHandCursor: true });

    backButton.on('pointerdown', () => this.scene.start('GachaScene'));
  }

  private pullIngredient() {
    const ingredient = this.gachaService.pullOne();
    this.selectedIngredients.push(ingredient);
    this.updateIngredientsDisplay();
  }

  private updateIngredientsDisplay() {
    const text = this.selectedIngredients
      .map(i => `${this.getRarityEmoji(i.rarity)} ${i.name}`)
      .join('\n');
    this.ingredientsText.setText(text || '(无)');
  }

  private brewTea() {
    if (this.selectedIngredients.length === 0) {
      this.resultText.setText('请先采集食材！');
      return;
    }

    const matches = this.recipeEngine.findMatches(this.selectedIngredients, recipePool);

    if (matches.length === 0) {
      this.resultText.setText('没有找到匹配的配方\n继续尝试吧！');
    } else {
      const match = matches[0];
      if (match.isComplete) {
        this.resultText.setText(
          `✨ 成功制作：${match.recipe.name}\n${match.recipe.description}\n效果：${match.recipe.effect}`
        );
      } else {
        this.resultText.setText(`部分匹配：${match.recipe.name}\n还需要更多食材`);
      }
    }
  }

  private getRarityEmoji(rarity: string): string {
    const emojiMap: Record<string, string> = {
      COMMON: '⚪',
      UNCOMMON: '🟢',
      RARE: '🔵',
      LEGENDARY: '🟡',
    };
    return emojiMap[rarity] || '⚪';
  }
}
