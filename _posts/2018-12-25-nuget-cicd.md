---
layout: post
title: 开发.NET Core NuGet包并实现CI/CD
categories: [运维]
description: 基于Jenkins对NuGet包进行持续集成
keywords: Nuget, Jenkins
---

实际开发中我们需要对一些公共类库进行开发，并基于Jenkins进行CI/CD（CI:持续集成，CD:持续部署）,其他项目通过NuGet引用。[上文](https://allanhao.com/2018/12/19/nugetserver/)讲述了如何搭建本地NuGet服务器并发布NuGet包，这里不再赘述。

CI/CD流程如下图：
![](https://allanhao.com/images/2018-12-25-22-34-01.png)

首先公共类库代码通过Git管理，编辑完代码后上传到Git服务器。

配置Jenkins Job，按设定的触发条件进行构建任务。

构建开始，删除Workspace中旧文件，从Git服务器下载最新代码，执行编译，生成NuGet包，上传到NuGet服务器。

这样，别人就可以引用或者更新最新的公共类库的NuGet包进行业务开发了。

## 在Visual Studio中操作

* 自定义打包类库
新建一个.net core 的类库，在工程文件处右键，选择属性，在“打包”中勾选“在版本中生成NuGet包”，然后设置基本信息。如下图：
![](https://allanhao.com/images/2018-12-26-08-52-59.png)

编译生成，就会在Debug/Release目录生成一个nupkg文件：
![](https://allanhao.com/images/2018-12-26-08-57-35.png)

* 自动更新编译版本

> 关于版本号：
这里指Net Framework风格的版本号，即，主版本号.子版本号[.编译版本号[.修正版本号]]
英文对照：Major_Version_Number.Minor_Version_Number[.Build_Number[.Revision_Number]]    
版本号由二至四个部分组成：主版本号、次版本号、内部版本号和修订号。主版本号和次版本号是必选的；内部版本号和修订号是可选的，但是如果定义了修订号部分，则内部版本号就是必选的。所有定义的部分都必须是大于或等于 0 的整数。    
应根据下面的约定使用这些部分：   
Major ：具有相同名称但不同主版本号的程序集不可互换。例如，这适用于对产品的大量重写，这些重写使得无法实现向后兼容性。     
Minor ：如果两个程序集的名称和主版本号相同，而次版本号不同，这指示显著增强，但照顾到了向后兼容性。例如，这适用于产品的修正版或完全向后兼容的新版本。    
Build ：内部版本号的不同表示对相同源所作的重新编译。这适合于更改处理器、平台或编译器的情况。      
Revision ：名称、主版本号和次版本号都相同但修订号不同的程序集应是完全可互换的。这适用于修复以前发布的程序集中的安全漏洞。    