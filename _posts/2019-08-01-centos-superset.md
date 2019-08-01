---
layout: post
title: 基于Conda安装SuperSet
categories: [superset, conda]
description: 基于Conda安装SuperSet
keywords: superset, conda
---

本文主要介绍在CentOS7中安装Conda并且基于Conda创建python虚拟环境，安装SuperSet。

## Conda

### Conda简介

Conda 是一个开源的软件包管理系统和环境管理系统，用于安装多个版本的软件包及其依赖关系，并在它们之间轻松切换。 Conda 是为 Python 程序创建的，适用于 Linux，OS X 和Windows，也可以打包和分发其他软件。

### 安装conda

conda分为anaconda和miniconda。anaconda是包含一些常用包的版本，miniconda则是精简版，需要啥装啥，所以推荐使用miniconda。

### 下载网址

Conda官网：[https://conda.io/miniconda.html](https://conda.io/miniconda.html)

选择适合自己的版本，用wget命令下载。  

```bash
wget -c https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

这里选择的是latest-Linux版本，所以下载的程序会随着python的版本更新而更新（现在下载的版本默认的python版本已经是3.7了）   

### 安装命令  

```bash
chmod 777 Miniconda3-latest-Linux-x86_64.sh #给执行权限
bash Miniconda3-latest-Linux-x86_64.sh #运行
```

注意，以前的教程都是教一路yes下来的，但是会有隐患，特别是当你的服务器之前有安装过软件的话，conda会污染你原来的环境，把你原来设置好的东西进行更改。具体的惨痛教训请参见：   

[Anaconda is a snake.](https://mp.weixin.qq.com/s?__biz=MzAxMDkxODM1Ng==&mid=2247486380&idx=1&sn=9329fcd0a60ac5488607d359d6c28134&chksm=9b484b17ac3fc20153d25cbdefe5017c7aa9080d13b5473a05f79808244e848b0a45d2a6a735&scene=21#wechat_redirect)   

所以在询问是否将conda加入环境变量的时候选择no。  

![](https://allanhao.com/images/2019-08-01-15-34-51.png)

### 启动conda

在上一步选择no之后，输入conda是会报找不到此命令的。那要如何启动呢？    
找到你刚才安装的miniconda，如果没有更改过安装位置的话应该是在`/home`下面，`cd`到miniconda3的bin目录下面，能看到有一个activate。   

![](https://allanhao.com/images/2019-08-01-15-36-05.png)

这里需要给`activate`添加一下权限才能使用

```bash
chmod 777 activate 
```

接下来启动conda

```bash
. ./activate #这里的第一个点跟source是一样的效果，我比较懒。
```
![](https://allanhao.com/images/2019-08-01-15-38-42.png)

当命令行前面出现(base)的时候说明现在已经在conda的环境中了。这时候输入conda list 命令就有反应了

![](https://allanhao.com/images/2019-08-01-15-39-00.png)