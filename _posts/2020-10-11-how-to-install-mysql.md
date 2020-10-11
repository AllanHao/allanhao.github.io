---
layout: post
title: Mac下如何安装MySQL
categories: [MySQL, 运维]
description: Mac下如何安装MySQL
keywords: MySQL, Mac
excerpt: 本文主要介绍Mac下如何安装MySQL
---

本文主要介绍Mac下如何安装MySQL
> 本文转自https://zhuanlan.zhihu.com/p/27960044

## MySQL 下载安装  

点击[http://dev.mysql.com/downloads/mysql/](http://dev.mysql.com/downloads/mysql/)进行下载，推荐下载dmg格式（10.11系统也可以打开，放心下载即可）

![](https://allanhao.com/images/2020-10-11-16-34-16.png)

![](https://allanhao.com/images/2020-10-11-16-35-39.png)

![](https://allanhao.com/images/2020-10-11-16-35-54.png)

![](https://allanhao.com/images/2020-10-11-16-36-03.png)

之后点击安装，注意！注意！注意！之后弹出的窗口请注意！

上面会有你的临时密码，如果手速特别快别慌张，通知中心会有的~

![](https://allanhao.com/images/2020-10-11-16-36-20.png)

就像上图一样。

MySQL就这样安装好了，下面是配置。

## MySQL 配置  

首先打开系统偏好设置 -> MySQL 把它打开  

![](https://allanhao.com/images/2020-10-11-16-38-20.png)

启动MySQL服务

打开终端，输入

```bash
cd ~
touch .bash_profile
open -e .bash_profile
```

![](https://allanhao.com/images/2020-10-11-16-39-01.png)

在打开的文件中输入：
```bash
export PATH=${PATH}:/usr/local/mysql/bin
```

然后保存，退出文件，关闭终端并退出。

现在你就可以通过 mysql -u root -p 登录 mysql 了，会让你输入密码，就是通知中心上的。

登录成功后，你可以通过下面的命令修改密码

```bash
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('新密码');
```

![](https://allanhao.com/images/2020-10-11-16-40-05.png)

如果你看到了这里，说明MySQL安装配置已经完成。