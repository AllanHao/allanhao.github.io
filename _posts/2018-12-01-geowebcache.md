---
layout: post
title: 独立部署GeoWebCache
categories: [GeoWebCache]
description: 独立部署GeoWebCache
keywords: GeoWebCache
---

在进行GIS项目开发中，常使用Geoserver作为开源的地图服务器，Geoserver是一个JavaEE项目，常通过Tomcat进行部署。而GeoWebCache是一个采用Java实现用于缓存WMS-Tile(瓦片)的开源项目。当客户端请求一张新地图和Tile时，GeoWebCache将拦截这些调用然后返回缓存过的Tiles。 本文主要讲述独立部署GeoWebCache，并且复用已经切好的瓦片缓存。

在实际项目中，需要对比较大数据量的地图切缓存，例如全国地图，并且移植复用，进行私有云部署。那么如果GeoWebCache直接发布已经切好的缓存呢？

## 一、下载安装GeoWebCache(GWC)

不知为何，GeoWebCache官网竟然无法访问，这里直接给出下载地址：<a href='https://excellmedia.dl.sourceforge.net/project/geowebcache/geowebcache/1.14.1/geowebcache-1.14.1-war.zip' target='_blank'>geowebcache-1.14.1-war.zip</a>

这里是各个版本的列表：<a href='https://sourceforge.net/projects/geowebcache/files/geowebcache/' target='_blank'>https://sourceforge.net/projects/geowebcache/files/geowebcache</a>

**注意：**安装GWC前提还是要安装java jre(或者jdk)，安装Tomcat，这里就不赘述了，不明白可以看之前的文章：[基于Tomcat安装Geoserver](https://allanhao.com/2018/06/21/基于Tomcat安装Geoserver/)

将geowebcache的war包拷贝到tomcat的webapps目录下即可，启动tomcat，输入http://localhost:8080/geowebcache，显示如下界面说明安装成功。
![](https://allanhao.com/images/2018-12-01-19-43-27.png)

点击“A list of all the layers and automatic demos”链接即可进入缓存图层列表，默认有三个图层：
![](https://allanhao.com/images/2018-12-01-19-46-36.png)

## 二、修改缓存目录

GWC默认的数据缓存目录在%temp%\geowebcache中，我们将其修改至D:\GISData\gwccache

进入tomcat目录，在\webapps\geowebcache\WEB-INF中修改web.xml文件，加入如下内容：

```xml
 <context-param>
      <param-name>GEOWEBCACHE_CACHE_DIR</param-name>
      <param-value>D:\GISData\gwccache</param-value>
</context-param> 
```

**注意：** 一个“context-param”节点只能有一个键值对。

![](https://allanhao.com/images/2018-12-01-19-54-25.png)

重启tomcat，发现D:\GISData\gwccache目录多了一些文件：
![](https://allanhao.com/images/2018-12-01-19-56-28.png)

## 三、复用瓦片缓存文件，发布wms图层

1.将之前缓存好的瓦片拷贝到D:\GISData\gwccache目录下：
![](https://allanhao.com/images/2018-12-01-20-02-45.png)

缓存文件夹名称即为要发布的图层名称，打开后层级目录如下，以gridset名称和zoom等级命名：
![](https://allanhao.com/images/2018-12-01-20-04-22.png)

2.打开D:\GISData\gwccache\geowebcache.xml文件，在Layers节点下加入如下代码：

```xml
   <wmsLayer>
   <!-- 这里的name名称要和上面缓存文件夹的名称一致 -->
      <name>group_yingshi_xa_f1</name>
      <mimeFormats>
        <string>image/gif</string>
        <string>image/jpeg</string>
        <string>image/png</string>
        <string>image/png8</string>
      </mimeFormats>
      <gridSubsets>
        <gridSubset>
          <gridSetName>EPSG:4326</gridSetName>
          <!-- 这里是缓存文件地图的范围 -->
          <extent>
            <coords>
              <double>108.940032958984</double>
              <double>34.2428131103516</double>
              <double>108.942024230957</double>
              <double>34.2460136413574</double>
            </coords>
          </extent>
        </gridSubset> 
      </gridSubsets> 
      <wmsUrl>
      <!-- 经过测试，如果你只是想发布瓦片缓存地图，这里wmslayer url可以随便写一个 -->
        <string>http://127.0.0.1/wms</string>
      </wmsUrl> 
    </wmsLayer>
```

3.重启tomcat服务器，会发现图层列表中多了一个图层：
![](https://allanhao.com/images/2018-12-01-20-12-52.png)

4.以png方式浏览，缓存地图加载成功：
![](https://allanhao.com/images/2018-12-01-20-14-17.png)

## 四、问题解决

通过openlayers访问时会出现烦人的400错误，通过查看客户端代码发现，extend为[-180,-90,180,90]
![](https://allanhao.com/images/2018-12-01-20-25-38.png)
![](https://allanhao.com/images/2018-12-01-20-27-07.png)

我们只需改为地图实际的extend即可：
![](https://allanhao.com/images/2018-12-01-20-27-46.png)