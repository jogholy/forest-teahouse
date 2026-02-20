import Phaser from 'phaser';

export class CollectAnimation {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  play(x: number, y: number, rarity: string): void {
    const colors = {
      COMMON: 0xcccccc,
      UNCOMMON: 0x66cc66,
      RARE: 0x6699ff,
      LEGENDARY: 0xffcc00,
    };

    const color = colors[rarity as keyof typeof colors] || 0xcccccc;

    // 粒子效果
    for (let i = 0; i < 8; i++) {
      const particle = this.scene.add.circle(x, y, 4, color);
      const angle = (Math.PI * 2 * i) / 8;
      const distance = 50;

      this.scene.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        alpha: 0,
        duration: 600,
        onComplete: () => particle.destroy(),
      });
    }
  }
}
