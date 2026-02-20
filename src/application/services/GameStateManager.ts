import { Ingredient } from '../../domain/models/Ingredient';
import { Guest } from '../../domain/models/Guest';
import { TeaHouse } from '../../domain/models/TeaHouse';

export interface GameState {
  inventory: Ingredient[];
  unlockedRecipes: string[];
  guests: Guest[];
  teaHouse: TeaHouse;
  lastSaved: number;
}

export class GameStateManager {
  private static STORAGE_KEY = 'forest-teahouse-save';

  save(state: GameState): void {
    const data = {
      ...state,
      lastSaved: Date.now(),
    };
    localStorage.setItem(GameStateManager.STORAGE_KEY, JSON.stringify(data));
  }

  load(): GameState | null {
    const data = localStorage.getItem(GameStateManager.STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  }

  clear(): void {
    localStorage.removeItem(GameStateManager.STORAGE_KEY);
  }
}
