<p align="center">
  <img src="https://almanac.baii.icu/api/almanac/picture?lang=jp"/>
</p>

<h2 align="center">
  <a href="https://github.com/FuBaooo/restraint-almanac">
    Restraint Almanac
  </a>
</h2><br>

[![Netlify Status](https://api.netlify.com/api/v1/badges/6ebc1907-60e5-45cb-b816-3094c9161b1f/deploy-status)](https://app.netlify.com/sites/deft-vacherin-a64172/deploys)
[![Schedule Update](https://github.com/FuBaooo/restraint-almanac/actions/workflows/schedule.yml/badge.svg)](https://github.com/FuBaooo/restraint-almanac/actions/workflows/schedule.yml)

[English](./README.md) | [简体中文](./README-zh-CN.md) | 日本語

### これは何ですか？
隔離食材レシピブックに似ていますが、推奨される材料は中国の黄道帯に基づいており、あなたの冷蔵庫にはないか、または利用できない場合があります。純粋に娯楽目的です。

### ロジックはありますか？
中国の黄道帯のリアルタイムの変化に従って、システムはデータからキーワードをマッチングします。<br>

各材料は、それに関連する中国の黄道帯からのキーワードに関連付けられています。例：

- 祭祀 -> 祭祀を表す材料
- 結婚 -> 結婚式の材料+結婚式の習慣
- 旅行 -> 動物の移動習性

など。

### 私も自分のプロフィールに入れたいです。

```
<img src="https://almanac.baii.icu/api/almanac/picture?lang=jp" />
```

または

```
![https://almanac.baii.icu](https://almanac.baii.icu/api/almanac/picture?lang=jp)
```

![https://almanac.baii.icu](https://almanac.baii.icu/api/almanac/picture?lang=jp)

URLのクエリパラメータに対応するパラメータを追加してください。

| パラメータ | 説明 | デフォルト値 | オプションの値 |
| --- | --- | --- | --- |
| lang | string | `zh-CN` | `['jp', 'en']` |
| width | number | 460 | 言語によって異なります [表示](./server/api/almanac/picture.ts) |

調整はお勧めしません：

| パラメータ | 説明 | デフォルト値 | オプションの値 |
| --- | --- | --- | --- |
| fontSize | number | 16 | - |
| padding | number | 15 | - |
| fontPadding | number | 8 | - |
| startX | number | 76 | - |
| startY | number | 23 | - |
| margin | number | 8 | - |
| border | number | 1 | - |
| radius | number | 4 | - |

### 一緒に食べると最高です。

<img src="https://almanac.baii.icu/1.jpg" alt="best served with" style="width: 300px"/>

IOS自動化と組み合わせて、毎日彼女に適当な減量のヒントを送信することができます。さらに、毎日の減量のエンカレッジメントもあります。
<br/>
画像で使用されているインターフェース。

```
https://almanac.baii.icu/api/almanac/str
```

### キーワードがあまり多くないため、必要に応じて更新されます。
