# 贵州省研学综合服务网 Demo

面向研学课程与研学机构浏览场景的静态 Web 产品原型，包含课程筛选、机构列表、机构详情、响应式布局和本地图片资源。

## 在线预览

- GitHub Pages：<https://sean-daniel.github.io/gzyxw-yanxue-demo/>
- 机构列表：<https://sean-daniel.github.io/gzyxw-yanxue-demo/#institutions>
- 机构详情：<https://sean-daniel.github.io/gzyxw-yanxue-demo/#institution/2103288400209571842>

## 本地运行

无需构建工具，直接打开 `index.html`，或在当前目录启动静态服务器：

```bash
python3 -m http.server 4173
```

访问：

- 课程页：`http://127.0.0.1:4173/#courses`
- 机构列表：`http://127.0.0.1:4173/#institutions`
- 机构详情：`http://127.0.0.1:4173/#institution/2103288400209571842`

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
