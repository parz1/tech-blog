---
title: Createjs中Bitmap初始化Load Error
description: bitmap第一次load报错bug
---

复现一下此bug，此段代码第一次加载会报错，而刷新后则正常运行。

```javascript
export class Turntable {
  constructor(stage, x, y) {
    this.bmp = new Bitmap('../assets/turntable.png')
    stage.addChild(this.bmp)
    stage.update()
    this.bmp.x = x
    this.bmp.y = y
    this.bmp.regX = this.bmp.getBounds().width / 2
    this.bmp.regY = this.bmp.getBounds().height / 2
    this.angle = 0
    this.speed = 0
    this.reduce = 0
  }
  // ... definitions
}
```

报错：bmp.width属性undefined，说明bmp的image未load，先查文档，文档关于bitmap有一句如下：

> When a string path or image tag that is not yet loaded is used, the stage may need to be redrawn before it will be displayed.

最初想法是创建Image对象，将创建Bitmap对象放在onLoad方法里，但找找到了同个问题的人的解决方案如下，或许更优雅。

```javascript
export class Turntable {
  constructor(stage, x, y) {
    this.bmp = new Bitmap('../assets/turntable.png')
    stage.addChild(this.bmp)
    this.bmp.image.onload = () => {
      this.bmp.x = x
      this.bmp.y = y
      this.bmp.regX = this.bmp.getBounds().width / 2
      this.bmp.regY = this.bmp.getBounds().height / 2
      this.angle = 0
      this.speed = 0
      this.reduce = 0
      stage.update()
    }
  }
  // definitions...
}
```

参考链接

[Easel.js: Browser compatibility when placing an image within a container and adding mouse interactions](https://stackoverflow.com/questions/16865628/easel-js-browser-compatibility-when-placing-an-image-within-a-container-and-add)