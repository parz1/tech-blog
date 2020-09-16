---
title: 浅谈JS模块化
---



### 史前文明 (IIFE+闭包)

标准模块化还没来之前，一般利用立即执行函数和闭包来模拟模块化。

#### 匿名自执行函数

[IIFE(Immediately Invoked Function Expression)](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)是一种定义后立即运行的JS匿名函数，也称为自执行函数，包含两个部分：一个是括号词法作用域内的匿名函数，这使得代码封装，内部私有化，暴露的数据和接口由我们控制；另一个是添加括号，让js引擎立刻解释函数。

```js
var module = (function(){
	var privateParams = "Hello, parz1!"
    function getParams() {
        return privateParams
    }
	function setParams(name) {
		privateParams = name
	}
	return {
        getParams,
		setParams
	}
})()

console.log(module.getParams())	//Hello, parz1!
module.setParams("Vvxir")
console.log(module.getParams)	//Vvxir
```



