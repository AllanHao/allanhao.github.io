---
layout: post
title: Mac OS X下安装和配置Maven
categories: [Java, 运维]
description: Mac OS X下安装和配置Maven
keywords: java, maven
excerpt: 本文介绍Mac OS X下如何安装和配置Maven
---

本文介绍Mac OS X下如何安装和配置Maven。
> 本文引自https://juejin.im/entry/6844903780148838407

## 下载Maven
打开Maven官网下载页面：[http://maven.apache.org/download.cgi](http://maven.apache.org/download.cgi)    
下载:apache-maven-3.6.3-bin.tar.gz

解压下载的安装包到某一目录，比如：/usr/local/apache-maven-3.6.3

## 配置环境变量 
打开terminel输入以下命令：
```bash
vim ~/.bash_profile
```   

打开.bash_profile文件，在次文件中添加设置环境变量的命令
```bash
export M2_HOME=/usr/local/apache-maven-3.6.3`
export PATH=$PATH:$M2_HOME/bin
```

添加之后保存并推出，执行以下命令使配置生效：
```bash
source ~/.bash_profile
```

## 查看配置是否生效
输入：`mvn -v`命令，输出如下：
```
Apache Maven 3.6.3 (cecedd343002696d0abb50b32b541b8a6ba2883f)
Maven home: /usr/local/apache-maven-3.6.3
Java version: 1.8.0_261, vendor: Oracle Corporation, runtime: /Library/Java/JavaVirtualMachines/jdk1.8.0_261.jdk/Contents/Home/jre
Default locale: zh_CN, platform encoding: UTF-8
OS name: "mac os x", version: "10.15.4", arch: "x86_64", family: "mac"
```
则配置成功。