import { Guest, GuestType, StoryChapter } from '../models/Guest';

export class GuestEngine {
  private visitCount = 0;

  generateGuest(guests: Guest[]): Guest {
    this.visitCount++;

    if (this.visitCount % 5 === 0) {
      const special = guests.filter(g => g.type === GuestType.SPECIAL);
      return special[Math.floor(Math.random() * special.length)];
    }

    if (this.visitCount % 10 === 0) {
      const story = guests.filter(g => g.type === GuestType.STORY);
      return story[Math.floor(Math.random() * story.length)];
    }

    const common = guests.filter(g => g.type === GuestType.COMMON);
    return common[Math.floor(Math.random() * common.length)];
  }

  // 增加好感度
  addAffection(guest: Guest, amount: number): Guest {
    const newAffection = Math.min((guest.affection || 0) + amount, 100);
    return { ...guest, affection: newAffection };
  }

  // 解锁故事章节
  unlockChapters(guest: Guest): StoryChapter[] {
    if (!guest.storyChapters) return [];

    return guest.storyChapters.map(chapter => ({
      ...chapter,
      unlocked: chapter.unlocked || (guest.affection || 0) >= chapter.requiredAffection,
    }));
  }

  reset() {
    this.visitCount = 0;
  }
}
