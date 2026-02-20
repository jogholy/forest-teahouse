export enum GuestType {
  COMMON = 'COMMON',
  SPECIAL = 'SPECIAL',
  STORY = 'STORY',
}

export interface Guest {
  id: string;
  name: string;
  type: GuestType;
  avatar: string;
  personality: string;
  favoriteTag?: string;
  story?: string;
  affection?: number; // 好感度（0-100）
  storyChapters?: StoryChapter[]; // 故事章节
}

export interface StoryChapter {
  id: string;
  title: string;
  content: string;
  unlocked: boolean;
  requiredAffection: number; // 解锁所需好感度
}

export interface GuestVisit {
  guest: Guest;
  order?: string;
  satisfaction: number;
  dialogue: string[];
  affectionGain?: number; // 本次获得的好感度
}
