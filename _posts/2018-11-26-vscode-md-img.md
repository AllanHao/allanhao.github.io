---
layout: post
title: 使用VS Code编写Markdown文件
categories: [软件工具]
description:  
keywords: vs code, markdown
---

VS Code默认支持Markdown文件文件格式，这里介绍两个比较实用的功能，后续有新发现，可以持续更新。

## 实时预览

顾名思义，实时编辑，实时预览解析效果。
![](https://allanhao.com/images/2018-11-26-17-34-53.png)

在VS Code扩展中搜索“Markdown Preview Enhanced”，安装完成后重载即可。
![](https://allanhao.com/images/2018-11-26-17-36-26.png)

## 复制粘贴图片

这个要好好介绍一下，因为实在是太方便了。之前写个文档，都是把截图先截下来存好，然后引用路径，写作效率大大降低。

CSDN中就可以直接截图，复制粘贴，就传到CSDN服务器生成了图片url，很方便，所以想在CSDN写完，然后直接复制md文本到github，但是发现在GitHub Pages访问CSDN中的图片url全部报403错误。

偶然机会发现了一个神器——Paste Image，在扩展中搜索安装完成后需要进行简单的配置。扩展商店界面有详细的配置说明
![](https://allanhao.com/images/2018-11-26-17-43-31.png)

这里我只是修改了三处配置

```JavaScript
//图片保存在根目录下的images文件夹下     
"pasteImage.path": "${projectRoot}/images",  

//设置根目录    
"pasteImage.basePath": "${projectRoot}", 

//下面这点尤为重要，在下面插入域名地址，这样发布后才可能访问到。    
"pasteImage.insertPattern": "${imageSyntaxPrefix}https://allanhao.com/${imageFilePath}${imageSyntaxSuffix}"
```

