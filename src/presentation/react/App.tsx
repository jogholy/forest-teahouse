import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { BootScene } from '../phaser/scenes/BootScene';
import { MainScene } from '../phaser/scenes/MainScene';
import { GachaScene } from '../phaser/scenes/GachaScene';
import { BrewScene } from '../phaser/scenes/BrewScene';
import { GuestScene } from '../phaser/scenes/GuestScene';
import './App.css';

function App() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game-container',
      backgroundColor: '#F5F1E8',
      scene: [BootScene, MainScene, GachaScene, BrewScene, GuestScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍵 森林茶屋</h1>
        <p>Forest Tea House - 开发中</p>
      </header>
      <div id="game-container" className="game-container"></div>
      <footer className="app-footer">
        <p>治愈系茶文化经营游戏 | MVP Demo</p>
      </footer>
    </div>
  );
}

export default App;
