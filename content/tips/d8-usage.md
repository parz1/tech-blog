---
title: 安装和使用D8
description: 使用d8来查看V8在执行JavaScript过程中的各种中间数据
---

#### What's d8?

d8 是一个非常有用的调试工具，你可以把它看成是 **debug for V8** 的缩写。我们**可以使用 d8 来查看 V8 在执行 JavaScript 过程中的各种中间数据，比如作用域、AST、字节码、优化的二进制代码、垃圾回收的状态，还可以使用 d8 提供的私有 API 查看一些内部信息**。

> [`d8`](https://codesearch.chromium.org/chromium/src/v8/src/d8.h?q=d8&sq=package:chromium&l=5) is V8’s own developer shell.
>
> `d8` is useful for running some JavaScript locally or debugging changes you have made to V8.
>
> from [Using d8](https://v8.dev/docs/d8)

#### Install

1. 自行下载编译
2. [v8 google 下载及编译使用](https://link.zhihu.com/?target=https%3A//time.geekbang.org/column/article/219418)

3. 官方文档：[Using d8](https://link.zhihu.com/?target=https%3A//v8.dev/docs/d8)



1. 使用编译好的 d8 工具
2. [mac 平台](https://link.zhihu.com/?target=https%3A//storage.googleapis.com/chromium-v8/official/canary/v8-mac64-dbg-8.4.109.zip)

3. [linux32 平台](https://link.zhihu.com/?target=https%3A//storage.googleapis.com/chromium-v8/official/canary/v8-linux32-dbg-8.4.109.zip)

4. [linux64 平台](https://link.zhihu.com/?target=https%3A//storage.googleapis.com/chromium-v8/official/canary/v8-linux64-dbg-8.4.109.zip)

5. [win32 平台](https://link.zhihu.com/?target=https%3A//storage.googleapis.com/chromium-v8/official/canary/v8-win32-dbg-8.4.109.zip)

6. [win64 平台](https://link.zhihu.com/?target=https%3A//storage.googleapis.com/chromium-v8/official/canary/v8-win64-dbg-8.4.109.zip)

解压文件后，运行d8.exe，你也可以添加到环境变量，但是在调试的文件同目录需要有snapshot_blob.bin文件，你可以从源文件粘贴到目标文件夹。

#### Debug

```js
//test.js
var a = 2;
```

```powershell
>d8 test.js --print-ast
[generating bytecode for function: ]
--- AST ---
FUNC at 0
. KIND 0
. LITERAL ID 0
. SUSPEND COUNT 0
. NAME ""
. INFERRED NAME ""
. DECLS
. . VARIABLE (000002D4F9F60348) (mode = VAR, assigned = true) "a"
. BLOCK NOCOMPLETIONS at -1
. . EXPRESSION STATEMENT at 8
. . . INIT at 8
. . . . VAR PROXY unallocated (000002D4F9F60348) (mode = VAR, assigned = true) "a"
. . . . LITERAL 2
```

**查看命令 d8 --help |grep print**
*# 如果是 Windows 系统，可能缺少 grep 程序，请自行下载安装并添加环境变量* 

> ./d8 --help |grep print

- print-bytecode 查看生成的字节码
- print-opt-code 查看优化后的代码
- print-ast 查看中间生成的 AST
- print-scopes 查看中间生成的作用域
- trace-gc 查看这段代码的内存回收状态
- trace-opt 查看哪些代码被优化了
- trace-deopt 查看哪些代码被反优化了
- turbofan-stats 打印优化编译器的一些统计数据