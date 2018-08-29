---
layout: post
title: 基于Tomcat安装Geoserver
date: 2018-06-21 14:45
author: Allan
category: blog
tags:
    - geoserver
    - opengis
---

## 安装Geoserver ##

- 下载安装[java jre 1.8](https://java.com/zh_CN/download/)

- 下载安装[Apache Tomcat 8.5](http://mirrors.hust.edu.cn/apache/tomcat/tomcat-8/v8.5.31/bin/apache-tomcat-8.5.31.exe)

- 下载[GeoServer 2.13.1 war](https://jaist.dl.sourceforge.net/project/geoserver/GeoServer/2.13.1/geoserver-2.13.1-war.zip)

- 解压geoserver-2.13.1-war.zip，将geoserver.war拷贝到Tomcat WebApps目录下

## JDK8+Tomcat8配置https ##

### 生成keystore文件 ###

> 需安装Java JDK

```
keytool -genkeypair -alias tomcat -keyalg RSA -keypass password -storepass password -keystore path_to_keystore/name_for_keystore.keystore

-alias 表示证书的别名，一个keystore文件中可以存放多个alias。 
-keyalg RSA 表示密钥算法的名称为RSA算法 
-keypass password表示密钥的口令是password 
-storepass password表示密钥库（生成的keystore文件）的密钥是keypass。 
//注意：keypass和storepass理论上是可以不同的，但是我们生成的密钥是要给tomcat用的，tomcat这家伙好像没有提供提取私钥的密码（就是上边那个keypass）配置，
//因此我们只好将两个密码设置成一样的。 
-keystore是生成的或者已有的keystore文件的位置，如果不提供的话，keytool工具会把它放在用户目录下，还起了个名字叫.keystore。 
```

### 配置Tomcat ###
在Tomcat安装目录的conf文件夹下有个server.xml文件，找到我们需要打开HTTPS功能的Service，添加一个Connector。
```
    <Connector port="8443" protocol="org.apache.coyote.http11.Http11NioProtocol"
               maxThreads="150" SSLEnabled="true" scheme="https" secure="true"
			   clientAuth="false" sslProtocol="TLS"
			   keystoreFile="conf/t.keystore" keystorePass="password"
	/>
```