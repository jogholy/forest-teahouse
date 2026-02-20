import { Guest, GuestType } from '../models/Guest';

export const guestPool: Guest[] = [
  {
    id: 'guest-001',
    name: '小鹿',
    type: GuestType.COMMON,
    avatar: '🦌',
    personality: '温柔安静',
    favoriteTag: '清香',
  },
  {
    id: 'guest-002',
    name: '松鼠',
    type: GuestType.COMMON,
    avatar: '🐿️',
    personality: '活泼好动',
    favoriteTag: '甘甜',
  },
  {
    id: 'guest-003',
    name: '狐狸',
    type: GuestType.SPECIAL,
    avatar: '🦊',
    personality: '聪明狡黠',
    favoriteTag: '苦涩',
  },
  {
    id: 'guest-004',
    name: '老者',
    type: GuestType.STORY,
    avatar: '🧙',
    personality: '睿智沧桑',
    story: '曾是森林的守护者，寻找失落的记忆',
  },
];
