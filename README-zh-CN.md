<p align="center">
  <img src="https://almanac.baii.icu/api/almanac/picture"/>
</p>

<h2 align="center">
  <a href="https://github.com/FuBaooo/restraint-almanac">
    自律人黄历
  </a>
</h2><br>

[![Netlify Status](https://api.netlify.com/api/v1/badges/6ebc1907-60e5-45cb-b816-3094c9161b1f/deploy-status)](https://app.netlify.com/sites/deft-vacherin-a64172/deploys)
[![Schedule Update](https://github.com/FuBaooo/restraint-almanac/actions/workflows/schedule.yml/badge.svg)](https://github.com/FuBaooo/restraint-almanac/actions/workflows/schedule.yml)

[English](./README.md) | 简体中文 | [日本語](./README-ja-JP.md)

### 干嘛的
和隔离食用手册类似，但是推荐食材是根据黄历来的，你冰箱里不一定有，你也不一定吃的到，纯属娱乐。

### 有啥逻辑吗？
根据当天黄历实时变动，然后根据关键字从数据中匹配。<br>
每个食材都是每个黄历关键词能发散联想出来的。<br>
例如: 

- 祭祀 -> 祭祀代表的食材
- 嫁娶 -> 婚礼食材 + 婚礼行为
- 出行 -> 动物的迁徙习性

等等

### 我也想放到我的 profile 里

```
<img src="https://almanac.baii.icu/api/almanac/picture" />
```
或者
```
![https://almanac.baii.icu](https://almanac.baii.icu/api/almanac/picture)
```

![https://almanac.baii.icu](https://almanac.baii.icu/api/almanac/picture)

只需要在 url 的 query 参数中加上相应的参数即可

| 参数 | 说明 | 默认值 | 可选值 |
| --- | --- | --- | --- |
|lang | string | `zh-CN` | `['jp', 'en']` |
|width | number | 460 | 因语言而异 [查看](./server/api/almanac/picture.ts) |

不建议调整:

| 参数 | 说明 | 默认值 | 可选值 |
| --- | --- | --- | --- |
|fontSize | number | 16 | - |
|padding | number | 15 | - |
|fontPadding | number | 8 | - |
|startX | number | 76 | - |
|startY | number | 23 | - |
|margin | number | 8 | - |
|border | number | 1 | - |
|radius | number | 4 | - |

### 配合食用

<img src="https://almanac.baii.icu/1.jpg" alt="配合食用" style="width: 300px"/>

可以配合 IOS 自动化，每天发送一条敷衍女友的减肥贴心小贴士，还有每天一句减肥鼓励。
<br/>
图中使用到的接口

```
https://almanac.baii.icu/api/almanac/str
```

### 关键词不是很多，随缘更新
