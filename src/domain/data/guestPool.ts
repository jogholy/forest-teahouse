import { Guest, GuestType } from '../models/Guest';

export const guestPool: Guest[] = [
  {
    id: 'guest-001',
    name: '棉棉',
    type: GuestType.COMMON,
    avatar: '🐰',
    personality: '好奇、话多',
    favoriteTag: '清香',
    affection: 0,
    storyChapters: [
      {
        id: 'chapter-1',
        title: '初次见面',
        content: '棉棉是一只兔子记者，总是带着小本子记录森林里的故事...',
        unlocked: true,
        requiredAffection: 0,
      },
      {
        id: 'chapter-2',
        title: '采访任务',
        content: '棉棉正在调查森林深处的神秘事件...',
        unlocked: false,
        requiredAffection: 30,
      },
      {
        id: 'chapter-3',
        title: '真相大白',
        content: '原来那个神秘事件背后是...',
        unlocked: false,
        requiredAffection: 60,
      },
    ],
  },
  {
    id: 'guest-002',
    name: '咕咕',
    type: GuestType.SPECIAL,
    avatar: '🦉',
    personality: '沉稳、知性',
    favoriteTag: '苦涩',
    affection: 0,
    storyChapters: [
      {
        id: 'chapter-1',
        title: '夜访学者',
        content: '咕咕是一位猫头鹰学者，研究古老的森林历史...',
        unlocked: true,
        requiredAffection: 0,
      },
      {
        id: 'chapter-2',
        title: '失落的典籍',
        content: '咕咕在寻找一本失传已久的古籍...',
        unlocked: false,
        requiredAffection: 40,
      },
    ],
  },
  {
    id: 'guest-003',
    name: '阿狸',
    type: GuestType.STORY,
    avatar: '🦊',
    personality: '浪漫、忧郁',
    favoriteTag: '果香',
    affection: 0,
    storyChapters: [
      {
        id: 'chapter-1',
        title: '旅行者的故事',
        content: '阿狸是一位狐狸旅行家，走遍了世界各地...',
        unlocked: true,
        requiredAffection: 0,
      },
      {
        id: 'chapter-2',
        title: '失去的爱人',
        content: '阿狸在旅途中失去了最重要的人...',
        unlocked: false,
        requiredAffection: 50,
      },
      {
        id: 'chapter-3',
        title: '重逢',
        content: '在森林茶屋，阿狸找到了心灵的归宿...',
        unlocked: false,
        requiredAffection: 80,
      },
    ],
  },
];
