export enum CollectionMethod {
  AUTO = 'AUTO', // 自动采集：挂机进行，基础食材，效率较低
  MANUAL = 'MANUAL', // 手动采集：主动操作，触发暴击，稀有率+20%
  EVENT = 'EVENT', // 事件采集：随机触发，必得稀有以上食材
}

export interface CollectionResult {
  method: CollectionMethod;
  isCritical: boolean; // 是否暴击
  bonusRate: number; // 额外稀有率加成
}
