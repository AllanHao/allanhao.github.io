---
layout: post
title: 基于CentOS7使用fontnik
categories: [Linux, MapBox]
description: 基于CentOS7使用fontnik
keywords: Linux, MapBox, fontnik
---

Mapbox 加载矢量切片数据中字体采用的是SDF形式，所以需要将ttf等字体切成pbf文件。Mapbox团队开源了一个工具，将普通的ttf和otf字体转换成Mapbox GL渲染需要的字体的工具：[node-fontnik](https://github.com/mapbox/node-fontnik)。下面来介绍CentOS 7下安装node-fontnik

## 安装centos7

不管用是用虚拟机也好还是物理机也好，准备安装centos7，具体步骤这里就略了，网上有很多教程。

**安装国内yum源**

1.备份之前的源文件

```bash
 cd /etc/yum.repos.d/
 mkdir repo_backup
 mv *.repo repo_backup/
```

2.

## 安装nodejs

yum源原生不支持nodejs，所以或者源码安装，或者通过EPEL，这里介绍最简单的，通过EPEL：

```bash
sudo yum install epel-release
```

然后就可以使用yum命令安装nodejs了

```bash
sudo yum install nodejs
```

## 安装python

```bash
sudo yum install python
```

fetch.js

```javascript
var fontnik = require('.');
var fs = require('fs');
var path = require('path');

var convert = function(fileName, outputDir) {
    var font = fs.readFileSync(path.resolve(__dirname + "/" + fileName));
    output2pbf(font, 0, 255, outputDir);
}

function output2pbf(font, start, end, outputDir) {
    if (start > 65535) {
        console.log("done!");
        return;
    }
    fontnik.range({font: font, start: start, end: end}, function(err, res) {
        var outputFilePath = path.resolve(__dirname + "/" + outputDir + start + "-" + end + ".pbf");
        fs.writeFile(outputFilePath, res, function(err){
            if(err) {
                console.error(err);
            } else {
                output2pbf(font, end+1, end+1+255, outputDir);
            }
        });
    });
}

convert("./fonts/NotoSansHans-Regular.otf", "./siyuan-pbf/Noto Sans Hans Regular/");
convert("./fonts/NotoSansHans-Black.otf", "./siyuan-pbf/Noto Sans Hans Black/");
convert("./fonts/NotoSansHans-Bold.otf", "./siyuan-pbf/Noto Sans Hans Bold/");
convert("./fonts/NotoSansHans-DemiLight.otf", "./siyuan-pbf/Noto Sans Hans DemiLight/");
convert("./fonts/NotoSansHans-Light.otf", "./siyuan-pbf/Noto Sans Hans Light/");
convert("./fonts/NotoSansHans-Medium.otf", "./siyuan-pbf/Noto Sans Hans Medium/");
convert("./fonts/NotoSansHans-Thin-Windows.otf", "./siyuan-pbf/Noto Sans Hans Thin Windows/");
convert("./fonts/Microsoft-YaHei.ttf", "./yahei-pbf/Microsoft YaHei/");
```