---
title: 实现Promise源码
description: 按照Promise/A+规范，手搓一个Promise类
---

按照 [Promise/A+](https://promisesaplus.com/) 规范手搓一个Promise类

## 术语

> 1. **promise** 一个带有符合规范的**then**方法的对象或函数
> 2. **thenable** 定义了then方法的对象或函数
> 3. **value** 合法Javascript值（包括undefined/thenable/promise）
> 4. **exception** 用throw语句丢出的值
> 5. **reason** 描述为什么promise rejected了  

## 规范（Promise/A+）

#### Promise States

一个Promise有三种状态 pending, fulfilled, or rejected

#### The *then* Method

一个Promise必须提供一个 *then* 方法来获取当前或最终的value/reason

*then* 函数接受两个参数 **promise.then(onFulfilled, onRejected)**

> 1. onFulfilled和onRejected都可缺省，但必须是函数
>
> 2. onFulfilled必须在promise状态置为fulfilled之后，第一个参数为 **value**，并且只能调用一次；onRejected必须在promise状态置为rejected之后，第一个参数为 **reason**，并且只能调用一次
>
> 3. promise状态置为fulfilled时，所有onFulfilled会按照顺序依次执行，同理依次执行onRejected
>
> 4. then必须返回一个promise对象 （**链式调用&值的穿透**）
>
>    ***promise2 = promise1.then(onFulfilled, onRejected);***
>
>    1. 若onFulfilled/onRejected返回一个value x，运行\[[Resolve]](promise2, x)
>
>    2. 若onFulfilled/onRejected抛出异常e，promise2置为rejected，reason为e
>
>       Sample: *promise1.then(onFulfilled1, onRejected1).then(onFulfilled2, onRejected2)*
>
>       //若onFulfilled1/onRejected1中抛出e，执行onRejected2
>
>    3. 若onFulfilled/onRejected非函数并且promise1置为fulfilled/rejected，则promise2置为和promise1一样的状态，且继承promise1的value/reason



#### 源码实现

```javascript
const PENDING = 'pending'
```

