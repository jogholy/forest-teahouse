import { Guest, GuestType } from '../models/Guest';

export class GuestEngine {
  private visitCount = 0;

  generateGuest(guests: Guest[]): Guest {
    this.visitCount++;

    // 每5位客人出现一个特殊客人
    if (this.visitCount % 5 === 0) {
      const special = guests.filter(g => g.type === GuestType.SPECIAL);
      return special[Math.floor(Math.random() * special.length)];
    }

    // 每10位客人出现一个故事客人
    if (this.visitCount % 10 === 0) {
      const story = guests.filter(g => g.type === GuestType.STORY);
      return story[Math.floor(Math.random() * story.length)];
    }

    // 普通客人
    const common = guests.filter(g => g.type === GuestType.COMMON);
    return common[Math.floor(Math.random() * common.length)];
  }

  reset() {
    this.visitCount = 0;
  }
}
