# 硬件作品集网站

纯静态站点，无需安装依赖、无需构建，把 `site` 文件夹整个上传即可访问。
页面只放作品和邮箱，没有其他内容。

## 文件结构

```
site/
├── index.html          页面内容（项目说明、图注、邮箱都在这里改）
├── styles.css          配色与排版
├── main.js             点图看大图（方向键 / 手机滑动切换）
└── images/
    ├── thumb/          页面用的小图（约 50–190 KB）
    ├── full/           点开后看的大图（约 120–950 KB）
    └── favicon.svg     浏览器标签页图标
```

原始照片（每张 0.4–3.8 MB）保持原样放在上一层文件夹，网页里用的是压缩副本，
整站 8 MB 左右。

## 本地预览

在 `site` 文件夹里执行 `python -m http.server 8000`，浏览器打开 http://localhost:8000 。

## 上线（三选一）

### 方式 A：Netlify Drop（最快，约 1 分钟）

1. 打开 https://app.netlify.com/drop
2. 把 `site` 文件夹直接拖进网页
3. 拿到形如 `https://xxxx.netlify.app` 的网址，可免费改名

### 方式 B：GitHub Pages（长期维护更合适，免费）

1. GitHub 新建仓库，例如 `hardware-portfolio`（选 Public）
2. 把 `site` 里的文件上传到仓库根目录（`index.html` 必须在根目录）
3. Settings → Pages → Source 选 `Deploy from a branch`，
   Branch 选 `main`、目录选 `/ (root)`，保存
4. 约 1 分钟后可用：`https://你的用户名.github.io/hardware-portfolio/`

### 方式 C：Cloudflare Pages / Vercel

同样支持拖拽上传文件夹，流程与方式 A 类似。

## 网址与更新方式

线上地址：**https://lm7-l.github.io/hardware-portfolio/**

因为这台电脑连不上 github.com 的 443 端口（git push 会被重置），所以更新网站走
GitHub API：改完 `site` 里的内容后，在这个文件夹执行

```powershell
.\推送到GitHub.ps1
```

它会自动上传所有文件并生成一个新提交，1–2 分钟后线上就更新了。

`index.html` 里的 canonical / og:url / og:image 已经填好真实网址（链接分享到微信、
QQ 时显示的标题和封面图就靠它）。

## 二维码（与网站分开）

网站上不放二维码，二维码放在同级文件夹：**`二维码工具/index.html`**

- 双击用浏览器打开（完全离线，不联网、不上传任何内容）
- 把网址粘进去 → 点「生成二维码」→ 下载 PNG（1024×1024）或 SVG（矢量，打印不糊）
- 建议先手机扫一下生成的图，确认能打开再印到简历上

## 想改内容

- 项目标题 / 一句话说明：`index.html` 里的 `<h2>`、`<h3>`、`.project__desc`
- 图注：找 `<figcaption>`，改中文那行（`<em>` 里是英文小字）
- 邮箱：搜索 `Ldefeng0103@163.com`（页面里是纯文本、不是超链接，
  点一下会整段选中方便复制，不会跳转到邮件软件）
- 加新照片：新图放进 `images/thumb` 和 `images/full`（同名），
  复制一段 `<figure class="shot">…</figure>` 改文件名即可

## 网站图片 ↔ 原始照片对照

| 网站文件 | 原始照片 | 内容 |
| --- | --- | --- |
| psu-cover | 200w数控电源封面.jpg | 项目封面（输出显示 28.02 V） |
| psu-01 | 200w数控电源功率板.jpg | 主功率板 |
| psu-02 | 200w数控功率板.jpg | 功率板 · 多路稳压 |
| psu-03 | 200w数控电源控制板.jpg | 控制板 |
| psu-04 | 控制板3.jpg | 控制板 · 显示与接口 |
| psu-05 | 200w数控电源图2.jpg | 整机装配 |
| psu-06 | 200w数控电源图1.jpg | 上电实测 28.20 V |
| psu-07 | 200w数控电源图3.jpg | 上电实测 8.20 V |
| psu-08 | 200w数控电源图4.jpg | 上电实测 32.0 V |
| pendulum-01 | STM32PID倒立摆.jpg | 倒立摆整机 |
| usb-01 | USB2.0拓展坞.jpg | USB 2.0 拓展坞主板 |
| buck-01 | 升降压电源模块12-5v-3.3v-5v图1.jpg | 升降压电源模块 |
| buck-02 | 升降压电源模块12-5v-3.3v-5v图2.jpg | 升降压模块上电 |
| car-01 | 自动识别图像打靶小车系统.jpeg | 图像识别打靶小车 |
| car-02 | 电赛校赛自动行驶小车二等奖.jpg | 自动行驶小车 |
