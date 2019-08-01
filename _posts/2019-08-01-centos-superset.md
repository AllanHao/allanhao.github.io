---
layout: post
title: 基于Conda安装Superset
categories: [superset, conda]
description: 基于Conda安装Superset
keywords: superset, conda
---

本文主要介绍在CentOS7中安装Conda并且基于Conda创建python虚拟环境，安装SuperSet。

## Conda

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


## Superset

Superset 是一款由 Airbnb 开源的“现代化的企业级 BI（商业智能） Web 应用程序”，其通过创建和分享 dashboard，为数据分析提供了轻量级的数据查询和可视化方案。

Superset 的前端主要用到了 React 和 NVD3/D3，而后端则基于 Python 的 Flask 框架和 Pandas、SQLAlchemy 等依赖库，主要提供了这几方面的功能：

集成数据查询功能，支持多种数据库，包括 MySQL、PostgresSQL、Oracle、SQL Server、SQLite、SparkSQL 等，并深度支持 Druid。    
通过 NVD3/D3 预定义了多种可视化图表，满足大部分的数据展示功能。如果还有其他需求，也可以自开发更多的图表类型，或者嵌入其他的 JavaScript 图表库（如 HighCharts、ECharts）。   
提供细粒度安全模型，可以在功能层面和数据层面进行访问控制。支持多种鉴权方式（如数据库、OpenID、LDAP、OAuth、REMOTE_USER 等）。   

Superset 的搭建与使用非常简单，只需要一些 Python 基础，下面先从创建虚拟环境开始。

### 创建虚拟环境

Superset 的依赖包较多，为了避免冲突，需要先搭建虚拟环境，再进行安装，这里推荐使用 Anaconda 自带的 conda 工具创建虚拟环境：

```bash
conda create -n superset python=3.6
```

创建虚拟环境成功后，启动虚拟环境：

```bash
activate superset
```

### 安装Superset

使用豆瓣源安装 Superset：

```bash
pip install superset -i https://pypi.douban.com/simple 
```

### 初始化

初始化的官方步骤如下：

```bash
# 创建管理员账号
fabmanager create-admin --app superset 

# 初始化数据库
superset db upgrade

# 载入案例数据
superset load_examples

# 初始化角色和权限
superset init

# 启动服务，端口号 8088，使用 -p 更改端口号
superset runserver
```

### 填坑

当执行上面安装命令的时候，会遇到一些错误，这里写出几个遇到的坑

1.sasl/sasl.h: No such file or directory

解决办法： `sudo yum -y install cyrus-sasl cyrus-sasl-devel cyrus-sasl-lib `

2.Was unable to import superset Error: cannot import name '_maybe_box_datetimelike'   

问题原因：这是 pandas 库版本太高导致的，需要安装低版本的 pandas 库。  
解决办法：`pip install pandas==0.23.4`    
出处：[https://github.com/apache/incubator-superset/issues/6770](https://github.com/apache/incubator-superset/issues/6770)   

3.ImportError: No module named 'flask.exthook'

问题原因：flask版本太高   
解决办法：`pip install flask==0.12.2`   
出处：[https://github.com/apache/incubator-superset/issues/5006](https://github.com/apache/incubator-superset/issues/5006)   

4.Can't determine which FROM clause to join from, there are multiple FROMS which can join to this entity.

解决办法：`use pip install sqlalchemy==1.2.18`   
出处：[https://github.com/apache/incubator-superset/issues/6977](https://github.com/apache/incubator-superset/issues/6977)      

### 完成

默认端口8088，然后就可以使用开始设置的用户名密码登录了，因为刚才加载了demo数据，所以看一下demo效果。