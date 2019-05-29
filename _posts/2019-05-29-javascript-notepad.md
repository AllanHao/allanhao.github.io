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

