---
layout: post
title: JavaScript(ES6)知识点备忘
categories: [JavaScript]
description: JavaScript(ES6)知识点备忘
keywords: JavaScript
---

JavaScript的知识点备忘

## Object.values/Object.keys/Object.entries()

Object.keys:对Object中的索引进行循环    
Object.values:对Object中的值进行循环    
Object.entries:对Object中的每个项进行循环   

## Array map()

map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。

```javascript
const numbers = [4,9,16,25];
numbers.map(Math.sqrt);


const users=res.items.map(item => ({
    url: item.html_url,      
    img: item.avatar_url,      
    name: item.login,
    })
);
```

## 拼接字符串

```javascript
console.log(`当前Zoom等级：${this.mapControl.map.getView().getZoom()}`);
```

## 合并对象属性

Object.assign():用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

```javascript
//语法
 Object.assign(target, ...sources);

//示例
const object1 = {
  a: 1,
  b: 2,
  c: 3
};
const object2 = Object.assign({c: 4, d: 5}, object1);
console.log(object2.c, object2.d);
// expected output: 3 5
```

## JavaScript Array Includes()

includes() 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。

```javascript
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
```

## JavaScript Array concat()

concat() 方法用于连接两个或多个数组。   
该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。

```javascript 
//语法
arrayObject.concat(arrayX,arrayX,......,arrayX)

//示例
var a = [1,2,3];
console.log(a.concat(4,5));
//1,2,3,4,5
```

## ES6扩展运算符 三个点（…）

### 对象的扩展运算符

理解对象的扩展运算符其实很简单，只要记住一句话就可以：
> 对象中的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中(浅拷贝)

```javascript
let bar = { a: 1, b: 2 };
let baz = { ...bar }; // { a: 1, b: 2 }
```

上述方法实际上等价于:

```javascript
let bar = { a: 1, b: 2 };
let baz = Object.assign({}, bar); // { a: 1, b: 2 }
```

### 数组的扩展运算符

扩展运算符同样可以运用在对数组的操作中

* 可以将数组转换为参数序列

```javascript
function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
add(...numbers) // 42
```

* 可以复制数组

```javascript 
const arr1 = [1, 2];
const arr2 = [...arr1];
```

还是记住那句话：扩展运算符(…)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中，这里参数对象是个数组，数组里面的所有对象都是基础数据类型，将所有基础数据类型重新拷贝到新的数组中。

* 扩展运算符可以与解构赋值结合起来，用于生成数组

```javascript
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]
```

需要注意的一点是：**如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。**

```javascript
const [...rest, last] = [1, 2, 3, 4, 5];
// 报错
const [first, ...rest, last] = [1, 2, 3, 4, 5];
// 报错
```

* 扩展运算符还可以将字符串转为真正的数组

```javascript
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```

* 任何 Iterator 接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组

这点说的比较官方，大家具体可以参考阮一峰老师的ECMAScript 6入门教程。

比较常见的应用是可以将某些数据结构转为数组,比如：

```javascript
// arguments对象
function foo() {
  const args = [...arguments];
}
```
用于替换es5中的Array.prototype.slice.call(arguments)写法。

## js中!和!!的区别及用法

js中!的用法是比较灵活的，它除了做逻辑运算常常会用！做类型判断，可以用！与上对象来求得一个布尔值，

* ！可将变量转换成boolean类型，null、undefined和空字符串取反都为false，其余都为true。

```javascript
!null=true

!undefined=true

!''=true

!100=false

!'abc'=false
```

* ！！常常用来做类型判断，在第一步!（变量）之后再做逻辑取反运算，在js中新手常常会写这样臃肿的代码：    

判断变量a为非空，未定义或者非空串才能执行方法体的内容
```javascript
var a;
if(a!=null&&typeof(a)!=undefined&&a!=''){
    //a有内容才执行的代码  
}
```
实际上我们只需要写一个判断表达：
```javascript
if(!!a){
    //a有内容才执行的代码...  
}
```

就能和上面达到同样的效果。a是有实际含义的变量才执行方法，否则变量null，undefined和''空串都不会执行以下代码。

可以总结出来，“！”是逻辑与运算，并且可以与任何变量进行逻辑与将其转化为布尔值，“!!”则是逻辑与的取反运算，尤其后者在判断类型时代码简洁高效，省去了多次判断null、undefined和空字符串的冗余代码。