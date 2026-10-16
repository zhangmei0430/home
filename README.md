# 工作台

个人工作台网页，包含 6 个模块：工作总览 / 行业新闻 / 风险审核 / 制度查询 / 人员统计 / 文稿报表。
线上地址：https://zhangmei0430.github.io/home/

## 模块说明

- 工作总览 — 快讯数、待审核风险、制度文件、在岗人员等汇总卡片 + 最新快讯 + 今日待办
- 行业新闻 — 财经/股市快讯（华尔街见闻 / 东方财富 / 金十数据，自动抓取）
- 风险审核 — 审核队列：按状态筛选，含风险等级与状态标签（当前为示例数据）
- 制度查询 — 制度清单：按名称/文号/部门搜索（当前为示例数据）
- 人员统计 — 人员汇总卡片 + 部门/岗位条形图（当前为示例数据）
- 文稿报表 — 报表清单与生成状态（当前为示例数据）

说明：4 个示例模块的数据在 `app.js` 顶部的 `SAMPLE` 对象中，替换即可换成真实数据。

## 工作方式

- 推送代码到 main 分支：自动部署到 GitHub Pages
- 抓取新闻：Actions 手动运行「更新网站」时抓取最新新闻写入 `news.json` 并重新部署
  （定时更新已暂停；恢复每 2 小时自动更新：取消 `.github/workflows/update-news.yml` 中 `schedule` 的注释）

## 项目结构

- `index.html` / `app.js` / `styles.css` — 工作台页面（app.js 内含各模块逻辑与示例数据）
- `scripts/fetch-news.mjs` — 抓取脚本：抓取 → 去重 → 写入 `news.json`
- `scripts/serve.mjs` — 本地预览：`node scripts/serve.mjs` 后访问 http://localhost:8000
- `.github/workflows/update-news.yml` — 更新与部署任务配置

## 手动更新

仓库 Actions 页面 → 左侧「更新网站」→ 右侧 Run workflow：抓取最新新闻并重新部署。
