---
title: 函数式编程初探
description: 对函数式编程的基本概念和基本代码
---

### 纯函数

给定的输入 返还相同的结果 （没有外部依赖）

结果可控制 --> 结果可推测 --> 可测试

1. 可推测
2. 可复用（模块化）
3. 无副作用
4. 可读性

```javascript
let double = v => v * 2
test('double(2) = 4', () => {
	expect(double(2)).toBe(4)
})
```

##### 不可变数据

```javascript
const obj = {
	name: 'parz1',
    hobby: {
    	code: true
	}
}
obj.name = 'paprika' // const也可变

Object.freeze(obj)	// 浅冻结
obj.name = 'vvxir' // name: 'paprika' 不可变
obj.hobby.code = false // false 二级children可变

//深冻结
function deepFreeze(obj) {
    Object.freeze(obj)
    for(let i in obj) {
        if(typeof obj[i] == 'object') {
            deepFreeze()
        }
    }
}
deepFreeze(obj)
obj.hobby.code = true // false 不可变
```

那怎么更改/使用数据？**映射**(比如map)复制一份数据

简单来讲，复制一份数据后更改，对原始数据的副作用降到最低

对需要保护的数据建议深冻结。

tips

JSON.parse(JSON.stringify) 拷贝对于null undefined会丢失，最好是深拷贝

### 高阶函数

以函数作为输入或输出被称为高阶函数 (Higher-Order Function)

```javascript
function test(cb) {
	cb && cb()
    //return function() {
    //    // ...
    //}
}
test(function() {
	console.log('callback...')
})
```

作用：1. 抽象 2. 缓存 3. 惰性执行

##### 抽象

1. 命令式编程 : 强调如何做

```javascript
let arr = [1, 2, 3]
for(let i=0; i<arr.length; i++) {
	console.log(arr[i])
}
```

2. 声明式编程 : 强调做什么 抽象“如何做”

```javascript
const forEach = function(arr, fn) {
	for(let i=0; i<arr.length; i++) {
		fn(arr[i])
	}
}
forEach(arr, item => {
    console.log(item)
})
```

原生函数里some/every/filter/reduce/map就是函数式编程方式

这有利于提高复用性

##### 缓存特性

通过闭包实现缓存

```javascript
// 实现只执行一次的函数
const once = fn => {
	let done = false;
	return function() {
		if(!done) {
			fn()
		} else {
			console.log('done')
		}
        done = true
	}
}
```

### 柯里化

柯里化即纯函数，让纯函数更纯，某些语言及特定环境下只能接收一元参数

**把多元函数转换为一元函数**

```javascript
function test(x, y) {
	return x + y
}
//二元转一元
const curry = function(fn) {
    return function(x) {
        function(y) {
            return fn(x, y)
        }
    }
}
let _fn = curry(test)
_fn(1)(2) // 3
```

```javascript
let arr = [
	{
		naem: 'parz1',
		age: 20
	},
	{
		naem: 'vvxir',
		age: 20
	},
	{
		naem: 'paprika',
		age: 21
	},
]

const getObj = (name, item) => item.name === name
let res = arr.filter(item => getObj('parz1', item))
// curry
const cfn = curry(getObj)
//cfn('parz1')(item)
let cfnRes = arr.filter(cfn('parz1'))
```

```javascript
// 多元转一元
const curry = function (fn) {
    return function curriedFn(...args) {
        if (args.length < fn.length) {
            return function () {
                return curriedFn(...args.concat[...arguments])
            }
        }
        return fn(...args)
    }
}
//	curriedFn(1)返回curriedFn(1, 2)，再返回curriedFn(1, 2, 3)

function test (x, y, z) {
    return x + y + z
}
let cfn = curry(test)
let res = cfn(1)(2)(3)
console.log(res)	// 6
```

### 单一原则/组合/管道

单个函数执行单个功能，复杂功能用组合/管道

```javascript
// 两个函数组合
let afn = a * 2
let bfn = b + 3

let res = bfn(afn(2))

// 组合 执行顺序右到左
// 管道 执行顺序左到右 “|” 管道符 : pipe
const compose = function(fn1, fn2) {
    return function(val) {
        fn1(fn2(val))
    }
}
const cpfn = compose(bfn, afn)
console.log(cpfn(2)) // 7
```

```javascript
// 多个函数组合
cosnt pipe = function(...fns) {
    return function(val) {
        return fns.reverse().reduce((total, fn) => {
            return fn(total)
        }, val)
    }
}

// 多个函数管道
cosnt compose = function(...fns) {
    return function(val) {
        return fns.reduce((total, fn) => {
            return fn(total)
        }, val)
    }
}
```

**tips**: reduce() 可以作为一个高阶函数，用于函数的 compose。

**需求场景**

找到句号数量判断奇偶性

按照函数式编程，抽象成纯函数，再组合完成

```javascript
let str = `Hello parz1. 
		You are my best friend. 
		Let\'s go out and play.`
// 抽象成 获得句号/统计/判断奇偶 三个纯函数
const getPeriod = str => str.match(/. /g)
const getLength = arr => arr.length
const ifEven = num => num % 2 === 0 ? 'odd' : 'even'

// 组合函数
let myfn = compose(ifEven, getLength, getPeriod)
let res = myfn(str) // 得到结果
```

### JS库

鲁大师ww(lodash.js)、ramda.js

### Redux中的函数式编程

开坑，下篇文章
