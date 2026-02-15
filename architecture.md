# 🌐 森林茶屋 - Web优先技术架构

## 一、技术选型调整（Web优先）

### 1.1 前端技术栈

**游戏引擎选择：Phaser 3 + PixiJS**

理由：
- ✅ 纯Web技术栈，无需插件
- ✅ 轻量级，首屏加载快
- ✅ 2D游戏成熟方案
- ✅ TypeScript原生支持
- ✅ 渐进式Web应用（PWA）支持
- ✅ 未来可用Capacitor/Tauri打包原生App

**核心技术：**
- **游戏引擎**：Phaser 3.60+ (Canvas/WebGL渲染)
- **渲染层**：PixiJS 7.x (底层渲染引擎)
- **语言**：TypeScript 5.x
- **构建工具**：Vite 5.x (快速HMR)
- **UI框架**：React 18 (游戏外壳) + Phaser (游戏内)
- **状态管理**：Zustand (轻量) + Phaser Events
- **动画**：Spine Web Player / DragonBones
- **PWA**：Workbox (离线缓存)

**备选方案：**
- **Cocos Creator Web版**：如果需要更强的跨平台能力
- **Three.js**：如果未来需要3D扩展

---

## 二、分层架构设计

### 2.1 整体架构图

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  React UI    │  │ Phaser Scenes│  │  UI Components│  │
│  │  (外壳界面)  │  │  (游戏场景)  │  │  (游戏内UI)  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓ ↑
┌─────────────────────────────────────────────────────────┐
│                   Application Layer                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Game Manager │  │ State Manager│  │ Event Bus    │  │
│  │ (游戏流程)   │  │ (状态管理)   │  │ (事件通信)   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓ ↑
┌─────────────────────────────────────────────────────────┐
│                     Domain Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Game Logic   │  │ Business Rules│  │ Domain Models│  │
│  │ (核心玩法)   │  │ (业务规则)   │  │ (领域模型)   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓ ↑
┌─────────────────────────────────────────────────────────┐
│                 Infrastructure Layer                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Data Access  │  │ Network      │  │ Storage      │  │
│  │ (数据访问)   │  │ (网络请求)   │  │ (本地存储)   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 三、详细分层设计

### 3.1 Presentation Layer（表现层）

**职责**：用户交互、视图渲染、输入处理

**目录结构：**
```
src/presentation/
├── react/                 # React外壳
│   ├── App.tsx           # 应用入口
│   ├── layouts/          # 布局组件
│   ├── pages/            # 页面组件
│   └── components/       # 通用组件
├── phaser/               # Phaser游戏
│   ├── scenes/           # 游戏场景
│   │   ├── BootScene.ts      # 启动场景
│   │   ├── PreloadScene.ts   # 资源加载
│   │   ├── MainScene.ts      # 茶屋主场景
│   │   ├── ForestScene.ts    # 森林采集场景
│   │   └── LabScene.ts       # 试茶台场景
│   ├── ui/               # 游戏内UI
│   │   ├── dialogs/          # 对话框
│   │   ├── panels/           # 面板
│   │   └── widgets/          # 小组件
│   └── animations/       # 动画控制器
└── styles/               # 样式文件
```

**关键设计：**
- React负责游戏外壳（登录、设置、商城）
- Phaser负责游戏核心（场景、角色、交互）
- 两者通过EventBus通信，解耦

**示例代码：**
```typescript
// src/presentation/phaser/scenes/MainScene.ts
export class MainScene extends Phaser.Scene {
  private gameManager: GameManager;
  
  constructor() {
    super({ key: 'MainScene' });
  }
  
  create() {
    // 依赖注入GameManager（来自Application Layer）
    this.gameManager = ServiceLocator.get<GameManager>('GameManager');
    
    // 监听领域事件
    EventBus.on('guest:arrived', this.onGuestArrived, this);
    
    // 渲染场景
    this.renderTeahouse();
  }
  
  private onGuestArrived(guest: Guest) {
    // 表现层只负责渲染，不包含业务逻辑
    this.showGuestAnimation(guest);
  }
}
```

---

### 3.2 Application Layer（应用层）

**职责**：协调领域层，处理用户用例，管理应用状态

**目录结构：**
```
src/application/
├── managers/             # 管理器
│   ├── GameManager.ts        # 游戏总控
│   ├── SceneManager.ts       # 场景切换
│   └── AudioManager.ts       # 音频管理
├── services/             # 应用服务
│   ├── GachaService.ts       # 抽卡服务
│   ├── RecipeService.ts      # 配方服务
│   └── GuestService.ts       # 客人服务
├── state/                # 状态管理
│   ├── stores/               # Zustand stores
│   │   ├── playerStore.ts
│   │   ├── inventoryStore.ts
│   │   └── guestStore.ts
│   └── slices/               # 状态切片
└── usecases/             # 用例（Use Cases）
    ├── CollectIngredient.ts  # 采集食材用例
    ├── BrewTea.ts            # 泡茶用例
    └── ServeGuest.ts         # 接待客人用例
```

**关键设计：**
- 用例（Use Case）封装完整的业务流程
- 服务（Service）提供可复用的应用逻辑
- 状态管理集中化，单向数据流

**示例代码：**
```typescript
// src/application/usecases/CollectIngredient.ts
export class CollectIngredientUseCase {
  constructor(
    private gachaService: GachaService,
    private inventoryRepo: InventoryRepository,
    private eventBus: EventBus
  ) {}
  
  async execute(location: ForestLocation): Promise<Ingredient> {
    // 1. 调用领域层的Gacha逻辑
    const ingredient = this.gachaService.roll(location);
    
    // 2. 持久化到仓库
    await this.inventoryRepo.addIngredient(ingredient);
    
    // 3. 发布领域事件
    this.eventBus.emit('ingredient:collected', ingredient);
    
    // 4. 返回结果
    return ingredient;
  }
}
```

---

### 3.3 Domain Layer（领域层）

**职责**：核心业务逻辑，领域模型，业务规则（与技术无关）

**目录结构：**
```
src/domain/
├── models/               # 领域模型（实体 + 值对象）
│   ├── Ingredient.ts         # 食材实体
│   ├── Recipe.ts             # 配方实体
│   ├── Guest.ts              # 客人实体
│   ├── Tea.ts                # 茶饮实体
│   ├── Player.ts             # 玩家实体
│   └── Teahouse.ts           # 茶屋实体
├── value-objects/        # 值对象
│   ├── Rarity.ts             # 稀有度
│   ├── Flavor.ts             # 风味
│   └── Satisfaction.ts       # 满意度
├── services/             # 领域服务
│   ├── GachaEngine.ts        # 抽卡引擎
│   ├── RecipeMatcher.ts      # 配方匹配
│   └── SatisfactionCalculator.ts  # 满意度计算
├── repositories/         # 仓储接口（不包含实现）
│   ├── IInventoryRepository.ts
│   ├── IRecipeRepository.ts
│   └── IGuestRepository.ts
├── events/               # 领域事件
│   ├── IngredientCollected.ts
│   ├── RecipeUnlocked.ts
│   └── GuestServed.ts
└── rules/                # 业务规则
    ├── GachaRules.ts         # 抽卡规则（概率、保底）
    ├── RecipeRules.ts        # 配方规则（匹配逻辑）
    └── UpgradeRules.ts       # 升级规则
```

**关键设计：**
- 领域模型是纯TypeScript类，不依赖任何框架
- 业务规则集中在领域层，易于测试
- 仓储接口定义在领域层，实现在基础设施层（依赖倒置）

**示例代码：**
```typescript
// src/domain/models/Ingredient.ts
export class Ingredient {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly rarity: Rarity,
    public readonly flavors: Flavor[],
    public readonly description: string
  ) {}
  
  // 领域逻辑：判断是否匹配某种风味
  hasFlavorTag(flavor: Flavor): boolean {
    return this.flavors.includes(flavor);
  }
  
  // 领域逻辑：计算与另一食材的风味契合度
  calculateCompatibility(other: Ingredient): number {
    const commonFlavors = this.flavors.filter(f => 
      other.flavors.includes(f)
    );
    return commonFlavors.length / Math.max(this.flavors.length, other.flavors.length);
  }
}

// src/domain/value-objects/Rarity.ts
export class Rarity {
  static readonly COMMON = new Rarity('Common', 0.60);
  static readonly UNCOMMON = new Rarity('Uncommon', 0.30);
  static readonly RARE = new Rarity('Rare', 0.08);
  static readonly LEGENDARY = new Rarity('Legendary', 0.02);
  
  private constructor(
    public readonly name: string,
    public readonly probability: number
  ) {}
  
  isRarerThan(other: Rarity): boolean {
    return this.probability < other.probability;
  }
}

// src/domain/services/GachaEngine.ts
export class GachaEngine {
  private pityCounter = 0; // 保底计数器
  
  roll(): Rarity {
    this.pityCounter++;
    
    // 保底机制（业务规则）
    if (this.pityCounter >= 50) {
      this.pityCounter = 0;
      return Rarity.LEGENDARY;
    }
    if (this.pityCounter >= 10) {
      this.pityCounter = 0;
      return Rarity.RARE;
    }
    
    // 正常概率抽取
    const rand = Math.random();
    if (rand < 0.02) return Rarity.LEGENDARY;
    if (rand < 0.10) return Rarity.RARE;
    if (rand < 0.40) return Rarity.UNCOMMON;
    return Rarity.COMMON;
  }
}

// src/domain/repositories/IInventoryRepository.ts (接口)
export interface IInventoryRepository {
  addIngredient(ingredient: Ingredient): Promise<void>;
  getIngredients(): Promise<Ingredient[]>;
  removeIngredient(id: string): Promise<void>;
}
```

---

### 3.4 Infrastructure Layer（基础设施层）

**职责**：技术实现，数据持久化，外部服务集成

**目录结构：**
```
src/infrastructure/
├── repositories/         # 仓储实现
│   ├── LocalInventoryRepository.ts   # 本地存储实现
│   ├── RemoteInventoryRepository.ts  # 远程API实现
│   └── HybridInventoryRepository.ts  # 混合实现（离线优先）
├── storage/              # 存储适配器
│   ├── LocalStorageAdapter.ts
│   ├── IndexedDBAdapter.ts
│   └── CloudStorageAdapter.ts
├── network/              # 网络层
│   ├── HttpClient.ts         # HTTP客户端
│   ├── WebSocketClient.ts    # WebSocket客户端
│   └── api/                  # API接口定义
│       ├── AuthAPI.ts
│       ├── GameAPI.ts
│       └── SocialAPI.ts
├── assets/               # 资源加载
│   ├── AssetLoader.ts
│   └── AssetManifest.ts
└── config/               # 配置管理
    ├── GameConfig.ts
    └── EnvironmentConfig.ts
```

**关键设计：**
- 实现领域层定义的仓储接口
- 适配器模式隔离外部依赖
- 支持多种存储策略（本地/云端/混合）

**示例代码：**
```typescript
// src/infrastructure/repositories/HybridInventoryRepository.ts
export class HybridInventoryRepository implements IInventoryRepository {
  constructor(
    private localStorage: IndexedDBAdapter,
    private cloudStorage: CloudStorageAdapter,
    private syncQueue: SyncQueue
  ) {}
  
  async addIngredient(ingredient: Ingredient): Promise<void> {
    // 1. 立即写入本地（离线优先）
    await this.localStorage.set(`ingredient:${ingredient.id}`, ingredient);
    
    // 2. 加入同步队列（后台同步到云端）
    this.syncQueue.enqueue({
      type: 'add_ingredient',
      data: ingredient,
      timestamp: Date.now()
    });
    
    // 3. 尝试立即同步（网络可用时）
    if (navigator.onLine) {
      await this.cloudStorage.sync();
    }
  }
  
  async getIngredients(): Promise<Ingredient[]> {
    // 优先从本地读取（快速响应）
    const local = await this.localStorage.getAll('ingredient:*');
    
    // 后台拉取云端更新
    this.cloudStorage.pull().catch(err => {
      console.warn('Cloud sync failed:', err);
    });
    
    return local;
  }
}

// src/infrastructure/storage/IndexedDBAdapter.ts
export class IndexedDBAdapter {
  private db: IDBDatabase;
  
  async set(key: string, value: any): Promise<void> {
    const tx = this.db.transaction('gameData', 'readwrite');
    const store = tx.objectStore('gameData');
    await store.put({ key, value, updatedAt: Date.now() });
  }
  
  async get<T>(key: string): Promise<T | null> {
    const tx = this.db.transaction('gameData', 'readonly');
    const store = tx.objectStore('gameData');
    const result = await store.get(key);
    return result?.value || null;
  }
}
```

---

## 四、跨层通信机制

### 4.1 依赖注入（DI）

使用轻量级DI容器管理依赖关系：

```typescript
// src/core/ServiceLocator.ts
export class ServiceLocator {
  private static services = new Map<string, any>();
  
  static register<T>(name: string, instance: T): void {
    this.services.set(name, instance);
  }
  
  static get<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not found`);
    }
    return service;
  }
}

// 应用启动时注册服务
export function bootstrapServices() {
  // Infrastructure Layer
  const localStorage = new IndexedDBAdapter();
  const cloudStorage = new CloudStorageAdapter();
  const inventoryRepo = new HybridInventoryRepository(localStorage, cloudStorage);
  
  ServiceLocator.register('InventoryRepository', inventoryRepo);
  
  // Domain Layer
  const gachaEngine = new GachaEngine();
  ServiceLocator.register('GachaEngine', gachaEngine);
  
  // Application Layer
  const gachaService = new GachaService(gachaEngine, inventoryRepo);
  ServiceLocator.register('GachaService', gachaService);
  
  const gameManager = new GameManager(gachaService);
  ServiceLocator.register('GameManager', gameManager);
}
```

### 4.2 事件总线（Event Bus）

解耦层与层之间的通信：

```typescript
// src/core/EventBus.ts
export class EventBus {
  private listeners = new Map<string, Set<Function>>();
  
  on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }
  
  off(event: string, callback: Function): void {
    this.listeners.get(event)?.delete(callback);
  }
  
  emit(event: string, data?: any): void {
    this.listeners.get(event)?.forEach(cb => cb(data));
  }
}

// 使用示例
EventBus.on('ingredient:collected', (ingredient: Ingredient) => {
  // Presentation Layer监听，更新UI
  console.log('UI: Show ingredient collected animation');
});

EventBus.on('ingredient:collected', (ingredient: Ingredient) => {
  // Application Layer监听，更新状态
  playerStore.getState().addIngredient(ingredient);
});
```

---

## 五、平台扩展策略

### 5.1 渐进式增强路线图

```
Phase 1: Web游戏（PWA）
  ↓
Phase 2: 桌面应用（Tauri/Electron）
  ↓
Phase 3: 移动原生（Capacitor）
  ↓
Phase 4: 小程序（微信/支付宝）
```

### 5.2 平台适配层设计

```typescript
// src/platform/IPlatformAdapter.ts
export interface IPlatformAdapter {
  // 存储
  saveData(key: string, value: any): Promise<void>;
  loadData(key: string): Promise<any>;
  
  // 支付
  purchase(productId: string): Promise<boolean>;
  
  // 分享
  share(content: ShareContent): Promise<void>;
  
  // 通知
  showNotification(message: string): Promise<void>;
  
  // 平台特性
  getPlatformInfo(): PlatformInfo;
}

// src/platform/WebPlatformAdapter.ts
export class WebPlatformAdapter implements IPlatformAdapter {
  async saveData(key: string, value: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  async purchase(productId: string): Promise<boolean> {
    // Web支付（Stripe/PayPal）
    return await StripePayment.checkout(productId);
  }
  
  async share(content: ShareContent): Promise<void> {
    // Web Share API
    if (navigator.share) {
      await navigator.share(content);
    } else {
      // 降级方案：复制链接
      await navigator.clipboard.writeText(content.url);
    }
  }
  
  getPlatformInfo(): PlatformInfo {
    return {
      platform: 'web',
      version: '1.0.0',
      capabilities: ['pwa', 'webgl', 'indexeddb']
    };
  }
}

// src/platform/CapacitorPlatformAdapter.ts (未来扩展)
export class CapacitorPlatformAdapter implements IPlatformAdapter {
  async saveData(key: string, value: any): Promise<void> {
    // 使用Capacitor Storage插件
    await Storage.set({ key, value: JSON.stringify(value) });
  }
  
  async purchase(productId: string): Promise<boolean> {
    // 使用Capacitor IAP插件
    return await InAppPurchase.buy(productId);
  }
  
  // ... 其他平台特定实现
}
```

### 5.3 构建配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '森林茶屋',
        short_name: '茶屋',
        description: '治愈系茶文化经营游戏',
        theme_color: '#8B9A7C',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // 离线缓存策略
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.teahouse\.game\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24小时
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30天
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'phaser': ['phaser'],
          'react-vendor': ['react', 'react-dom'],
          'game-core': [
            './src/domain',
            './src/application'
          ]
        }
      }
    }
  }
});
```

---

## 六、性能优化策略

### 6.1 资源加载优化

**分包加载策略：**
```
初始包（<500KB）：
  - 核心引擎
  - 启动场景
  - 基础UI

动态加载：
  - 场景资源（按需加载）
  - 角色立绘（懒加载）
  - 音频文件（延迟加载）
```

**实现示例：**
```typescript
// src/infrastructure/assets/AssetLoader.ts
export class AssetLoader {
  private loadedScenes = new Set<string>();
  
  async loadSceneAssets(sceneName: string): Promise<void> {
    if (this.loadedScenes.has(sceneName)) return;
    
    const manifest = await import(`./manifests/${sceneName}.json`);
    
    // 并行加载资源
    await Promise.all([
      this.loadImages(manifest.images),
      this.loadSpines(manifest.spines),
      this.loadAudios(manifest.audios)
    ]);
    
    this.loadedScenes.add(sceneName);
  }
  
  private async loadImages(urls: string[]): Promise<void> {
    // 使用Image对象预加载
    await Promise.all(
      urls.map(url => new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      }))
    );
  }
}
```

### 6.2 渲染优化

**对象池（Object Pool）：**
```typescript
// src/core/ObjectPool.ts
export class ObjectPool<T> {
  private pool: T[] = [];
  
  constructor(
    private factory: () => T,
    private reset: (obj: T) => void,
    initialSize = 10
  ) {
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.factory());
    }
  }
  
  acquire(): T {
    return this.pool.pop() || this.factory();
  }
  
  release(obj: T): void {
    this.reset(obj);
    this.pool.push(obj);
  }
}

// 使用示例：粒子效果对象池
const particlePool = new ObjectPool(
  () => new Phaser.GameObjects.Sprite(scene, 0, 0, 'particle'),
  (sprite) => {
    sprite.setVisible(false);
    sprite.setPosition(0, 0);
  },
  50
);
```

### 6.3 网络优化

**离线优先策略：**
```typescript
// src/infrastructure/network/OfflineFirstClient.ts
export class OfflineFirstClient {
  private syncQueue: SyncQueue;
  
  async request<T>(endpoint: string, data: any): Promise<T> {
    // 1. 立即返回乐观更新结果
    const optimisticResult = this.applyOptimisticUpdate(data);
    
    // 2. 加入同步队列
    this.syncQueue.enqueue({
      endpoint,
      data,
      timestamp: Date.now()
    });
    
    // 3. 后台同步
    this.backgroundSync();
    
    return optimisticResult;
  }
  
  private async backgroundSync(): Promise<void> {
    if (!navigator.onLine) return;
    
    while (this.syncQueue.hasItems()) {
      const item = this.syncQueue.dequeue();
      try {
        await fetch(item.endpoint, {
          method: 'POST',
          body: JSON.stringify(item.data)
        });
      } catch (err) {
        // 失败重新入队
        this.syncQueue.enqueue(item);
        break;
      }
    }
  }
}
```

---

## 七、测试策略（分层测试）

### 7.1 领域层测试（纯逻辑，最易测试）

```typescript
// tests/domain/services/GachaEngine.test.ts
describe('GachaEngine', () => {
  let engine: GachaEngine;
  
  beforeEach(() => {
    engine = new GachaEngine();
  });
  
  it('should guarantee Rare after 10 rolls', () => {
    const results: Rarity[] = [];
    for (let i = 0; i < 10; i++) {
      results.push(engine.roll());
    }
    
    const hasRareOrBetter = results.some(r => 
      r === Rarity.RARE || r === Rarity.LEGENDARY
    );
    expect(hasRareOrBetter).toBe(true);
  });
  
  it('should guarantee Legendary after 50 rolls', () => {
    const results: Rarity[] = [];
    for (let i = 0; i < 50; i++) {
      results.push(engine.roll());
    }
    
    const hasLegendary = results.some(r => r === Rarity.LEGENDARY);
    expect(hasLegendary).toBe(true);
  });
});
```

### 7.2 应用层测试（Mock仓储）

```typescript
// tests/application/usecases/CollectIngredient.test.ts
describe('CollectIngredientUseCase', () => {
  let useCase: CollectIngredientUseCase;
  let mockRepo: jest.Mocked<IInventoryRepository>;
  let mockGacha: jest.Mocked<GachaService>;
  
  beforeEach(() => {
    mockRepo = {
      addIngredient: jest.fn(),
      getIngredients: jest.fn(),
      removeIngredient: jest.fn()
    };
    
    mockGacha = {
      roll: jest.fn().mockReturnValue(
        new Ingredient('1', '晨露茶叶', Rarity.COMMON, [], '')
      )
    };
    
    useCase = new CollectIngredientUseCase(
      mockGacha,
      mockRepo,
      new EventBus()
    );
  });
  
  it('should add ingredient to inventory', async () => {
    await useCase.execute({ x: 0, y: 0 });
    
    expect(mockRepo.addIngredient).toHaveBeenCalledTimes(1);
    expect(mockRepo.addIngredient).toHaveBeenCalledWith(
      expect.objectContaining({ name: '晨露茶叶' })
    );
  });
});
```

### 7.3 表现层测试（E2E）

```typescript
// tests/e2e/collect-flow.spec.ts
import { test, expect } from '@playwright/test';

test('complete ingredient collection flow', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // 1. 等待游戏加载
  await page.waitForSelector('.game-canvas');
  
  // 2. 进入森林场景
  await page.click('[data-testid="forest-button"]');
  await page.waitForSelector('.forest-scene');
  
  // 3. 点击采集点
  await page.click('.glowing-plant');
  
  // 4. 验证获得食材
  await expect(page.locator('.ingredient-popup')).toBeVisible();
  await expect(page.locator('.ingredient-name')).toContainText('茶叶');
  
  // 5. 验证背包更新
  await page.click('[data-testid="inventory-button"]');
  await expect(page.locator('.inventory-item')).toHaveCount(1);
});
```

---

## 八、部署方案

### 8.1 开发环境

```bash
# 本地开发
npm run dev

# 访问 http://localhost:5173
```

### 8.2 测试环境

```yaml
# .github/workflows/deploy-staging.yml
name: Deploy to Staging

on:
  push:
    branches: [develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
        env:
          VITE_API_URL: https://api-staging.teahouse.game
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### 8.3 生产环境

**CDN部署（推荐）：**
- Vercel / Netlify / Cloudflare Pages
- 自动HTTPS、全球CDN、边缘计算

**自建部署：**
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 九、总结

### 9.1 架构优势

✅ **Web优先**：无需安装，任何设备即开即玩
✅ **分层清晰**：领域逻辑与技术实现解耦
✅ **易于测试**：TDD友好，各层独立测试
✅ **平台无关**：核心逻辑可复用到任何平台
✅ **渐进增强**：从PWA到原生App平滑过渡
✅ **离线优先**：网络不稳定也能流畅游玩

### 9.2 技术栈总览

| 层级 | 技术选型 | 职责 |
|-----|---------|------|
| Presentation | Phaser 3 + React | 渲染、交互 |
| Application | TypeScript + Zustand | 用例、状态管理 |
| Domain | Pure TypeScript | 业务逻辑、领域模型 |
| Infrastructure | IndexedDB + Fetch API | 存储、网络 |

### 9.3 下一步行动

1. [ ] 创建项目脚手架（Vite + Phaser + React）
2. [ ] 搭建分层目录结构
3. [ ] 编写第一个领域模型测试（Ingredient）
4. [ ] 实现GachaEngine核心逻辑
5. [ ] 创建PreloadScene加载资源

**准备好开始编码了吗？🚀**
