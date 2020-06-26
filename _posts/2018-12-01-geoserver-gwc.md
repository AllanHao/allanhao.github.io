---
layout: post
title: GeoServer中GeoWebCache(GWC)的使用
categories: [GeoServer]
description: 利用GeoWebCache实现WebGIS地形图展示的缓存优化
keywords: GeoServer, GeoWebCache
---

本文介绍GeoWebCache的使用方法，包括如何切缓存，访问缓存wms/wmts服务，如何复用栅格缓存等。

> 文章大部分内容转载自<a href='https://www.cnblogs.com/naaoveGIS/p/4195008.html' target='_blank'>https://www.cnblogs.com/naaoveGIS/p/4195008.html</a>

## 1.前言

在geoserver1.7版本之后，geoserver本身集成了GeoWebCache这个模块。本文介绍的是geoserver2.2版本，其本身自带有GeoWebCache。不过如果你的geoserver版本比较老，或者想使用最新的GeoWebCache，可以自行在网上下载此工具，然后根据说明按照和配置，这里不做描述。

## 2.GeoWebCache简介

### 2.1 总体描述

GeoWebCache(GWC)是一个采用Java实现用于缓存WMS（Web Map Service）Tile的开源项目。当地图客户端请求一张新地图和Tile时，GeoWebCache将拦截这些调用然后返回缓存过的Tiles。如果找不到缓存再调用服务器上的Tiles，从而提高地图展示的速度。实现更好的用户体验。

### 2.2特点描述

a.GWC支持多种来源的瓦片，比如ArcGIS的瓦片。

b.GWC支持多种请求，比如WMS、WMS-C、WMTS、TMS、Googl Maps KML和Virtual Earth。

c.GWC支持在第一次请求地图某范围时，将此范围内的地图按照配置的信息进行切图缓存。第二次同样请求此范围的地图时，直接读取缓存瓦片进行加速显示。此功能类似于AGS的动态出图。

d.GWC同时也支持预先将瓦片按照配置信息切完，地图加载时直接读取瓦片。此功能类似于AGS的瓦片缓存出图。

## 3.具体配置

由于我所用的Geoserver本身自带有此功能，所以配置相对容易。

### 3.1配置瓦片存放地址

在GeoServer的web.xml文件中加上如下配置，便可以控制瓦片存放的目录：
![](https://allanhao.com/images/2018-12-01-09-47-22.png)

### 3.2瓦片详细信息配置

当我们配置好3.1中的地址项后，重启tomcat，可以发现在指定的瓦片存放文件夹下产生了这样三个文件：
![](https://allanhao.com/images/2018-12-01-09-48-11.png)

其中的GeoWebCache.xml便是瓦片的详细配置文档。此配置项在支持使用其他来源的瓦片进行显示上非常重要。不过，目前Geoserver中的集成版本不支持此功能，GeoWebCache的独立版本可以支持，在以后的章节里跟我跟大家一起探讨此功能。

## 4.切图操作

### 4.1.进入gwc页面

启动tomcat后，在浏览器中直接输入http://localhost:8680/geoserver/gwc/，可进入如下页面：
![](https://allanhao.com/images/2018-12-01-09-49-18.png)

### 4.2选择需要切图的服务

点击list选项，可以看到能够进行切图的服务：
![](https://allanhao.com/images/2018-12-01-09-50-07.png)

### 4.3进行预切图（非必须）

如果想实现类似于AGS中预先将所有瓦片全部进行切图的效果，可以点击要进行切图的图层下的Seed this layer：
![](https://allanhao.com/images/2018-12-01-09-50-37.png)

点击Submit后，开始进行预切图，在页面中可以看到切图进程：
![](https://allanhao.com/images/2018-12-01-09-50-59.png)

在瓦片缓存目录下可以看到切图结果：
![](https://allanhao.com/images/2018-12-01-09-51-17.png)

**注意**：在切图页面上，也可以停止切图进程：
![](https://allanhao.com/images/2018-12-01-09-51-52.png)

## 5.使用切图服务探究

### 5.1如果我们的WMS请求为一般性url，是否可以自动开启瓦片缓存服务？——不能

点击Geoserver中的layer preview，查看某一图层，某一URL为：http://localhost:8680/geoserver/wms?LAYERS=tilelayer&STYLES=&FORMAT=image%2Fpng&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG%3A4326&BBOX=104.07920033743,30.648478876565,104.08458074933,30.652787409535&WIDTH=512&HEIGHT=410。

效果如下：

![](https://allanhao.com/images/2018-12-01-09-52-51.png)

查看我们的瓦片缓存文件，并没有任何跟改图层服务相关的瓦片缓存生成：
![](https://allanhao.com/images/2018-12-01-09-53-15.png)

### 5.2使用特殊的WMS的url，是否可以自动开启瓦片缓存服务？——可以
![](https://allanhao.com/images/2018-12-01-09-53-44.png)

点击此项中的png，在弹出的页面中放大缩小，某一URL为：http://localhost:8680/geoserver/gwc/service/wms?LAYERS=urbanlayer%3Atilelayer&FORMAT=image%2Fpng&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS=EPSG%3A4326&BBOX=104.1943359375,30.5419921875,104.23828125,30.5859375&WIDTH=256&HEIGHT=256

效果如下：
![](https://allanhao.com/images/2018-12-01-09-54-04.png)

此时，在瓦片缓存文件夹中我们可以明显的看到生成的对应缓存：
![](https://allanhao.com/images/2018-12-01-09-54-20.png)

### 5.3由以上例子总结

对比以上两个服务的url：      
http://localhost:8680/geoserver/wms      
http://localhost:8680/geoserver/gwc/service/wms

可以看见两者的区别仅仅在于，当请求的URL中加上gwc/service后，便可以开启瓦片缓存服务了。

## 6.可能存在的问题

### 6.1效率问题

如果使用动态切图，即非预切图。当需要切图的数据（图层或图层组）很大时，会不会地图第一次显示比较慢？

### 6.2切图效果失真问题

网上有人提出这样一个问题：问题是GeoWebCache切片后的图片质量降低，缩放的时候图片像素都拥挤在一起，没有像windows图片查看器或者ps那样缩小的图片还那样保持清晰。

原图：
![](https://allanhao.com/images/2018-12-01-09-56-11.png)

GWC瓦片：
![](https://allanhao.com/images/2018-12-01-09-56-26.png)

**注意：**针对此问题，有网友给出了解决方案：尝试使用maptiler切片工具，不过 maptiler工具有局限，无法整合多张图后一起切图。