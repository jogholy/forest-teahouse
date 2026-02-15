# 🏗️ 森林茶屋 - 基础设施建设计划

## 项目经理视角：我不写代码，我管理团队

**角色定位：**
- 我（Opus 4.6）= 项目经理 + 架构师
- CodingPlan（Qwen3-Coder-Plus）= 开发团队（多个实例）
- Sonnet 4 = 技术顾问（复杂问题咨询）

**工作原则：**
- ✅ 拆解任务，分派给CodingPlan
- ✅ 审查代码，把控质量
- ✅ 协调资源，推进进度
- ❌ 不自己写代码（除非紧急情况）

---

## 一、基础设施架构总览

### 1.1 环境规划

```
┌─────────────────────────────────────────────────────────┐
│                    开发环境（本地）                      │
│  - 开发者本地机器                                        │
│  - Vite Dev Server (localhost:5173)                     │
│  - 热更新 + 快速迭代                                     │
└─────────────────────────────────────────────────────────┘
                          ↓ git push
┌─────────────────────────────────────────────────────────┐
│                  测试环境（本地服务器）                  │
│  - 本地Linux服务器 / Docker容器                          │
│  - 自动化测试 + 集成测试                                 │
│  - 内网访问：http://localhost:8080                       │
└─────────────────────────────────────────────────────────┘
                          ↓ CI/CD Pipeline
┌─────────────────────────────────────────────────────────┐
│              生产环境（阿里云ECS 120.27.140.143）        │
│  - Nginx + Docker                                        │
│  - HTTPS + CDN加速                                       │
│  - 公网访问：https://teahouse.game                       │
└─────────────────────────────────────────────────────────┘
```

### 1.2 技术栈确认

**前端：**
- Phaser 3 + React + TypeScript
- Vite 5.x（构建工具）
- PWA（离线支持）

**后端（Serverless优先）：**
- Supabase（开源BaaS）
  - PostgreSQL数据库
  - 实时订阅
  - 认证系统
  - 对象存储
- 备选：自建Node.js + Fastify

**CI/CD：**
- GitHub Actions（自动化流水线）
- Docker（容器化部署）
- Nginx（反向代理 + 静态资源）

**监控：**
- Sentry（错误追踪）
- Plausible Analytics（隐私友好的统计）

---

## 二、基础设施建设任务拆解

### 阶段0：环境准备（1天）

**任务0.1：本地开发环境搭建**
- 负责人：CodingPlan Agent #1
- 交付物：
  - [ ] 项目脚手架（Vite + Phaser + React + TypeScript）
  - [ ] ESLint + Prettier配置
  - [ ] Git Hooks（pre-commit检查）
  - [ ] README.md（开发指南）
- 验收标准：
  - `npm install && npm run dev` 一键启动
  - 访问 localhost:5173 看到欢迎页面
  - 提交代码自动格式化

**任务0.2：测试框架配置**
- 负责人：CodingPlan Agent #2
- 交付物：
  - [ ] Jest配置（单元测试）
  - [ ] Playwright配置（E2E测试）
  - [ ] 测试模板文件
  - [ ] 测试覆盖率报告配置
- 验收标准：
  - `npm test` 运行所有测试
  - 测试覆盖率报告生成
  - 示例测试通过

**任务0.3：Git仓库初始化**
- 负责人：我（项目经理）
- 交付物：
  - [ ] GitHub仓库创建
  - [ ] 分支策略文档（Git Flow）
  - [ ] .gitignore配置
  - [ ] 初始提交
- 验收标准：
  - 仓库可访问
  - 分支保护规则设置
  - CI/CD准备就绪

---

### 阶段1：本地测试环境（2天）

**任务1.1：Docker容器化**
- 负责人：CodingPlan Agent #3
- 交付物：
  - [ ] Dockerfile（多阶段构建）
  - [ ] docker-compose.yml（本地测试环境）
  - [ ] Nginx配置文件
  - [ ] 构建脚本
- 验收标准：
  - `docker-compose up` 启动完整环境
  - 访问 localhost:8080 看到应用
  - 热更新正常工作

**任务1.2：Supabase本地部署**
- 负责人：CodingPlan Agent #4
- 交付物：
  - [ ] Supabase本地实例（Docker）
  - [ ] 数据库Schema设计
  - [ ] 种子数据（测试用）
  - [ ] API接口文档
- 验收标准：
  - Supabase Studio可访问
  - 数据库表创建成功
  - API接口可调用

**任务1.3：自动化测试流程**
- 负责人：CodingPlan Agent #5
- 交付物：
  - [ ] 测试脚本（test.sh）
  - [ ] 测试数据准备脚本
  - [ ] 测试报告生成
  - [ ] 失败通知机制
- 验收标准：
  - 一键运行所有测试
  - 测试报告HTML格式
  - 失败时发送通知

---

### 阶段2：CI/CD流水线（2天）

**任务2.1：GitHub Actions配置**
- 负责人：CodingPlan Agent #6
- 交付物：
  - [ ] .github/workflows/ci.yml（持续集成）
  - [ ] .github/workflows/deploy-staging.yml（测试环境部署）
  - [ ] .github/workflows/deploy-prod.yml（生产环境部署）
  - [ ] Secrets配置文档
- 验收标准：
  - 提交代码自动跑测试
  - 测试通过自动部署到测试环境
  - main分支合并自动部署到生产环境

**任务2.2：构建优化**
- 负责人：CodingPlan Agent #7
- 交付物：
  - [ ] Vite构建配置优化
  - [ ] 代码分割策略
  - [ ] 资源压缩配置
  - [ ] 构建缓存策略
- 验收标准：
  - 构建时间 <2分钟
  - 初始包大小 <500KB
  - 构建产物可复现

**任务2.3：部署脚本**
- 负责人：CodingPlan Agent #8
- 交付物：
  - [ ] deploy.sh（部署脚本）
  - [ ] rollback.sh（回滚脚本）
  - [ ] health-check.sh（健康检查）
  - [ ] 部署文档
- 验收标准：
  - 一键部署到生产环境
  - 部署失败自动回滚
  - 健康检查通过才切流量

---

### 阶段3：生产环境部署（阿里云ECS）（2天）

**任务3.1：服务器环境配置**
- 负责人：CodingPlan Agent #9
- 交付物：
  - [ ] Docker安装脚本
  - [ ] Nginx安装配置
  - [ ] SSL证书配置（Let's Encrypt）
  - [ ] 防火墙规则
- 验收标准：
  - Docker运行正常
  - Nginx可访问
  - HTTPS证书有效
  - 只开放80/443端口

**任务3.2：Nginx配置优化**
- 负责人：CodingPlan Agent #10
- 交付物：
  - [ ] nginx.conf（生产配置）
  - [ ] Gzip压缩配置
  - [ ] 缓存策略配置
  - [ ] 反向代理配置
- 验收标准：
  - 静态资源缓存1年
  - Gzip压缩率 >70%
  - API请求正确代理
  - 日志正常记录

**任务3.3：监控与日志**
- 负责人：CodingPlan Agent #11
- 交付物：
  - [ ] Sentry集成（错误追踪）
  - [ ] Plausible Analytics集成（统计）
  - [ ] 日志收集配置
  - [ ] 告警规则配置
- 验收标准：
  - 前端错误自动上报Sentry
  - 用户行为统计可查看
  - 日志可查询
  - 关键错误触发告警

---

### 阶段4：数据库与存储（2天）

**任务4.1：Supabase生产环境**
- 负责人：CodingPlan Agent #12
- 交付物：
  - [ ] Supabase云端实例配置
  - [ ] 数据库Schema迁移脚本
  - [ ] 备份策略配置
  - [ ] 访问权限配置
- 验收标准：
  - 数据库可访问
  - 自动备份每日执行
  - RLS（行级安全）配置正确
  - API密钥安全存储

**任务4.2：对象存储配置**
- 负责人：CodingPlan Agent #13
- 交付物：
  - [ ] Supabase Storage配置
  - [ ] 图片上传接口
  - [ ] CDN加速配置
  - [ ] 访问策略配置
- 验收标准：
  - 图片上传成功
  - CDN加速生效
  - 公开资源可访问
  - 私有资源需认证

---

### 阶段5：开发工具链（1天）

**任务5.1：代码质量工具**
- 负责人：CodingPlan Agent #14
- 交付物：
  - [ ] SonarQube配置（代码质量分析）
  - [ ] Husky + lint-staged配置
  - [ ] Commitlint配置（提交信息规范）
  - [ ] 代码审查清单
- 验收标准：
  - 提交前自动Lint
  - 提交信息符合规范
  - 代码质量报告可查看
  - PR必须通过审查

**任务5.2：文档系统**
- 负责人：CodingPlan Agent #15
- 交付物：
  - [ ] API文档（Swagger/OpenAPI）
  - [ ] 组件文档（Storybook）
  - [ ] 开发指南（Wiki）
  - [ ] 部署手册
- 验收标准：
  - API文档自动生成
  - 组件可视化预览
  - 新人可根据文档上手
  - 部署流程清晰

---

## 三、任务分派策略

### 3.1 并行执行计划

**Day 1（阶段0）：**
- Agent #1: 项目脚手架
- Agent #2: 测试框架
- 我：Git仓库初始化

**Day 2-3（阶段1）：**
- Agent #3: Docker容器化
- Agent #4: Supabase本地部署
- Agent #5: 自动化测试流程

**Day 4-5（阶段2）：**
- Agent #6: GitHub Actions
- Agent #7: 构建优化
- Agent #8: 部署脚本

**Day 6-7（阶段3）：**
- Agent #9: 服务器环境
- Agent #10: Nginx配置
- Agent #11: 监控与日志

**Day 8-9（阶段4）：**
- Agent #12: Supabase生产环境
- Agent #13: 对象存储

**Day 10（阶段5）：**
- Agent #14: 代码质量工具
- Agent #15: 文档系统

**总时长：10天（2周）**

---

## 四、CodingPlan Agent使用规范

### 4.1 任务分派模板

每个任务使用 `sessions_spawn` 创建独立的CodingPlan子agent：

```typescript
// 任务分派示例
sessions_spawn({
  agentId: 'bailian-coding',  // 使用CodingPlan
  label: 'task-0.1-project-scaffold',
  task: `
你是开发团队成员，负责任务0.1：项目脚手架搭建

## 任务目标
创建 Vite + Phaser + React + TypeScript 项目脚手架

## 交付物
1. 完整的项目目录结构
2. package.json（包含所有依赖）
3. vite.config.ts（开发/生产配置）
4. tsconfig.json（TypeScript配置）
5. ESLint + Prettier配置
6. Git Hooks（pre-commit）
7. README.md（开发指南）

## 技术要求
- Vite 5.x
- Phaser 3.60+
- React 18
- TypeScript 5.x
- 支持PWA

## 验收标准
- npm install 无错误
- npm run dev 启动成功
- 访问 localhost:5173 看到欢迎页面
- 提交代码自动格式化

## 工作目录
/home/admin/openclaw/workspace/game-project/

## 注意事项
- 使用国内镜像源（npm config set registry https://registry.npmmirror.com）
- 所有依赖锁定版本
- 代码必须包含注释
- 完成后运行一次smoke test验证
`,
  model: 'bailian-coding/qwen3-coder-plus',
  runTimeoutSeconds: 600,  // 10分钟超时
  cleanup: 'keep'  // 保留session便于调试
});
```

### 4.2 任务验收流程

**我（项目经理）的职责：**

1. **任务分派前**：
   - 编写清晰的任务描述
   - 明确交付物和验收标准
   - 准备必要的参考资料

2. **任务执行中**：
   - 监控子agent进度（sessions_list）
   - 及时响应阻塞问题
   - 协调多个任务间的依赖

3. **任务完成后**：
   - 审查代码质量
   - 运行验收测试
   - 记录问题和改进点
   - 合并到主分支

**验收清单模板：**
```markdown
## 任务验收：[任务编号] [任务名称]

### 交付物检查
- [ ] 所有文件已提交
- [ ] 代码符合规范（ESLint通过）
- [ ] 注释完整清晰
- [ ] 无明显Bug

### 功能验证
- [ ] 验收标准1：[具体测试步骤]
- [ ] 验收标准2：[具体测试步骤]
- [ ] 验收标准3：[具体测试步骤]

### 集成测试
- [ ] 与现有代码无冲突
- [ ] 单元测试通过
- [ ] 构建成功

### 文档检查
- [ ] README更新
- [ ] API文档更新
- [ ] 注释完整

### 决策
- [ ] ✅ 通过，合并到develop分支
- [ ] ⚠️ 有问题，需要修复：[问题描述]
- [ ] ❌ 不通过，重新分派
```

---

## 五、阿里云ECS服务器配置

### 5.1 服务器信息

```
IP: 120.27.140.143
用户: root
SSH密钥: ~/openclaw-key.pem
网络: 国内网络正常，国外不通（无代理）
```

### 5.2 初始化脚本

**任务：服务器初始化**
- 负责人：CodingPlan Agent #16
- 交付物：
  - [ ] init-server.sh（服务器初始化脚本）
  - [ ] 安装Docker + Docker Compose
  - [ ] 安装Nginx
  - [ ] 配置防火墙
  - [ ] 配置国内镜像源
- 验收标准：
  - 脚本一键执行成功
  - Docker运行正常
  - Nginx可访问

**脚本要求：**
```bash
#!/bin/bash
# init-server.sh - 阿里云ECS初始化脚本

# 使用国内镜像源
# - Docker: 阿里云镜像加速
# - apt: mirrors.aliyun.com
# - npm: registry.npmmirror.com

# 安装内容
# - Docker + Docker Compose
# - Nginx
# - Node.js 18 LTS
# - Git
# - 基础工具（curl, wget, vim等）

# 安全配置
# - 防火墙规则（只开放80/443/22）
# - SSH密钥登录
# - 禁用root密码登录
```

### 5.3 部署目录结构

```
/opt/teahouse/
├── app/                    # 应用代码
│   ├── current/           # 当前版本（软链接）
│   ├── releases/          # 历史版本
│   │   ├── 20260215-001/
│   │   ├── 20260215-002/
│   │   └── ...
│   └── shared/            # 共享文件（配置、日志）
├── nginx/                 # Nginx配置
│   ├── nginx.conf
│   ├── ssl/              # SSL证书
│   └── logs/             # 日志
├── docker/                # Docker配置
│   └── docker-compose.yml
└── scripts/               # 运维脚本
    ├── deploy.sh
    ├── rollback.sh
    └── backup.sh
```

---

## 六、CI/CD流水线详细设计

### 6.1 持续集成（CI）流程

```yaml
# .github/workflows/ci.yml
name: Continuous Integration

on:
  push:
    branches: [develop, main]
  pull_request:
    branches: [develop, main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Unit tests
        run: npm run test:unit
      
      - name: Build
        run: npm run build
      
      - name: E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

### 6.2 测试环境部署流程

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
      
      - name: Build Docker image
        run: docker build -t teahouse:staging .
      
      - name: Deploy to local server
        run: |
          docker-compose -f docker-compose.staging.yml up -d
      
      - name: Health check
        run: ./scripts/health-check.sh http://localhost:8080
      
      - name: Notify team
        run: echo "Staging deployed successfully"
```

### 6.3 生产环境部署流程

```yaml
# .github/workflows/deploy-prod.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build
        run: npm run build
        env:
          VITE_API_URL: https://api.teahouse.game
      
      - name: Deploy to Aliyun ECS
        uses: appleboy/ssh-action@master
        with:
          host: 120.27.140.143
          username: root
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/teahouse
            ./scripts/deploy.sh ${{ github.sha }}
      
      - name: Health check
        run: ./scripts/health-check.sh https://teahouse.game
      
      - name: Rollback on failure
        if: failure()
        run: |
          ssh root@120.27.140.143 "cd /opt/teahouse && ./scripts/rollback.sh"
```

---

## 七、监控与告警

### 7.1 监控指标

**前端监控（Sentry）：**
- JavaScript错误
- 网络请求失败
- 性能指标（FCP, LCP, FID）
- 用户会话回放

**服务器监控：**
- CPU使用率
- 内存使用率
- 磁盘空间
- 网络流量

**应用监控：**
- 请求响应时间
- 错误率
- 并发用户数
- 数据库查询性能

### 7.2 告警规则

| 指标 | 阈值 | 告警级别 | 通知方式 |
|-----|------|---------|---------|
| 错误率 | >5% | P0 | Telegram立即通知 |
| 响应时间 | >3s | P1 | Telegram通知 |
| CPU使用率 | >80% | P1 | Telegram通知 |
| 磁盘空间 | <10% | P0 | Telegram立即通知 |
| 服务不可用 | 连续3次健康检查失败 | P0 | Telegram + 短信 |

---

## 八、项目管理工具

### 8.1 看板系统（GitHub Projects）

**列（Columns）：**
1. **Backlog**：待分派任务
2. **In Progress**：进行中（分派给CodingPlan）
3. **Review**：待审查（我来审查）
4. **Testing**：测试中
5. **Done**：已完成

**任务卡片模板：**
```markdown
## [任务编号] 任务名称

**负责人**：CodingPlan Agent #X
**优先级**：P0/P1/P2
**预计时间**：X小时
**依赖任务**：[任务编号]

### 描述
[任务详细描述]

### 交付物
- [ ] 交付物1
- [ ] 交付物2

### 验收标准
- [ ] 标准1
- [ ] 标准2

### 相关文档
- [设计文档链接]
- [API文档链接]
```

### 8.2 每日站会记录

**时间**：每天早上10:00
**时长**：15分钟
**参与者**：我（项目经理）+ 所有活跃的CodingPlan agents

**记录模板：**
```markdown
## 每日站会 - 2026-02-XX

### 昨天完成
- Agent #1: [任务] - ✅ 已完成
- Agent #2: [任务] - ⚠️ 遇到问题

### 今天计划
- Agent #3: [任务] - 预计完成
- Agent #4: [任务] - 进行中

### 阻塞问题
- 问题1: [描述] - 解决方案：[...]
- 问题2: [描述] - 需要协调：[...]

### 风险提示
- 风险1: [描述] - 应对措施：[...]
```

---

## 九、质量保证

### 9.1 代码审查清单

**基础检查：**
- [ ] 代码符合ESLint规则
- [ ] TypeScript类型完整
- [ ] 无console.log等调试代码
- [ ] 无硬编码配置

**功能检查：**
- [ ] 功能符合需求
- [ ] 边界条件处理
- [ ] 错误处理完善
- [ ] 性能可接受

**测试检查：**
- [ ] 单元测试覆盖率 >80%
- [ ] 关键路径有E2E测试
- [ ] 测试用例有意义

**文档检查：**
- [ ] 函数/类有注释
- [ ] 复杂逻辑有说明
- [ ] README更新

### 9.2 测试策略

**单元测试（Jest）：**
- 领域层：100%覆盖
- 应用层：>80%覆盖
- 基础设施层：>60%覆盖

**集成测试：**
- API接口测试
- 数据库操作测试
- 第三方服务Mock测试

**E2E测试（Playwright）：**
- 核心用户流程
- 关键业务场景
- 跨浏览器兼容性

---

## 十、下一步行动

### 10.1 立即执行（今天）

**我（项目经理）的任务：**
1. [ ] 创建GitHub仓库
2. [ ] 设置分支保护规则
3. [ ] 配置GitHub Projects看板
4. [ ] 准备所有任务卡片
5. [ ] 分派第一批任务（阶段0）

**第一批任务分派：**
```bash
# 任务0.1：项目脚手架
sessions_spawn --agent bailian-coding --label task-0.1 --task "..."

# 任务0.2：测试框架
sessions_spawn --agent bailian-coding --label task-0.2 --task "..."

# 任务3.1：服务器初始化（可并行）
sessions_spawn --agent bailian-coding --label task-3.1 --task "..."
```

### 10.2 本周目标（Week 1）

**Day 1-2：基础设施搭建**
- 完成阶段0（开发环境）
- 完成阶段3（服务器初始化）

**Day 3-4：测试环境**
- 完成阶段1（Docker + Supabase）

**Day 5：CI/CD**
- 完成阶段2（GitHub Actions）

### 10.3 下周目标（Week 2）

**Day 6-7：生产环境**
- 完成阶段3（Nginx + 监控）

**Day 8-9：数据库**
- 完成阶段4（Supabase生产环境）

**Day 10：收尾**
- 完成阶段5（工具链）
- 整体验收

---

## 十一、成功标准

### 11.1 基础设施验收标准

**开发环境：**
- ✅ 新人可在30分钟内启动项目
- ✅ 热更新响应时间 <1秒
- ✅ 代码提交自动检查

**测试环境：**
- ✅ 自动化测试覆盖率 >70%
- ✅ 测试环境与生产环境一致
- ✅ 测试失败自动通知

**生产环境：**
- ✅ 部署时间 <5分钟
- ✅ 零停机部署
- ✅ 自动回滚机制
- ✅ 监控告警正常

**CI/CD：**
- ✅ 提交到部署全自动化
- ✅ 构建时间 <3分钟
- ✅ 部署成功率 >95%

### 11.2 团队协作验收标准

**任务管理：**
- ✅ 所有任务可追踪
- ✅ 任务状态实时更新
- ✅ 阻塞问题及时暴露

**代码质量：**
- ✅ 代码审查通过率 100%
- ✅ 测试覆盖率达标
- ✅ 无P0级别Bug

**文档完整性：**
- ✅ 所有系统有文档
- ✅ 新人可根据文档上手
- ✅ 部署流程清晰

---

## 十二、总结

**我的角色定位：**
- 🎯 项目经理：拆解任务，分派工作，把控进度
- 🏗️ 架构师：设计系统，制定规范，审查质量
- 🚫 不是码农：不自己写代码，让CodingPlan团队干活

**工作流程：**
1. 拆解任务 → 编写清晰的任务描述
2. 分派任务 → 使用sessions_spawn创建CodingPlan子agent
3. 监控进度 → 使用sessions_list查看状态
4. 审查成果 → 验收标准检查，代码审查
5. 合并代码 → 通过后合并到主分支
6. 持续改进 → 记录问题，优化流程

**下一步：**
准备好开始了吗？我现在就可以：
1. 创建GitHub仓库
2. 分派第一批任务给CodingPlan团队
3. 开始10天基础设施建设冲刺

需要我立即开始吗？🚀
