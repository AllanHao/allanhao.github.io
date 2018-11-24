---
layout: post
title: 基于Tomcat安装Geoserver
date: 2018-06-21 14:45
author: Allan 
tags:
    - geoserver
    - opengis
categories: [GeoServer,运维]
---

## 安装Tomcat

* 下载[Java JDK 8](http://download.oracle.com/otn-pub/java/jdk/8u191-b12/2787e4a523244c269598db4e85c51e0c/jdk-8u191-windows-x64.exe)或者[Java JRE 8](http://download.oracle.com/otn-pub/java/jdk/8u192-b12/750e1c8617c5452694857ad95c3ee230/jre-8u192-windows-x64.exe) 安装。
* 新增环境变量JAVA\_HOME，值为jre或者jdk所在目录。
* 下载[Tomcat 8 zip](http://mirrors.hust.edu.cn/apache/tomcat/tomcat-8/v8.5.34/bin/apache-tomcat-8.5.34-windows-x64.zip)到指定目录解压，如：D:\tomcat。
* 修改config/tomcat-users.xml，添加或修改注释为如下代码：

```
  <role rolename="manager-gui"/> 
  <user username="tomcat" password="999999" roles="manager-gui"/>  
```

  如下图所示：



![](https://cdn.nlark.com/yuque/0/2018/png/203024/1541666950899-d272255a-1a13-4294-a4f6-f88a7e01d249.png)


* 双击bin/startup.bat启动Tomcat服务。
* 输入http://127.0.0.1:8080，出现如下界面说明安装成功。
      

![](https://cdn.nlark.com/yuque/0/2018/png/203024/1541667202619-933d6c0e-6cc3-4b76-80a8-9308b6ed4dba.png)


* 点击Manager App，输入上图中设置的用户名密码，即可进入app管理界面。



![](https://cdn.nlark.com/yuque/0/2018/png/203024/1541667359930-2ec14b41-58d0-4f76-b56e-abe537def919.png)


* 至此，Tomcat安装完成。

## 安装GeoServer

* 下载[GeoServer war](https://jaist.dl.sourceforge.net/project/geoserver/GeoServer/2.13.3/geoserver-2.13.3-war.zip)文件。
* 解压，将geoserver.war文件拷贝到Tomcat目录下的webapps文件夹中，即可。
* 启动Tomcat服务，即可启动GeoServer服务。

## 配置SSL证书

### 生成keystore文件

> 需要安装Java JDK

```git
keytool -genkeypair -alias tomcat -keyalg RSA -keypass password -storepass password -keystore path_to_keystore/name_for_keystore.keystore

-alias 表示证书的别名，一个keystore文件中可以存放多个alias。 
-keyalg RSA 表示密钥算法的名称为RSA算法 
-keypass password表示密钥的口令是password 
-storepass password表示密钥库（生成的keystore文件）的密钥是keypass。 
//注意：keypass和storepass理论上是可以不同的，但是我们生成的密钥是要给tomcat用的，tomcat这家伙好像没有提供提取私钥的密码（就是上边那个keypass）配置，
//因此我们只好将两个密码设置成一样的。 
-keystore是生成的或者已有的keystore文件的位置，如果不提供的话，keytool工具会把它放在用户目录下，还起了个名字叫.keystore。 
```

### 配置Tomcat

<span data-type="color" style="color:rgb(36, 41, 46)"><span data-type="background" style="background-color:rgb(255, 255, 255)">在Tomcat安装目录的conf文件夹下有个server.xml文件，找到我们需要打开HTTPS功能的Service，添加一个Connector。</span></span>

```xml
  <Connector port="8443" protocol="org.apache.coyote.http11.Http11NioProtocol"
    maxThreads="150" SSLEnabled="true" scheme="https" secure="true"
	clientAuth="false" sslProtocol="TLS"
	keystoreFile="conf/t.keystore" keystorePass="password"
  />
```