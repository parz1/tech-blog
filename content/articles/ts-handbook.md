---
title: 快速认识TypeScript
description: TS学习使用的笔记、总结
---

## 通过类型

TypeScript在拥有JavaScript所有特性的基础上，加了一层TypeScript的类型系统（下文为了方便TypeScript将使用ts，JavaScript将使用js）。这意味着js代码其实也是ts代码，使用ts的一个主要优势是可以对代码里无法预测的行为高亮，语法上减少bug和可读性。

首先先从类型系统入手，笼统介绍ts：


<!--more-->

### 类型推断

多数情况下，ts会自动判断类型。

```typescript
let helloWorld = 'Hello World'
// equals to
let helloWorld: string = 'Hello World'
```

### 定义类型

在js里你可以用各种方式来声明变量，然而有些方式会让ts难以进行自动的类型推断。为此，ts有一种扩展**接口interface**来定义类型。

你可以定义一个对象：

```typescript
interface User {
	name: string
	id: number
}

const user: User = {
  name: 'parz1'
  id: 0
}
```

从js支持class和oop编程后，ts也一样支持。可以用interface声明class。

```typescript
interface User {
  name: string
  id: number
}

class UserAccount {
  name: string
  id: number
  
  constructor(name: string, id: number) {
    this.name = name
    this.id = id
  }
}

const user: User = new UserAccount('Murphy', 1)
```

js里有一些基础类型：boolean, bigint, null, number, string, symbol, undefined。ts增加了any, unknown, never(通常处理异常), void(函数返回undefined或者不返回)。

ts有两种创建类型的语法：`interface` 和 `type`。[官方案例](https://www.typescriptlang.org/play?e=83#example/types-vs-interfaces) 大多数情况使用`interface`，需要更具体的类型则使用`type`。

### 组成类型

有两种方式组成类型：联合(unions)和范型(generics)。

#### 联合 Unions

偶尔你会遇到这种情况，一个代码库希望传入 `number`或`string`类型的参数。 例如下面的函数：

```typescript
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // returns "    Hello world"
```

padLeft的padding参数的类型指定是any，也就是说可以传入一个既不是`number`也不是`string`的参数，并ts不报错，编译通过，但在运行时会报`Expected string or number, got '${padding}'.`。此时我们可以使用联合类型替代`any`作为padding的参数：

```typescript
function padLeft(value: string, padding: number | string) {
  // ...
}

let indentedString = padLeft('Hello World', true) // 编译会报错
```

联合类型表示一个值可以是几种类型之一。 我们用竖线（ `|`）分隔每个类型，所以 `number | string | boolean`表示一个值可以是 `number`， `string`，或 `boolean`。

```typescript
function wrapInArray(obj: string | string[]) {
  if (typeof obj === "string") {
    return [obj];
//          ^(parameter) obj: string
  } else {
    return obj;
  }
}
```

[Playground Link](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAdwE4EMAOBJMBBVDATwAo4AjAKwC5EBnKVGMAc0QB97HmWBtAXQCUiAN4AoRIhjBEJKEUwBTODIqVEAXi2IARAyasdw8ZMmpFUEKiS81-ANxiA9E9NvTAPQD8ExAF9ERQAbOkVRXzMLKyQ1R0k-MT8gA)

附一个判断各种类型的方法

| Type      | Predicate                          |
| :-------- | :--------------------------------- |
| string    | `typeof s === "string"`            |
| number    | `typeof n === "number"`            |
| boolean   | `typeof b === "boolean"`           |
| undefined | `typeof undefined === "undefined"` |
| function  | `typeof f === "function"`          |
| array     | `Array.isArray(a)`                 |

#### 范型 Generics

范型给类型提供了变量。常见的例子是数组。

没有范型的数组可能包含任何东西。有范型的数组可以描述数组包含的内容。

```typescript
type StringArray = Array<string>
type NumberArray = Array<number>
type ObjectWithNameArray = Array<{ name: string }>
```

你可以自己用范型定义类型：

```typescript
interface Backpack<Type> {
  add: (obj: Type) => void
  get: () => Type
}
/* This line is a shortcut to tell TypeScript there is a constant called `backpack`, and to not worry about where it came from 
*/
declare const backpack: Backpack<string>;

const object = backpack.get()

backpack.add(23)
//           ^ERROR:Argument of type 'number' is not assignable to parameter of type 'string'.
```

### 结构类型系统

ts的一个核心原则是类型检查关注于值的形状。这也叫脏类型检查或者结构类型检查。

在结构类型系统里，如果两个对象有同样的内容，它们会被当作同个类型。

```typescript
interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

// logs "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);
```

如上`point`从来没有被声明为`Point`类型。但ts在类型检查里比较了`point`的“型“状和`Point`的”型“状。”型“状只要求**子集匹配**。

```typescript
const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"

const color = { hex: "#187ABF" };
logPoint(color);
// ERROR: Argument of type '{ hex: string; }' is not assignable to parameter of type 'Point'.
//  Type '{ hex: string; }' is missing the following properties from type 'Point': x, y
```

