---
title: 深入理解JS作用域
description: 理解JS编译执行过程、理解作用域和上下文环境
---





## 原理解析

### 编译执行

js是没有编译过程的，而是边解释边执行

#### 第一步：分词 tokenizing

字符串=>代码块（词法单元），比如”var a = 2;“，

```js
// 词法分析后的结果
[
  "var" : "keyword", //关键字
  "a" : "identifier",//标识符
  "="   : "assignment",//分配
  "2"  : "integer",//整数
  ";"   : "eos" (end of statement)//结束语句
]
```

#### 第二步：解析 parsing

将词法单元数组转换成AST（Abstract Syntax Tree）抽象语法树，即由元素逐级嵌套组成的代表程序语法结构的树。

![0r6FoT.png](https://s1.ax1x.com/2020/10/09/0r6FoT.png)

```js
{
  operation: "=",
  left: {
    keyword: "var",
    right: "a"
  }
  right: "2"
}
```

关于AST可以试试这个demo [esprima.org](https://esprima.org/demo/parse.html#)

#### 第三步： 代码生成&执行

将AST转化为可执行代码。这些代码被用来处理a=2这个赋值操作。引擎运行时会首先询问作用域，在当前的作用域集合中是否存在一个叫作a的变量。如果是，引擎就会使用这个变量；如果否，引擎会继续查找该变量。如果引擎最终找到了a变量，就会将2赋值给它。否则就会抛出异常。

**即时编译JIT** JS的优化编译，不展开讲，之后专门开一篇。

#### 角色

1. **引擎**：负责整个JavaScript程序的编译及执行过程。
2. **IDE**：负责语法分析及代码生成等脏活累活。
3. **作用域**：负责收集并维护由所有声明的标识符（变量）组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限

### 查询

#### LHS&RHS

变量出现在左侧时，进行LHS查询，出现在右侧则RHS查询。

```
function foo(a) {
	console.log(a);
}
foo(2);
```

1. foo()对foo函数对象进行RHS引用
2. 函数传参a=2对a进行了LHS引用
3. console.log(a);对console对象进行RHS引用，并检查是否有log()方法
4. console.log(a);对a进行RHS引用，并把得到的值传给了console.log()

#### 作用域查找机制

在当前作用域无法找到某个变量时，引擎就会在外层嵌套的作用域中继续查询，直到找到该变量，或者抵达最外层的作用域（全局作用域）为止。

```js
function foo(a) {
	function fo(){
		console.log(a+b)
	}
	fo()
}
var b = 4;
foo(2);
```

### 异常

**RHS**

1. 如果RHS查询失败，引擎会抛出ReferenceError(引用错误)异常

```
//对b进行RHS查询时，无法找到该变量。也就是说，这是一个“未声明”的变量
function foo(a){    
	a = b;  
}
foo();//ReferenceError: b is not defined
```

2. 如果RHS查询找到了一个变量，但尝试对变量的值进行不合理操作，比如对一个非函数类型值进行函数调用，或者引用null或undefined中的属性，引擎会抛出另外一种类型异常：TypeError(类型错误)异常

```
function foo(){    
	var b = 0;    
	b();
}
foo();//TypeError: b is not a function
```

**LHS**

1. 当引擎执行LHS查询时，如果无法找到变量，全局作用域会创建一个具有该名称的变量，并将其返还给引擎。

```
function foo(){    
	a = 1;  
}
foo();
console.log(a);//1
```

2. 如果在严格模式中LHS查询失败时，并不会创建并返回一个全局变量，引擎会抛出同RHS查询失败时类似的ReferenceError异常

```js
function foo(){    
    'use strict';    
    a = 1;  
}
foo();
console.log(a);//ReferenceError: a is not defined
```

### 词法作用域

![05Eg41.png](https://s1.ax1x.com/2020/10/14/05Eg41.png)

### 动态作用域

 javascript使用的是词法作用域，它最重要的特征是它的定义过程发生在代码的书写阶段。那为什么要介绍动态作用域呢？实际上动态作用域是javascript另一个重要机制this的表亲。作用域混乱多数是因为词法作用域和this机制相混淆。

动态作用域并不关心函数和作用域是如何声明以及在任何处声明的，只关心它们从何处调用。换句话说，作用域链是基于调用栈的，而不是代码中的作用域嵌套

### 声明提升

一般认为，javascript代码在执行的时候是由上到下一行一行执行的。但实际上这不完全正确，主要是因为声明提升的存在。

这个过程也可以成为预解释。

#### 变量的声明提升

```js
a = 2;
var a;
console.log(a);
```

上述代码按C/C++之类的语言习惯，直觉会认为报错undefined，但实际结果是2

```js
console.log(a);
var a = 2;
```

上述代码结果为undefined

实际上这些奇怪的现象都来源于编译器的编译过程。之前介绍过作用域的内部原理。引擎会在解释javascript代码之前首先对其进行编译。编译阶段中的一部分工作就是找到所有的声明，并用合适的作用域将他们关联起来。

**声明从它们在代码中出现的位置被“移动”到了最上面，这个过程就叫作提升(hoisting)**

```js
console.log(a);
var a = 0;
function fn(){
    console.log(b);
    var b = 1;
    function test(){
        console.log(c);
        var c = 2;
    }
    test();
}
fn();
```

上述代码进行声明提升后：

```js
var a ;
console.log(a);
a = 0;
function fn(){
    var b;
    console.log(b);
    b = 1;
    function test(){
        var c ;
        console.log(c);
        c = 2;
    }
    test();
}
fn();
```

#### 函数的声明提升

```js
foo();
function foo(){
    console.log(1);//1
}
```

经过函数提升后，相当于

```js
function foo(){
    console.log(1);
}
foo();
```

但是函数表达式不会提升

```js
foo();
var foo = function(){
    console.log(1);//TypeError: foo is not a function
}
```

这里变量foo会被声明提升，所以foo()不会导致ReferenceError，而是TypeError，因为foo的值是undefined而非函数，对undefined值进行函数调用会导致TypeError错误。

#### 函数覆盖

函数和变量声明都会被提升，但函数声明会覆盖变量声明，因为函数声明优先于变量声明。

```js
var a;
function a(){};
console.log(a);
```

但变量赋值，则值为变量的值。

```js
var a;
function a(){};
console.log(a);//'function a(){}'
a = 1;
console.log(a);//1
```

```js
var a=1;
function a(){}
console.log(a);//1
```

后面的函数声明会覆盖前面的声明

```js
a();//2
function a(){
    console.log(1);
}
function a(){
    console.log(2);
}
```

### 作用域和执行上下文

#### 作用域

作用域是一套规则，用来确定查找标识符。

JS中分全局作用域和局部作用域，另外函数作用域可以嵌套。

**作用域链和自由变量**

各个作用域的嵌套关系组成了一条作用域链。

![0I2ZJU.png](https://s1.ax1x.com/2020/10/14/0I2ZJU.png)

如上，bar函数里作用域链为bar->fn->全局，fn函数保存的作用域链fn->全局。

使用作用域链主要是进行标识符即变量和函数的查询，标识符解析就是沿着作用域链一级一级搜索标识符的过程，而作用域链就是为了保证有序性。

在当前作用域中存在但未在当前作用域中声明的变量叫**自由变量**

如果要在bar函数中查询变量b，由于b并没有在当前作用域中声明，所以b是自由变量。bar函数的作用域链是bar -> fn -> 全局。到上一级fn作用域中查找b没有找到，继续到再上一级全局作用域中查找b，找到了b。

如果标识符找不到，则抛出ReferenceError(引用错误)异常。

#### 执行环境 execution context

