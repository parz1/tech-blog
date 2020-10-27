---
title: 深入理解JS闭包
description: 对JS闭包的深入学习
---

### 什么是闭包

闭包是**函数和声明它的词法作用域的组合**。一种内部函数给你访问外部函数作用域的权利的现象。

> A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the **lexical environment**). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.
>
> [Closure JS|MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

### 词法作用域 Lexical scope

先了解**词法作用域**，如下代码

```js
function init() {
  var name = 'Mozilla'; // name is a local variable created by init
  function displayName() { // displayName() is the inner function, a closure
    alert(name); // use variable declared in the parent function
  }
  displayName();
}
init();
```

init函数里创建了一个局部变量name和一个函数变量displayName。displayName函数是定义在init函数里的内部函数，并只能在init内部使用。但displayName函数可以通过**作用域链右查询**找到外部函数的name变量，并将其输出。这就是**词法作用域**，嵌套函数可以通过作用域链访问外部作用域（使用外部作用域声明的函数、变量）。

### 闭包 Closure

先看下述代码

```js
function makeFunc() {
  var name = 'Mozilla';
  function displayName() {
    alert(name);
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc();
```

这串代码和之前的代码效果一样，都是alert一个name。但有趣的是内部函数displayName被外部函数return了。

首先直观来看这段代码看起来并不能运行，在一些编程语言中，局部变量会随着函数执行的结束在内存中被释放。然而，这段代码在Javascrpt中却能成功运行，这便是Javascript难以掌握的特性——闭包。闭包是函数和声明它的词法作用域的组合，在这个案例中，`myFunc`是对函数实例`displayName`的引用，函数实例`displayName`是在`makeFunc`执行中创建。实例`displayName`维持了对它词法作用域里变量/函数的引用。因此，当`myFunc`被使用时，变量`name`也被保存了下来，顺利`alert('Mozilla')`。

下面是个更有趣的案例——`makeAdder`函数。

```js
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```

在这个案例里，我们定义了一个函数`makeAdder(x)`，有一个参数x，并返回一个新的函数。这个新的函数有一个参数y，返回x+y。

`makeAdder`的本质是一个函数工厂：它创建对参数(y)+具体值(x)的函数。在这个案例中，这个函数工厂创建了两个新函数：一个对参数加5，一个加10。

### 闭包的用途

闭包的用途其实就是对属性和方法的封装。

```js
function a() {
    var start = 5;
    function b() {
        return start++;
    };
    return b;
}
var inc = a();
inc();// 5
inc();// 6
inc();// 7
//释放内存
inc = null;
```

start变量被保存在了堆里无法释放，成为了一个计数器。随着**引用赋值为null**，b也随之被释放。

> 在Javascript中，如果一个对象不再被引用，那么这个对象就会被GC回收。如果两个对象互相引用，而不再被第3者所引用，那么这两个互相引用的对象也会被回收。因为函数a被b引用，b又被a外的inc引用，这就是为什么函数a执行后不会被回收的原因。

```js
function Person(name) {
  var _age;
  return {
    setAge(age) {
      _age = age;
    },
    getAge() {
      return _age;
    },
    getName() {
      return name;
    },
  };
}
let person = Person("parz1");
person.setAge(21);
console.log(person.getAge());	//21
console.log(person.getName());	//parz1
```

在此案例中，name/_age是私有变量，setAge/getAge/getName都是暴露出来的函数。

### 立即执行函数表达式/自执行函数 IIFE

函数如其名，定义立即执行。还有一种表达，自执行函数

> An **IIFE** (Immediately Invoked Function Expression) is a [JavaScript](https://developer.mozilla.org/en-US/docs/Glossary/JavaScript) [function](https://developer.mozilla.org/en-US/docs/Glossary/function) that runs as soon as it is defined.
>
> [IIFE|Definitions of Web-related terms](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)

**实现IIFE**

Javascript中，`()`是一种运算符，跟在变量名后，若是函数则执行。

```js
(function () {
    statements
})();
// or
(function () {
    statements
}());
```

> javascript引擎规定，如果function关键字出现在行首，一律解释成函数声明语句

其余写法

```js
var i = function(){return 10}();
true && function (){/* code */}();
0,function(){/* code */}();
!function(){ /* code */ }();
~function(){ /* code */ }();
-function(){ /* code */ }();
+function(){ /* code */ }();
new function(){ /* code */ };
new function(){ /* code */ }();
```

**用途**

 IIFE一般用于构造私有变量，避免全局污染。

```js
var add = (function () {
  var counter = 0;
  return function () {
    return ++counter;
  };
})();
console.log(add.counter);	//undefined
console.log(add());	//1
console.log(add());	//2
```

**易错案例**

```js
function foo(){
    var arr = [];
    for(var i = 0; i < 2; i++){
        arr[i] = function (){
            return i;
        }
    }
    return arr;
}
var bar = foo();
console.log(bar[0]());//2
```

IIFE解决

```js
function foo() {
  var arr = [];
  for (var i = 0; i < 2; i++) {
    arr[i] = (function (j) {
      return function () {
        return j;
      };
    })(i);
  }
  return arr;
}
var bar = foo();
console.log(bar[1]()); //1
```

块作用域解决

```js
function foo(){
    var arr = [];
    for(let i = 0; i < 2; i++){	//let
        arr[i] = function(){
            return i;
        }
    }
    return arr;
}
var bar = foo();
console.log(bar[1]());//1
```

### 闭包的十种形式

**返回值**

```js
var fn = function(){
    var a = 'mjj';
    var b = function(){
        return a;
    }
    return b;
}
console.log(fn()());
```

**函数赋值**

```js
var fn2;
var fn = function(){
    var a = 'mjj';
    var b = function(){
        return a;
    }
    fn2 = b;
}
fn();
console.log(fn2());
```

