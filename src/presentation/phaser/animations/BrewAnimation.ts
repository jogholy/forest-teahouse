import Phaser from 'phaser';

export class BrewAnimation {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.container = scene.add.container(x, y);
  }

  async play(): Promise<void> {
    const steps = [
      { emoji: '🫖', text: '准备茶具' },
      { emoji: '🌿', text: '放入食材' },
      { emoji: '💧', text: '注入热水' },
      { emoji: '⏱️', text: '静置浸泡' },
      { emoji: '🍵', text: '完成！' },
    ];

    for (let i = 0; i < steps.length; i++) {
      await this.showStep(steps[i].emoji, steps[i].text, i);
    }
  }

  private showStep(emoji: string, text: string, _index: number): Promise<void> {
    return new Promise(resolve => {
      const stepText = this.scene.add
        .text(0, 0, `${emoji}\n${text}`, {
          fontSize: '32px',
          color: '#4a7c59',
          align: 'center',
        })
        .setOrigin(0.5)
        .setAlpha(0);

      this.container.add(stepText);

      this.scene.tweens.add({
        targets: stepText,
        alpha: 1,
        duration: 300,
        onComplete: () => {
          this.scene.time.delayedCall(800, () => {
            this.scene.tweens.add({
              targets: stepText,
              alpha: 0,
              duration: 300,
              onComplete: () => {
                stepText.destroy();
                resolve();
              },
            });
          });
        },
      });
    });
  }

  destroy(): void {
    this.container.destroy();
  }
}
