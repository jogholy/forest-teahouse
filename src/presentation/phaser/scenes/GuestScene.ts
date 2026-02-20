import Phaser from 'phaser';
import { GuestEngine } from '../../../domain/services/GuestEngine';
import { guestPool } from '../../../domain/data/guestPool';
import { Guest } from '../../../domain/models/Guest';

export class GuestScene extends Phaser.Scene {
  private guestEngine!: GuestEngine;
  private currentGuest?: Guest;
  private guestText!: Phaser.GameObjects.Text;
  private dialogueText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'GuestScene' });
  }

  create() {
    this.guestEngine = new GuestEngine();

    // 标题
    this.add
      .text(400, 50, '🏠 茶屋', {
        fontSize: '48px',
        color: '#2d5016',
      })
      .setOrigin(0.5);

    // 客人显示
    this.guestText = this.add
      .text(400, 150, '等待客人...', {
        fontSize: '32px',
        color: '#333',
      })
      .setOrigin(0.5);

    // 对话显示
    this.dialogueText = this.add
      .text(400, 250, '', {
        fontSize: '20px',
        color: '#666',
        align: 'center',
        wordWrap: { width: 600 },
      })
      .setOrigin(0.5);

    // 迎接客人按钮
    const greetButton = this.add
      .text(400, 400, '迎接客人', {
        fontSize: '24px',
        color: '#fff',
        backgroundColor: '#4a7c59',
        padding: { x: 15, y: 8 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    greetButton.on('pointerdown', () => this.greetGuest());

    // 返回按钮
    const backButton = this.add
      .text(50, 550, '← 返回', {
        fontSize: '18px',
        color: '#666',
      })
      .setInteractive({ useHandCursor: true });

    backButton.on('pointerdown', () => this.scene.start('GachaScene'));
  }

  private greetGuest() {
    this.currentGuest = this.guestEngine.generateGuest(guestPool);
    this.guestText.setText(`${this.currentGuest.avatar} ${this.currentGuest.name}`);
    this.dialogueText.setText(
      `"你好，听说这里的茶很特别..."\n（${this.currentGuest.personality}）`
    );
  }
}
