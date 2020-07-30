---
title: JS判断数组的5种方式
description: JS判断数组的5种方式
img: default-cover.jpg
alt: JS判断数组的5种方式
---

# JS判断数组的5种方式

let arr = []

1.  instanceof 

    arr isntanceof Array

2. __proto__

    arr.__proto__  === Array.prototype

3. constructor

    arr.constructor === Array

4. Object.prototype.toString

   Object.prototype.toString.call(arr) === '[object Array]'

5. Array.isArray

    Array.isArray(arr)