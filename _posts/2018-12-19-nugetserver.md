---
layout: post
title: 搭建Nuget服务器并发布Nuget包
categories: [运维]
description: 搭建Nuget服务器并发布Nuget包
keywords: nuget, .net
---

日常开发中，团队开发的一些基础类库需要被他人引用，那么引用路径失效，包版本维护就会成为问题。那么能不能放到私有云Nuget服务器呢？本文主要讲述如果搭建本地Nuget服务器，并且发布Nuget包，供他人下载使用。

## 一、搭建Nuget服务器

### 新建NugerServer Web应用程序

* 打开Visual Studio，新建项目，选择ASP.NET Web 应用程序(.NET Framework),模板选择空即可。

![](https://allanhao.com/images/2018-12-19-08-59-35.png)

![](https://allanhao.com/images/2018-12-19-09-01-25.png)

* 点击工具 > Nuget包管理器 > 管理解决方案的Nuget包，添加Nuget.Server包。  

![](https://allanhao.com/images/2018-12-19-09-05-19.png)

Web.config中是Nuget站点的相关配置，其中apikey是上传删除nuget包的秘钥，这里先不作设置，全部默认。

![](https://allanhao.com/images/2018-12-19-09-06-27.png)

* 发布站点，将文件夹拷贝到服务器，在服务器发布IIS站点。

![](https://allanhao.com/images/2018-12-19-09-08-43.png)

![](https://allanhao.com/images/2018-12-19-09-09-39.png)

* 访问站点，出现如下界面，说明发布Nuget服务器成功。

![](https://allanhao.com/images/2018-12-19-09-11-30.png)

## 二、发布Nuget包

首先下载[Nuget.exe](https://dist.nuget.org/win-x86-commandline/latest/nuget.exe)

将要发布的dll和Nuget.exe 拷贝到一个独立的文件夹（例如package）,如图：

![](https://allanhao.com/images/2018-12-19-09-17-52.png)

然后在package目录新建文件夹lib，在lib中新建支持的.net framework目录，如net40,net45，这里我只支持net45,所以讲dll拷贝到lib\net45下，如果有支持其他famework版本的dll，可以拷贝到对应目录。

![](https://allanhao.com/images/2018-12-19-09-20-47.png)

在nuget.exe同级目录执行命令 nuget spec [包名称] ，如nuget spec GAIA.GIS，会生成一个nuspec文件。

![](https://allanhao.com/images/2018-12-19-09-23-19.png)

编辑nuspec文件，修改包的相应信息，如版本号，作者，拥有者，许可地址，项目地址，描述信息，标签等，比较简单。

> 注意，如果没有依赖，可以把<dependency>节点删除

![](https://allanhao.com/images/2018-12-19-09-26-44.png)

修改完成后，执行nuget pack [nuspec名称]，例如 nuget pack GAIA.GIS.nuspec,则会生成包nupkg文件。

![](https://allanhao.com/images/2018-12-19-09-29-26.png)

将nupkg文件拷贝的服务器站点目录的Packages文件夹内就好了。

## 三、使用Nuget服务器

在Visual Studio中点击工具 > Nuget包管理器 > 程序包管理器设置 > 程序包源,加入一个新的程序包源的名称和地址就好了，地址就是上面发布的站点中提到的包地址。

![](https://allanhao.com/images/2018-12-19-09-34-33.png)

![](https://allanhao.com/images/2018-12-19-09-33-55.png)


