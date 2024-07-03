
<p align="center">
  <img src="https://almanac.baii.icu/api/almanac/picture?lang=en"/>
</p>

<h2 align="center">
  <a href="https://github.com/ProsperBao/restraint-almanac">
    Restraint Almanac
  </a>
</h2><br>


[![Netlify Status](https://api.netlify.com/api/v1/badges/6ebc1907-60e5-45cb-b816-3094c9161b1f/deploy-status)](https://app.netlify.com/sites/deft-vacherin-a64172/deploys)

English | [简体中文](./README-zh-CN.md) | [日本語](./README-ja-JP.md)


### What is this for?
Similar to an isolation recipe book, the recommended ingredients are based on the Chinese almanac, which may not be available in your refrigerator or accessible to you. It is purely for entertainment purposes.

### Is there any logic?
According to the real-time changes in the Chinese almanac, the system matches keywords from the data.<br>

Each ingredient is associated with the keywords from the Chinese almanac that can be associated with it. For example:

- Sacrifice -> ingredients represented by the sacrifice
- Marriage -> wedding ingredients + wedding customs
- Travel -> animal migration habits

and so on.

### I also want to put it in my profile.

```
<img src="https://almanac.baii.icu/api/almanac/picture?lang=en" />
```

or

```
![https://almanac.baii.icu](https://almanac.baii.icu/api/almanac/picture?lang=en)
```

![https://almanac.baii.icu](https://almanac.baii.icu/api/almanac/picture?lang=en)

Just add the corresponding parameters in the query parameter of the URL.

| Parameter | Description | Default Value | Optional Values |
| --- | --- | --- | --- |
| lang | string | `zh-CN` | `['jp', 'en']` |
| width | number | 460 | Varies by language [View](./server/api/almanac/picture.ts) |

Not recommended to adjust:

| Parameter | Description | Default Value | Optional Values |
| --- | --- | --- | --- |
| fontSize | number | 16 | - |
| padding | number | 15 | - |
| fontPadding | number | 8 | - |
| startX | number | 76 | - |
| startY | number | 23 | - |
| margin | number | 8 | - |
| border | number | 1 | - |
| radius | number | 4 | - |

### Best served with.

<img src="https://almanac.baii.icu/1.jpg" alt="best served with" style="width: 300px"/>

It can be used with IOS automation to send a perfunctory weight-loss tip to your girlfriend every day, as well as daily weight-loss encouragement.
<br/>
The interface used in the picture.

```
https://almanac.baii.icu/api/almanac/str
```

### There are not many keywords, and updates will be made as appropriate.
