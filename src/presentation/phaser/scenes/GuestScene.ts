import Phaser from 'phaser';
import { GuestEngine } from '../../../domain/services/GuestEngine';
import { guestPool } from '../../../domain/data/guestPool';
import { Guest } from '../../../domain/models/Guest';

export class GuestScene extends Phaser.Scene {
  private guestEngine!: GuestEngine;
  private currentGuest?: Guest;
  private guestText!: Phaser.GameObjects.Text;
  private dialogueText!: Phaser.GameObjects.Text;
  private affectionText!: Phaser.GameObjects.Text;
  private portraitGraphics?: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: 'GuestScene' });
  }

  create() {
    this.guestEngine = new GuestEngine();
    this.add.text(400, 50, '🏠 茶屋', { fontSize: '48px', color: '#2d5016' }).setOrigin(0.5);

    this.guestText = this.add
      .text(400, 150, '等待客人...', { fontSize: '32px', color: '#333' })
      .setOrigin(0.5);
    this.affectionText = this.add
      .text(400, 200, '', { fontSize: '18px', color: '#666' })
      .setOrigin(0.5);
    this.dialogueText = this.add
      .text(400, 280, '', {
        fontSize: '18px',
        color: '#666',
        align: 'center',
        wordWrap: { width: 600 },
      })
      .setOrigin(0.5);

    this.add
      .text(400, 400, '迎接客人', {
        fontSize: '24px',
        color: '#fff',
        backgroundColor: '#4a7c59',
        padding: { x: 15, y: 8 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.greetGuest());

    this.add
      .text(400, 460, '查看故事', {
        fontSize: '20px',
        color: '#fff',
        backgroundColor: '#6b9b7f',
        padding: { x: 15, y: 8 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.showStory());

    this.add
      .text(50, 550, '← 返回', { fontSize: '18px', color: '#666' })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('GachaScene'));
  }

  private greetGuest() {
    this.currentGuest = this.guestEngine.generateGuest(guestPool);

    // 清除旧立绘
    if (this.portraitGraphics) this.portraitGraphics.destroy();

    // 绘制客人立绘（简笔画）
    this.portraitGraphics = this.add.graphics();
    this.portraitGraphics.lineStyle(3, 0x4a7c59, 1);
    this.portraitGraphics.fillStyle(0xf5f1e8, 1);
    this.portraitGraphics.fillCircle(400, 150, 40);
    this.portraitGraphics.strokeCircle(400, 150, 40);

    this.guestText.setText(`${this.currentGuest.avatar} ${this.currentGuest.name}`);
    this.affectionText.setText(`好感度: ${this.currentGuest.affection || 0}/100`);
    this.dialogueText.setText(
      `"你好，听说这里的茶很特别..."\n（${this.currentGuest.personality}）`
    );
  }

  private showStory() {
    if (!this.currentGuest) {
      this.dialogueText.setText('请先迎接客人');
      return;
    }

    const chapters = this.guestEngine.unlockChapters(this.currentGuest);
    const unlocked = chapters.filter(c => c.unlocked);

    if (unlocked.length === 0) {
      this.dialogueText.setText('暂无解锁的故事');
      return;
    }

    const latest = unlocked[unlocked.length - 1];
    this.dialogueText.setText(
      `【${latest.title}】\n${latest.content}\n\n(${unlocked.length}/${chapters.length} 章节已解锁)`
    );
  }
}
