---
layout: post
title: Nuget包的CI/CD
categories: [运维]
description: 基于Jenkins对Nuget包进行持续集成
keywords: Nuget, Jenkins
---

实际开发中我们需要对一些公共类库进行开发，并基于Jenkins进行CI/CD（CI:持续集成，CD:持续部署）,其他项目通过Nuget引用。[上文](https://allanhao.com/2018/12/19/nugetserver/)讲述了如何搭建本地Nuget服务器并发布Nuget包，这里不再赘述。

CI/CD流程如下图：
![](https://allanhao.com/images/2018-12-25-22-34-01.png)

首先公共类库代码通过Git管理，编辑完代码后上传到Git服务器。

配置Jenkins Job，按设定的触发条件进行构建任务。

构建开始，删除Workspace中旧文件，从Git服务器下载最新代码，执行编译，生成Nuget包，上传到Nuget服务器。

这样，别人就可以引用或者更新最新的公共类库的Nuget包进行业务开发了。

## 在Visual Studio中支持自定义生成Nuget包，并且版本号递增
