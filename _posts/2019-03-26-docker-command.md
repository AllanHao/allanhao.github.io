---
layout: post
title: docker基础命令备忘
categories: [docker]
description: docker基础命令备忘
keywords: docker
---

docker 基础命令备忘

## 安装与启动

搜索docker源：`yum search docker`

安装docker：`sudo yum install docker -y`
 
启动docker：`sudo systemctl start docker`

开机启动docker：`sudo systemctl enable docker`

## 镜像相关 

打包镜像：进入到dockerfile目录，`docker build -t [镜像名称]`

启动镜像文件：`docker run [镜像名称]`

查看所有镜像文件：`docker images`

删除指定镜像：`docker rmi [镜像Id]`

删除所有镜像：`docker rmi $(docker images)`

## 容器相关

使用编排工具创建并且后台启动容器：`docker-composer -f docker-db.yml up -d`

创建容器：`docker-compose -f docker-db.yml create`

启动容器：`docker-compose -f docker-db.yml start`

关闭容器：`docker-compose -f docker-db.yml stop`

查看当前所有容器:`docker ps -a`

删除当前所有容器：`docker rm $(docker ps -a -q)`

进入到容器内部：`docker exec -it 9esd bash`

将修改后的容器重新打成镜像：`docker commit -m  ""   -a  ""   [CONTAINER ID]  [给新的镜像命名]`  //-m:message -a；author

## Linux相关

查看ip：`ifconfig`

在使用docker容器时，有时候里边没有安装vim，敲vim命令时提示说：vim: command not found，这个时候就需要安装vim，可是当你敲apt-get install vim命令时，提示：

Reading package lists... Done
Building dependency tree       
Reading state information... Done
E: Unable to locate package vim 

这时候需要敲：·`apt-get update`，这个命令的作用是：同步 /etc/apt/sources.list 和 /etc/apt/sources.list.d 中列出的源的索引，这样才能获取到最新的软件包。

等更新完毕以后再敲命令：`apt-get install vim`命令即可。 

复制文件夹：`\cp -rf ./geo_dir ./DockerData/` `将geo_dir文件夹复制到DockerData下，并且强制覆盖不提示`    

删除文件夹：`rm -f -I wifi_traffik/` `删除wifi_traffik文件夹`