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

> ### 关于版本号：     
这里指Net Framework风格的版本号，      
即，**主版本号.子版本号[.编译版本号[.修订版本号]]**   
> 
> 英文对照：    
Major_Version_Number.Minor_Version_Number[.Build_Number[.Revision_Number]] 
>         
> 主版本号和次版本号是必选的；编译版本号和修订号是可选的，但是如果定义了修订号部分，则编译版本号就是必选的。
>      
> 所有定义的部分都必须是大于或等于 0 的整数。  
>     
> 应根据下面的约定使用这些部分：     
**Major** ：具有相同名称但不同主版本号的程序集不可互换。例如，这适用于对产品的大量重写，这些重写使得无法实现向后兼容性。     
**Minor** ：如果两个程序集的名称和主版本号相同，而次版本号不同，这指示显著增强，但照顾到了向后兼容性。例如，这适用于产品的修正版或完全向后兼容的新版本。    
**Build** ：编译版本号（内部版本号）的不同表示对相同源所作的重新编译。这适合于更改处理器、平台或编译器的情况。      
**Revision** ：名称、主版本号和次版本号都相同但修订号不同的程序集应是完全可互换的。这适用于修复以前发布的程序集中的安全漏洞。 

在Visual Studio中选择NuGet包管理器，搜索“MSBump”,安装，然后在工程文件下新建一个.msbump文件，写入如下代码：
```json
{
  Configurations: {
    "Debug": {
      BumpLabel: "dev",
      LabelDigits: 4
    },
    
    "Release": {
      BumpRevision: true,
      ResetLabel: "dev"
    }
  }
}
```

上文表示：当编译配置为“Debug”时，版本号生成一个dev前缀后面跟四位数字的标签，数字从0001开始递增。当编译配置为“Release”时，修订版本号会+1，清除dev标签。当然，也可以直接在.msbump中这样写：
```json
{
    BumpRevision: true
}
```

意思就是每次编译不管debug还是release，都会使修订版本号+1

## 在Jenkins中操作

> 前提操作：    
需要下载NuGet.exe，并且把NuGet.exe所在目录和MSBuild所在目录加入到环境变量中，这样方便在Jenkins中直接使用msbuild和nuget命令。

* 安装Jenkins

这里不再赘述，自行百度，就是安装Java那套环境

* 新建任务

新建任务，起个名字，选择“构建一个自由风格的软件项目”，点击“OK”：
![](https://allanhao.com/images/2018-12-26-09-26-46.png)

* 编辑配置信息

我们用的是Git管理代码，所以源代码管理里选择Git，输入仓库地址和用户名密码，选择需要拉取的分支名称：
![](https://allanhao.com/images/2018-12-26-09-28-36.png)

触发条件，可以根据自己的需求，比如每日定时调度：
![](https://allanhao.com/images/2018-12-26-09-29-19.png)

编译环境中选择编译开始前清空Workspace，保证拉取最新代码不冲突：
![](https://allanhao.com/images/2018-12-26-09-31-14.png)

编译步骤中，选择执行Windows批处理命令，主要执行如下操作：
1.进入工程文件目录    
2.还原所有依赖的包   
3.执行编译Release版本     
4.进入Releas目录     
5.将生成的nupkg文件推送到NuGet服务器     
6.由于生成操作修改的修订版本号，所以将修改的文件提交  

代码：

```bash
cd GAIA.GIS\
msbuild -t:restore
msbuild /p:Configuration=Release
cd bin\Release\
nuget push *.nupkg -Source http://192.168.1.209:1024/nuget iwehave2305!
git commit -a -m updateversion
```

如图 ：
![](https://allanhao.com/images/2018-12-26-09-35-04.png)

创建编译后事件，将修改记录推送到git服务器，也可以加失败邮件通知等等操作：
![](https://allanhao.com/images/2018-12-26-09-37-03.png)

保存

立即构建测试一下，大功告成~
