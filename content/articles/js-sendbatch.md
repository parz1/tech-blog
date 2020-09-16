---
title: 封装JS并发控制器
description: '888'
---

面试莉莉丝遇到的问题：写一个批量请求控制函数sendBatch，可以控制并发的量。

于是便引申一下，封装一个并发控制器，promise实现

```js
class BatchTask {
  constructor(dataList, limit, asyncTask) {
    this.count = 0;
    this.dataList = dataList;
    this.limit = limit;
    this.asyncTask = asyncTask;
    this.taskPool = [];
    while (limit--) {
      this.taskPool.push(this.task(dataList, asyncTask));
    }
    return Promise.all(this.taskPool)
  }

  task(dataList) {
    return new Promise((resolve, reject) => {
      this.asyncTask(dataList.shift())
        .then(() => {
          if (dataList.length) resolve(this.task(dataList));
          else resolve("done");
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  cancel() {}
}
```

