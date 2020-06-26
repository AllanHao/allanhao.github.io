---
layout: post
title: JavaScript中typeof与instanceof的区别
categories: [JavaScript]
description: JavaScript中typeof与instanceof的区别
keywords: JavaScript
---

本文主要讲述JavaScript中，typeof与instanceof的区别，以此备忘。

> 本文引自https://blog.csdn.net/qq_27626333/article/details/76146078

typeof和instanceof判断变量，typeof会返回一个变量的基本类型，只有以下几种：**number,boolean,string,function（函数）,object（NULL,数组，对象）,undefined**。例：

```javascript
alert(typeof(1));//number
alert(typeof("abc"));//string
alert(typeof(true));//boolean
alert(typeof(m));//undefined
```

如果我们想要判断一个变量是否存在，可以使用typeof：(不能使用if(a) 若a未声明，则报错)

```javascript
if(typeof a != 'undefined'){
    //变量存在
}
```

正因为typeof遇到null,数组,对象时都会返回object类型，所以当我们要判断一个对象是否是数组时或者判断某个变量是否是某个对象的实例则要选择使用另一个关键语法instanceof，instanceof返回的是一个布尔值，如：

```javascript
var a = {};
alert(a instanceof Object);  //true
var b = [];
alert(b instanceof Array);  //true
```

需要注意的是，**instanceof只能用来判断对象和函数，不能用来判断字符串和数字等**，如：

```javascript
var b = '123';
alert(b instanceof String);//false
alert(typeof b);//string
var c = new String("123");
alert(c instanceof String); //true
alert(typeof c);  //object
```

另外，用instanceof可以判断变量是否为数组有几种方法可以拿来判断：

* constructor属性

这个属性在我们使用js系统或者自己创建的对象的时候，会默认的加上，例如：

```javascript
var arr = [1,2,3];  //创建一个数组对象
arr.prototype.constructor = Array;  //这一句是系统默认加上的
```

所以我们就可以这样来判断：

```javascript
var arr = [1,2,3,1]; 
alert(arr.constructor === Array);   // true
```

* instanceof

instanceof是检测对象的原型链是否指向构造函数的prototype对象的，所以我们也可以用它来判断：

```javascript
var arr = [1,2,3]; 
alert(arr instanceof Array);   // true
```

最后，为了给大家一个结果，现写出一个终极解决方案：

判断数组终极解决方案

```javascript
var arr = [1,2,3]; 
function isArrayFn(obj){  //封装一个函数
  if (typeof Array.isArray === "function") { 
    return Array.isArray(obj); //浏览器支持则使用isArray()方法
  }else{  //否则使用toString方法
    return Object.prototype.toString.call(obj) === "[object Array]"; 
  } 
} 
alert(isArrayFn(arr));// true
```