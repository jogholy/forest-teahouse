export interface TeaHouse {
  level: number;
  name: string;
  seats: number; // 座位数
  experience: number; // 经验值
  nextLevelExp: number; // 升级所需经验
}

export const teaHouseLevels: TeaHouse[] = [
  { level: 1, name: '林间小摊', seats: 1, experience: 0, nextLevelExp: 100 },
  { level: 2, name: '木屋茶室', seats: 2, experience: 100, nextLevelExp: 300 },
  { level: 3, name: '树屋茶馆', seats: 3, experience: 400, nextLevelExp: 600 },
  { level: 4, name: '森林茶屋', seats: 4, experience: 1000, nextLevelExp: 1000 },
  { level: 5, name: '梦幻茶庄', seats: 5, experience: 2000, nextLevelExp: 0 },
];
