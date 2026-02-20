import { Ingredient, Rarity } from '../models/Ingredient';

export const ingredientPool: Ingredient[] = [
  // COMMON - 60% (8种)
  {
    id: 'common-001',
    name: '晨露茶叶',
    rarity: Rarity.COMMON,
    description: '清晨采摘的新鲜茶叶，带着露水的清香',
    tags: ['清香'],
  },
  {
    id: 'common-002',
    name: '野蜂蜜',
    rarity: Rarity.COMMON,
    description: '森林野蜂酿造的天然蜂蜜，甘甜醇厚',
    tags: ['甘甜'],
  },
  {
    id: 'common-003',
    name: '山泉水',
    rarity: Rarity.COMMON,
    description: '来自深山的清澈泉水，甘冽纯净',
    tags: ['清香'],
  },
  {
    id: 'common-004',
    name: '普通花瓣',
    rarity: Rarity.COMMON,
    description: '森林中常见的野花花瓣，淡雅芬芳',
    tags: ['花香'],
  },
  {
    id: 'common-005',
    name: '青柠片',
    rarity: Rarity.COMMON,
    description: '新鲜的青柠切片，酸爽提神',
    tags: ['果香'],
  },
  {
    id: 'common-006',
    name: '薄荷叶',
    rarity: Rarity.COMMON,
    description: '清凉的薄荷叶，带来舒爽的口感',
    tags: ['清香'],
  },
  {
    id: 'common-007',
    name: '红枣',
    rarity: Rarity.COMMON,
    description: '饱满的红枣，温润养生',
    tags: ['甘甜'],
  },
  {
    id: 'common-008',
    name: '桂花',
    rarity: Rarity.COMMON,
    description: '金黄的桂花，香气馥郁',
    tags: ['花香'],
  },

  // UNCOMMON - 30% (6种)
  {
    id: 'uncommon-001',
    name: '月光白茶',
    rarity: Rarity.UNCOMMON,
    description: '月光下采摘的白茶，清雅如月',
    tags: ['清香', '甘甜'],
  },
  {
    id: 'uncommon-002',
    name: '松针嫩芽',
    rarity: Rarity.UNCOMMON,
    description: '春日松树的嫩芽，带着森林的气息',
    tags: ['清香'],
  },
  {
    id: 'uncommon-003',
    name: '琥珀蜂蜜',
    rarity: Rarity.UNCOMMON,
    description: '陈年蜂蜜，色如琥珀，香甜浓郁',
    tags: ['甘甜'],
  },
  {
    id: 'uncommon-004',
    name: '晨雾露珠',
    rarity: Rarity.UNCOMMON,
    description: '清晨雾气凝结的露珠，纯净无暇',
    tags: ['清香'],
  },
  {
    id: 'uncommon-005',
    name: '玫瑰花瓣',
    rarity: Rarity.UNCOMMON,
    description: '娇艳的玫瑰花瓣，浪漫芬芳',
    tags: ['花香', '甘甜'],
  },
  {
    id: 'uncommon-006',
    name: '陈皮',
    rarity: Rarity.UNCOMMON,
    description: '陈年的橘皮，醇厚回甘',
    tags: ['果香', '苦涩'],
  },

  // RARE - 8% (4种)
  {
    id: 'rare-001',
    name: '星屑普洱',
    rarity: Rarity.RARE,
    description: '如星辰般闪耀的陈年普洱，韵味悠长',
    tags: ['苦涩', '甘甜'],
  },
  {
    id: 'rare-002',
    name: '千年灵芝露',
    rarity: Rarity.RARE,
    description: '千年灵芝分泌的甘露，珍贵稀有',
    tags: ['甘甜'],
  },
  {
    id: 'rare-003',
    name: '凤凰单丛',
    rarity: Rarity.RARE,
    description: '凤凰山的名贵茶叶，香气独特',
    tags: ['花香', '果香'],
  },
  {
    id: 'rare-004',
    name: '冰晶薄荷',
    rarity: Rarity.RARE,
    description: '雪山上的冰晶薄荷，清凉至极',
    tags: ['清香'],
  },

  // LEGENDARY - 2% (2种)
  {
    id: 'legendary-001',
    name: '时之茶叶',
    rarity: Rarity.LEGENDARY,
    description: '能让人回忆过去的神奇茶叶，泡茶可让客人讲述往事',
    tags: ['清香', '甘甜', '花香'],
  },
  {
    id: 'legendary-002',
    name: '梦境花瓣',
    rarity: Rarity.LEGENDARY,
    description: '来自梦境的花瓣，泡茶后客人会透露隐藏的秘密',
    tags: ['花香', '果香'],
  },
];
