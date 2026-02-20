import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    // 标题（手绘风格）
    this.add
      .text(400, 100, '🍵 森林茶屋', {
        fontSize: '64px',
        color: '#2d5016',
        fontStyle: 'bold',
        stroke: '#8B9A7C',
        strokeThickness: 2,
      })
      .setOrigin(0.5);

    this.add
      .text(400, 200, 'Forest Tea House', {
        fontSize: '24px',
        color: '#666',
        fontStyle: 'italic',
      })
      .setOrigin(0.5);

    // 手绘风格按钮
    const button = this.add.graphics();
    button.lineStyle(3, 0x4a7c59, 1);
    button.fillStyle(0x6b9b7f, 1);
    button.fillRoundedRect(300, 320, 200, 60, 15);
    button.strokeRoundedRect(300, 320, 200, 60, 15);

    this.add
      .text(400, 350, '开始游戏', {
        fontSize: '32px',
        color: '#fff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('GachaScene'));

    this.add
      .text(400, 450, '采集食材 → 试茶台 → 接待客人', {
        fontSize: '18px',
        color: '#999',
        fontStyle: 'italic',
      })
      .setOrigin(0.5);
  }
}
