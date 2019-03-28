---
layout: post
title: docker容器间访问出错-No route to host
categories: [docker]
description: docker容器无法访问宿主机-No route to host
keywords: docker
---

在linux部署docker镜像时，遇到docker容器间调用服务失败的问题 ，报错信息为：No route to host。而在linux外局域网访问docker容器没有问题。

> 下面引自https://www.jianshu.com/p/96aebba5d3cc

## 原因分析

本文中在centos上部署docker容器，其网络模式采用的是bridger模式。

启动docker时，docker进程会创建一个名为docker0的虚拟网桥，用于宿主机与容器之间的通信。当启动一个docker容器时，docker容器将会附加到虚拟网桥上，容器内的报文通过docker0向外转发。

如果docker容器访问宿主机，那么docker0网桥将报文直接转发到本机，报文的源地址是docker0网段的地址。而如果docker容器访问宿主机以外的机器，docker的SNAT网桥会将报文的源地址转换为宿主机的地址，通过宿主机的网卡向外发送。

因此，当docker容器访问宿主机时，如果宿主机服务端口会被防火墙拦截，从而无法连通宿主机，出现No route to host的错误。

而访问宿主机所在局域网内的其他机器，由于报文的源地址是宿主机ip，因此，不会被目的机器防火墙拦截，所以可以访问。

## 解决办法

### 方法一：关闭防火墙

```bash
systemctl stop firewalld
```

### 方法二：在防火墙上开放指定端口

```bash
firewall-cmd --zone=public --add-port=2181/tcp --permanent
firewall-cmd --reload
```

## 小结

这个问题是在用docker方式部署fabric网络中遇见的错误，容器技术为fabric网络部署带来了极大的便利和运维的方便，但是另一方面也带来了网络的复杂，因此，在运行fabric网络中要尤其注意docker镜像网络问题。

