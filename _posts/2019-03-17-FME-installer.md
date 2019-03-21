---
layout: post
title: FME Desktop 2018 安装及破解方法
categories: [GIS, FME]
description: FME Desktop 2018 安装及破解方法
keywords: GIS, FME
---

FME Desktop是加拿大Safe Software公司开发的空间数据转换处理系统,它是完整的空间ETL解决方案。该方案基于OpenGIS组织提出的新的数据转换理念“语义转换”,通过提供在转换过程中重构数据的功能,实现了超过250种不同空间数据格式(模型)之间的转换,为进行快速、高质量、多需求的数据转换应用提供了高效、可靠的手段。可用于读写存储和转换各种空间数据。

## 下载地址
---------------

链接: https://pan.baidu.com/s/15sowGULaN3baVSuaeKlwPA 提取码: f8u2              

![](https://allanhao.com/images/2019-03-17-15-05-41.png)

## 安装及破解
--------------

1.从百度网盘下载好资源后，打开，选择安装程序，点击next。                    
**注意：**如果需要用到二次开发组件，请记得勾选objects 

![](https://allanhao.com/images/2019-03-17-15-08-51.png)

2.安装完成后，点击finish退出。       

![](https://allanhao.com/images/2019-03-17-15-09-21.png)

3.安装解压文件中的“fme-flexnet-win-x64.msi”程序，点击next。    

![](https://allanhao.com/images/2019-03-17-15-09-55.png)           

**注意：**如果需要二次开发，记得安装SDK

![](https://allanhao.com/images/2019-03-21-17-22-45.png)

4、默认安装完成后点击finish退出。        

![](https://allanhao.com/images/2019-03-17-15-10-11.png)

5、找到“fme-flexnet-win-x64.msi”安装目录，运行该目录下的“lmtools.exe”程序，点击第二项“System Settings”查看系统信息，然后回到解压文件中以记事本方式打开“dummy.txt”文件，修改以下数据并且保存：将“Computer/Hostname”复制到“COMPUTER_NAME”覆盖，将“Ethernet Address”复制到“HOSTID”覆盖。           
**注意：** 复制"Ethernet Address"的值不带双引号          

![](https://allanhao.com/images/2019-03-17-15-11-27.png)

6、运行“makekey.bat”。        

![](https://allanhao.com/images/2019-03-17-15-11-47.png)

7、查看解压文件中的“safe.lic”文件有无报错信息，将“safe.lic”复制到“fme-flexnet-win-x64.msi”程序安装目录下。

![](https://allanhao.com/images/2019-03-17-15-12-05.png)

8、点击“Corfing Services”项，点击“Browse”修改许可文件，然后点击Save service。  

![](https://allanhao.com/images/2019-03-17-15-13-09.png)

9、点击启动许可，等待片刻出现服务器启动成功提示即可。         

![](https://allanhao.com/images/2019-03-17-15-13-23.png)

10、双击快捷方式进入软件注册界面，在Server Name 中输入您的计算机名即可完成破解。  

![](https://allanhao.com/images/2019-03-17-15-13-39.png)

## 二次开发
---------------

我需要用到FMEObjects的类库解析CAD文件生成shape文件或者直接导入到PostGIS中。            
需要引用的dll在FME安装目录下——“FMEObjectsDotNet4.dll”，帮助文档和demo在FME安装目录下的fmeobjects文件夹下。
        
![](https://allanhao.com/images/2019-03-17-15-19-30.png)