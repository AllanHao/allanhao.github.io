---
layout: post
title: docker基础命令备忘
categories: [docker]
description: docker基础命令备忘
keywords: docker
---

## 镜像相关
--------------

打包镜像：进入到dockerfile目录，`docker build -t [镜像名称]`

启动镜像文件：`docker run [镜像名称]`

查看所有镜像文件：`docker images`

删除指定镜像：`docker rmi [镜像Id]`

删除所有镜像：`docker rmi $(docker images)`

## 容器相关
-------------

使用编排工具创建并且后台启动容器：`docker-composer -f docker-db.yml up -d`

创建容器：`docker-compose -f docker-db.yml create`

启动容器：`docker-compose -f docker-db.yml start`

关闭容器：`docker-compose -f docker-db.yml stop`

查看当前所有容器:`docker ps -a`

删除当前所有容器：`docker rm $(docker ps -a -q)`

进入到容器内部：`docker exec -it 9esd bash`
