---
layout: post
title: 查看linux配置的一些常用命令
categories: [linux]
description: 查看linux配置的一些常用命令
keywords: linux
excerpt: 下面介绍如何查看linux下的cpu、内存和硬盘大小。  
---

下面介绍如何查看linux下的cpu、内存和硬盘大小。  

## 查看cpu的方法  

cat /proc/cpuinfo  或者 更直观的查看cpu的型号命令：dmesg |grep -i xeon

## 查看内存的方法

cat /proc/meminfo  或者 更直观的查看内存的命令：free -m

 

## 查看硬盘大小

df -h

最后用top命令也可以查看到cpu和内存的使用率 在输入top命令之后直接按"1" 就能很清楚的查看到cpu和内存的使用情况。