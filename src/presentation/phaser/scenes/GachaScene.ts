import Phaser from 'phaser';
import { GachaService } from '../../../application/services/GachaService';
import { CollectionMethod } from '../../../domain/models/Collection';
import { Ingredient } from '../../../domain/models/Ingredient';
import { CollectAnimation } from '../animations/CollectAnimation';

export class GachaScene extends Phaser.Scene {
  private gachaService!: GachaService;
  private resultText!: Phaser.GameObjects.Text;
  private collectAnimation!: CollectAnimation;

  constructor() {
    super({ key: 'GachaScene' });
  }

  create() {
    this.gachaService = new GachaService();
    this.collectAnimation = new CollectAnimation(this);

    this.add.text(400, 50, '🌿 森林晨采', { fontSize: '48px', color: '#2d5016' }).setOrigin(0.5);

    // 自动采集
    const autoButton = this.add
      .text(200, 200, '自动采集\n(挂机)', {
        fontSize: '20px',
        color: '#fff',
        backgroundColor: '#6b9b7f',
        padding: { x: 15, y: 10 },
        align: 'center',
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    autoButton.on('pointerdown', () => this.collect(CollectionMethod.AUTO));

    // 手动采集
    const manualButton = this.add
      .text(400, 200, '手动采集\n(稀有率+20%)', {
        fontSize: '20px',
        color: '#fff',
        backgroundColor: '#4a7c59',
        padding: { x: 15, y: 10 },
        align: 'center',
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    manualButton.on('pointerdown', () => this.collect(CollectionMethod.MANUAL));

    // 事件采集
    const eventButton = this.add
      .text(600, 200, '事件采集\n(必得稀有)', {
        fontSize: '20px',
        color: '#fff',
        backgroundColor: '#8b7355',
        padding: { x: 15, y: 10 },
        align: 'center',
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    eventButton.on('pointerdown', () => this.collect(CollectionMethod.EVENT));

    // 结果显示
    this.resultText = this.add
      .text(400, 350, '选择采集方式', { fontSize: '20px', color: '#333', align: 'center' })
      .setOrigin(0.5);

    // 导航按钮
    this.add
      .text(200, 500, '→ 试茶台', {
        fontSize: '20px',
        color: '#666',
        backgroundColor: '#ddd',
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('BrewScene'));

    this.add
      .text(600, 500, '→ 茶屋', {
        fontSize: '20px',
        color: '#666',
        backgroundColor: '#ddd',
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('GuestScene'));
  }

  private collect(method: CollectionMethod) {
    const ingredient = this.gachaService.pullOne(method);

    // 播放采集特效
    this.collectAnimation.play(400, 300, ingredient.rarity);

    this.showResult(ingredient, method);
  }

  private showResult(ingredient: Ingredient, method: CollectionMethod) {
    const methodText = {
      [CollectionMethod.AUTO]: '自动采集',
      [CollectionMethod.MANUAL]: '手动采集',
      [CollectionMethod.EVENT]: '事件采集',
    }[method];

    this.resultText.setText(
      `${methodText}\n${this.getRarityEmoji(ingredient.rarity)} ${ingredient.name}\n${ingredient.description}`
    );
  }

  private getRarityEmoji(rarity: string): string {
    const map: Record<string, string> = {
      COMMON: '⚪',
      UNCOMMON: '🟢',
      RARE: '🔵',
      LEGENDARY: '🟡',
    };
    return map[rarity] || '⚪';
  }
}
