import Phaser from 'phaser';

/**
 * BootScene - 游戏启动场景
 * 显示欢迎信息和项目状态
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    const { width, height } = this.cameras.main;

    // 背景色已在游戏配置中设置为 #F5F1E8

    // 标题文字
    const title = this.add.text(width / 2, height / 2 - 50, '🍵 森林茶屋', {
      fontSize: '48px',
      color: '#8B9A7C',
      fontFamily: 'Arial, sans-serif',
    });
    title.setOrigin(0.5);

    // 副标题
    const subtitle = this.add.text(width / 2, height / 2 + 20, 'Forest Tea House', {
      fontSize: '24px',
      color: '#5C5C5C',
      fontFamily: 'Arial, sans-serif',
    });
    subtitle.setOrigin(0.5);

    // 状态文字
    const status = this.add.text(width / 2, height / 2 + 80, 'MVP Demo - 开发中', {
      fontSize: '18px',
      color: '#D4C4B0',
      fontFamily: 'Arial, sans-serif',
    });
    status.setOrigin(0.5);

    // 提示文字
    const hint = this.add.text(
      width / 2,
      height / 2 + 120,
      '基础设施搭建完成 ✓\n准备开始核心功能开发',
      {
        fontSize: '14px',
        color: '#8B9A7C',
        fontFamily: 'Arial, sans-serif',
        align: 'center',
      }
    );
    hint.setOrigin(0.5);

    // 添加点击提示
    const clickHint = this.add.text(width / 2, height / 2 + 160, '点击屏幕开始', {
      fontSize: '16px',
      color: '#4a7c59',
      fontFamily: 'Arial, sans-serif',
    });
    clickHint.setOrigin(0.5);

    // 点击启动 Gacha 场景
    this.input.once('pointerdown', () => {
      this.scene.start('GachaScene');
    });
  }
}
