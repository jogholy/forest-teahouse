import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.add.text(400, 100, '🍵 森林茶屋', { fontSize: '64px', color: '#2d5016' }).setOrigin(0.5);
    this.add.text(400, 200, 'Forest Tea House', { fontSize: '24px', color: '#666' }).setOrigin(0.5);

    // 开始游戏按钮
    this.add
      .text(400, 350, '开始游戏', {
        fontSize: '32px',
        color: '#fff',
        backgroundColor: '#4a7c59',
        padding: { x: 30, y: 15 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('GachaScene'));

    // 提示文字
    this.add
      .text(400, 450, '采集食材 → 试茶台 → 接待客人', { fontSize: '18px', color: '#999' })
      .setOrigin(0.5);
  }
}
