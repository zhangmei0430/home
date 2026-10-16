# 财经快讯

一个自动更新的财经新闻页面。数据来源：华尔街见闻、东方财富、金十数据。

## 工作方式

GitHub Actions 运行抓取脚本，把最新新闻写入 `news.json`，并在同一次运行中直接
把页面部署到 GitHub Pages。电脑关机也能运行。

> 当前状态：定时更新已暂停（2026-10-16），页面显示最近一次抓取的数据。
> 要恢复每 2 小时自动更新，取消 `.github/workflows/update-news.yml` 中 `schedule` 的注释即可。

## 项目结构

- `index.html` / `app.js` / `styles.css` — 新闻列表页（读取 `news.json` 渲染）
- `scripts/fetch-news.mjs` — 抓取脚本：抓取 → 去重 → 写入 `news.json`
- `scripts/serve.mjs` — 本地预览：`node scripts/serve.mjs` 后访问 http://localhost:8000
- `.github/workflows/update-news.yml` — 更新任务配置（自动定时已暂停，当前仅手动运行）

## 手动更新

仓库 Actions 页面 → 左侧「更新财经快讯」→ 右侧 Run workflow，可立即手动刷新一次。
