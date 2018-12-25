---
layout: post
title: Nuget包的CI/CD
categories: [运维]
description: 基于Jenkins对Nuget包进行持续集成
keywords: Nuget, Jenkins
---

实际开发中我们需要对一些公共类库进行开发，并基于Jenkins进行CI/CD（CI:持续集成，CD:持续部署）,其他项目通过Nuget引用。[上文](https://allanhao.com/2018/12/19/nugetserver/)讲述了如何搭建本地Nuget服务器并发布Nuget包，这里不再赘述。

流程如下图：
![](https://allanhao.com/images/2018-12-25-22-34-01.png)

