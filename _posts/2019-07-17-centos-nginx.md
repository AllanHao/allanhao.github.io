---
layout: post
title: CentOS7安装Nginx及配置
categories: [linux, nginx]
description: CentOS7安装Nginx
keywords: linux, nginx
---

Nginx (engine x) 是一个高性能的 HTTP 和反向代理服务器，也是一个 IMAP/POP3/SMTP 服务器。。。本文主要讲述基于CentOS7安装与配置Nginx。

## 前提

参考[基于CentOS 7使用fontnik](https://allanhao.com/2019/07/13/centos-fontnik/)安装CentOS 7，设置国内源，安装EPEL，关闭防火墙

## 安装Nginx

Nginx不在默认的yum源中，但是因为有了EPEL，就可以直接yum安装了。

```bash
sudo yum install nginx
```

## 配置Nginx

查看Nginx配置：

```bash
sudo nginx -t

# nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /etc/nginx/nginx.conf test is successful
```
