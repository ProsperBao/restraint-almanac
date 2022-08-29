<p align="center">
  <img src="https://almanac.baii.icu/api/almanac/picture"/>
</p>

<h2 align="center">
  <a href="https://github.com/FuBaooo/restraint-almanac">
    自律人黄历
  </a>
</h2><br>

### 干嘛的
和隔离食用手册类似，但是推荐食材是根据黄历来的，你冰箱里不一定有，你也不一定吃的到，纯属娱乐。

### 有啥逻辑吗？
根据当天黄历实时变动，然后根据关键字从数据中匹配。<br>
每个食材都是每个黄历关键词能发散联想出来的。<br>
例如: 

- 祭祀 -> 祭祀代表的食材
- 嫁娶 -> 婚礼食材 + 婚礼行为 (拼酒)
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

### 配合食用

<img src="https://almanac.baii.icu/1.jpg" alt="配合食用" style="width: 300px"/>

可以配合 IOS 自动化，每天发送一条敷衍女友的减肥贴心小贴士，还有每天一句减肥鼓励。
<br/>
图中使用到的接口

```
https://almanac.baii.icu/api/almanac/str
```

### 部署 netlify

由于使用了 jsdom 库(后续计划直接用字符串生成svg), jsdom 库里又用到了 canvas 这个库。
<br/>
canvas 这个库在 netlify 上由于缺少环境变量所以需要配置

```
Site Setting -> Build & deploy -> Environment
```

```
key: LD_LIBRARY_PATH
value: /var/task/node_modules/canvas/build/Release
```

### 关键词不是很多，随缘更新
