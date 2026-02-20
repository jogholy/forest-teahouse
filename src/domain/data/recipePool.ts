import { Recipe } from '../models/Recipe';

export const recipePool: Recipe[] = [
  {
    id: 'recipe-001',
    name: '晨露清茶',
    description: '清晨的第一缕阳光',
    requiredIngredients: ['common-001', 'common-003'],
    effect: '提神醒脑',
  },
  {
    id: 'recipe-002',
    name: '蜜香花茶',
    description: '甜蜜与芬芳的结合',
    requiredIngredients: ['common-002', 'common-004'],
    effect: '心情愉悦',
  },
  {
    id: 'recipe-003',
    name: '月光白茶',
    description: '月光下的优雅',
    requiredIngredients: ['uncommon-001', 'common-003'],
    effect: '宁静安神',
  },
  {
    id: 'recipe-004',
    name: '星辰普洱',
    description: '如星辰般闪耀的陈年茶',
    requiredIngredients: ['rare-001', 'uncommon-003'],
    effect: '回味悠长',
  },
  {
    id: 'recipe-005',
    name: '时光之茶',
    description: '能让人回忆过去的神奇茶饮',
    requiredIngredients: ['legendary-001', 'uncommon-001'],
    effect: '触发客人回忆',
    story: '客人会讲述一段往事',
  },
];
