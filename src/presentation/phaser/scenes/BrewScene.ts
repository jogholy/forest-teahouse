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

    this.add.text(400, 50, '🍵 试茶台', { fontSize: '48px', color: '#2d5016' }).setOrigin(0.5);

    // 采集食材按钮
    this.add
      .text(400, 150, '采集食材', {
        fontSize: '20px',
        color: '#fff',
        backgroundColor: '#4a7c59',
        padding: { x: 15, y: 8 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.addIngredient());

    // 已选食材
    this.add.text(100, 220, '已选食材:', { fontSize: '18px', color: '#333' });
    this.ingredientsText = this.add.text(100, 250, '(无)', { fontSize: '16px', color: '#666' });

    // 实验按钮
    this.add
      .text(300, 350, '实验制作\n(30%成功率)', {
        fontSize: '18px',
        color: '#fff',
        backgroundColor: '#8b7355',
        padding: { x: 12, y: 8 },
        align: 'center',
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.experiment());

    // 按食谱制作按钮
    this.add
      .text(500, 350, '按食谱制作\n(100%成功)', {
        fontSize: '18px',
        color: '#fff',
        backgroundColor: '#6b9b7f',
        padding: { x: 12, y: 8 },
        align: 'center',
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.brewWithRecipe());

    // 结果显示
    this.resultText = this.add
      .text(400, 450, '', { fontSize: '16px', color: '#333', align: 'center' })
      .setOrigin(0.5);

    // 返回按钮
    this.add
      .text(50, 550, '← 返回', { fontSize: '18px', color: '#666' })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('GachaScene'));
  }

  private addIngredient() {
    const ingredient = this.gachaService.pullOne();
    this.selectedIngredients.push(ingredient);
    this.updateDisplay();
  }

  private updateDisplay() {
    const text = this.selectedIngredients.map(i => `• ${i.name}`).join('\n');
    this.ingredientsText.setText(text || '(无)');
  }

  private experiment() {
    if (this.selectedIngredients.length === 0) {
      this.resultText.setText('请先采集食材！');
      return;
    }

    const result = this.recipeEngine.experiment(this.selectedIngredients);
    this.resultText.setText(result.message + `\n品质: ${Math.floor(result.quality * 100)}%`);
  }

  private brewWithRecipe() {
    if (this.selectedIngredients.length === 0) {
      this.resultText.setText('请先采集食材！');
      return;
    }

    const matches = this.recipeEngine.findMatches(this.selectedIngredients, recipePool);
    if (matches.length === 0 || !matches[0].isComplete) {
      this.resultText.setText('没有匹配的完整配方');
      return;
    }

    const result = this.recipeEngine.brew(this.selectedIngredients, matches[0].recipe);
    this.resultText.setText(result.message + `\n品质: ${Math.floor(result.quality * 100)}%`);
  }
}
