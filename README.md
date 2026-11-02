# 贵州省研学综合服务网 Demo

面向研学课程、研学机构与教育局管理场景的静态 Web 产品原型，包含课程筛选、机构列表、机构详情、教育局工作台、响应式布局和本地图片资源。

## 在线预览

- GitHub Pages：<https://sean-daniel.github.io/gzyxw-yanxue-demo/>
- 机构列表：<https://sean-daniel.github.io/gzyxw-yanxue-demo/#institutions>
- 机构详情：<https://sean-daniel.github.io/gzyxw-yanxue-demo/#institution/2103288400209571842>
- 分账打款管理：<https://sean-daniel.github.io/gzyxw-yanxue-demo/settlement-management/admin.html>
- 分账打款记录：<https://sean-daniel.github.io/gzyxw-yanxue-demo/settlement-management/records.html>

## 本地运行

无需构建工具，直接打开 `index.html`，或在当前目录启动静态服务器：

```bash
python3 -m http.server 4173
```

访问：

- 课程页：`http://127.0.0.1:4173/#courses`
- 机构列表：`http://127.0.0.1:4173/#institutions`
- 机构详情：`http://127.0.0.1:4173/#institution/2103288400209571842`
- 教育局工作台：`http://127.0.0.1:4173/workbench/index.html`

## 教育局工作台

工作台为无需登录的静态原型，按真实页面的布局比例与数据复刻，入口为 `workbench/index.html`。

```text
workbench/
├── index.html              # 工作台页面结构
├── styles.css              # 桌面、平板与移动端视觉样式
├── app.js                  # 菜单、日历、地图与图表交互
└── assets/
    ├── data/               # 贵州省研学基地地图数据
    ├── icons/              # 菜单图标
    ├── images/             # Logo、地图、统计图标与空状态插图
    └── vendor/             # 本地 ECharts 依赖
```

支持侧栏展开/收起与分组菜单、账号菜单、全屏与字号切换、待办周切换、研学主题悬停提示，以及桌面、平板和移动端自适应布局。

研学地图使用腾讯地图 GL JS 渲染贵州省研学基地点位，支持聚合点展开、地图缩放拖动和基地信息窗。基地数据保存在本地，地图 SDK 与瓦片需要联网加载；离线或地图资源不可用时会保留静态底图。

## 工程结构

```text
.
├── index.html              # 页面骨架与三类视图容器
├── styles.css              # 全局视觉、组件和响应式样式
├── app.js                  # 路由、筛选、分页、弹窗、图集交互
├── courses-data.js         # 课程示例数据
├── institutions-data.js    # 研学机构示例数据
└── assets/                 # Logo、课程、机构、二维码等本地资源
```

## 主要能力

- 课程类别、适用学段、课程时间、课程类型组合筛选
- 课程搜索、结果计数、重置、分页和详情弹窗
- 研学机构栏目、所属区县筛选、搜索和分页
- 机构详情图集、简介、区县/地址和关联课程
- 桌面、平板、移动端响应式布局

主要交互路径与新增字段清单见 [REQUIREMENTS.md](REQUIREMENTS.md)。
