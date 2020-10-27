---
title: Breaking the JavaScript Speed Limit with V8
description: 13个Javascript性能提升技巧
---

Daniel Clifford 在 Google I/O 2012 上做了一个精彩的演讲“**Breaking the JavaScript Speed Limit with V8**”。演讲中介绍了 13 个简单的代码优化方法，可以让你的JavaScript代码在 Chrome V8 引擎编译/运行时更加快速。

1. 在构造函数里初始化所有对象的成员(所以这些实例之后不会改变其隐藏类)；
2. 总是以相同的次序初始化对象成员；
3. 尽量使用可以用 31 位有符号整数表示的数；
4. 为数组使用从 0 开始的连续的主键；
5. 别预分配大数组(比如大于 64 K 个元素)到其最大尺寸，令其尺寸顺其自然发展就好；
6. 别删除数组里的元素，尤其是数字数组；
7. 别加载未初始化或已删除的元素；
8. 对于固定大小的数组，使用`array literals`初始化（初始化小额定长数组时，用字面量进行初始化）；
9. 小数组(小于 64 k)在使用之前先预分配正确的尺寸；
10. 请勿在数字数组中存放非数字的值(对象)；
11. 尽量使用单一类型（monomorphic）而不是多类型（polymorphic）（如果通过非字面量进行初始化小数组时，切勿触发类型的重新转换）；
12. 不要使用 `try{} catch{}`（如果存在 `try/catch` 代码快，则将性能敏感的代码放到一个嵌套的函数中）；
13. 在优化后避免在方法中修改隐藏类。

> 参考资料：[演讲视频](https://v.youku.com/v_show/id_XNDk3NzA2Mjg0.html) [JavaScript V8性能小贴士](https://www.dazhuanlan.com/2019/12/07/5deb7aee6b870/)