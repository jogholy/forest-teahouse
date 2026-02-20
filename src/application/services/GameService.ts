import { GachaService } from './GachaService';
import { RecipeEngine } from '../../domain/services/RecipeEngine';
import { GuestEngine } from '../../domain/services/GuestEngine';
import { SatisfactionEngine } from '../../domain/services/SatisfactionEngine';
import { TeaHouse, teaHouseLevels } from '../../domain/models/TeaHouse';
import { CollectionMethod } from '../../domain/models/Collection';
import { Ingredient } from '../../domain/models/Ingredient';
import { Recipe } from '../../domain/models/Recipe';
import { Guest } from '../../domain/models/Guest';

export class GameService {
  private gachaService: GachaService;
  private recipeEngine: RecipeEngine;
  private guestEngine: GuestEngine;
  private satisfactionEngine: SatisfactionEngine;
  private teaHouse: TeaHouse;

  constructor() {
    this.gachaService = new GachaService();
    this.recipeEngine = new RecipeEngine();
    this.guestEngine = new GuestEngine();
    this.satisfactionEngine = new SatisfactionEngine();
    this.teaHouse = teaHouseLevels[0];
  }

  // 采集食材
  collect(method: CollectionMethod = CollectionMethod.AUTO): Ingredient {
    return this.gachaService.pullOne(method);
  }

  // 制作茶饮
  brew(ingredients: Ingredient[], recipe?: Recipe) {
    if (recipe) {
      return this.recipeEngine.brew(ingredients, recipe);
    }
    return this.recipeEngine.experiment(ingredients);
  }

  // 接待客人
  serve(guest: Guest, recipe: Recipe, quality: number) {
    const satisfaction = this.satisfactionEngine.calculate(guest, recipe, quality);

    // 根据满意度增加好感度
    const affectionGain = Math.floor(satisfaction.score / 10);
    const updatedGuest = this.guestEngine.addAffection(guest, affectionGain);

    // 增加经验值
    this.addExperience(satisfaction.score);

    return { satisfaction, updatedGuest };
  }

  // 增加经验值
  private addExperience(amount: number) {
    this.teaHouse.experience += amount;

    // 检查升级
    if (this.teaHouse.level < 5 && this.teaHouse.experience >= this.teaHouse.nextLevelExp) {
      this.levelUp();
    }
  }

  private levelUp() {
    const nextLevel = teaHouseLevels[this.teaHouse.level];
    if (nextLevel) {
      this.teaHouse = nextLevel;
    }
  }

  getTeaHouse(): TeaHouse {
    return this.teaHouse;
  }
}
