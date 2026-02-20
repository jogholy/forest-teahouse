import Phaser from 'phaser';
import { GachaService } from '../../../application/services/GachaService';
import { Ingredient } from '../../../domain/models/Ingredient';

export class GachaScene extends Phaser.Scene {
  private gachaService!: GachaService;
  private resultText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'GachaScene' });
  }

  create() {
    this.gachaService = new GachaService();

    // 标题
    this.add
      .text(400, 100, '🍵 森林晨采', {
        fontSize: '48px',
        color: '#2d5016',
      })
      .setOrigin(0.5);

    // 抽卡按钮
    const pullButton = this.add
      .text(400, 300, '采集一次', {
        fontSize: '32px',
        color: '#fff',
        backgroundColor: '#4a7c59',
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    pullButton.on('pointerdown', () => this.pullOne());

    // 十连抽按钮
    const pull10Button = this.add
      .text(400, 380, '采集十次', {
        fontSize: '32px',
        color: '#fff',
        backgroundColor: '#6b9b7f',
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    pull10Button.on('pointerdown', () => this.pullTen());

    // 试茶台按钮
    const brewButton = this.add
      .text(400, 460, '前往试茶台 →', {
        fontSize: '24px',
        color: '#fff',
        backgroundColor: '#8b7355',
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    brewButton.on('pointerdown', () => this.scene.start('BrewScene'));

    // 茶屋按钮
    const guestButton = this.add
      .text(200, 460, '← 茶屋', {
        fontSize: '24px',
        color: '#fff',
        backgroundColor: '#8b7355',
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    guestButton.on('pointerdown', () => this.scene.start('GuestScene'));

    // 结果显示区域
    this.resultText = this.add
      .text(400, 500, '点击按钮开始采集', {
        fontSize: '20px',
        color: '#333',
        align: 'center',
      })
      .setOrigin(0.5);
  }

  private pullOne() {
    const result = this.gachaService.pullOne();
    this.displayResult([result]);
  }

  private pullTen() {
    const results = this.gachaService.pullMultiple(10);
    this.displayResult(results);
  }

  private displayResult(results: Ingredient[]) {
    const text = results.map(i => `${this.getRarityEmoji(i.rarity)} ${i.name}`).join('\n');
    this.resultText.setText(text);
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
