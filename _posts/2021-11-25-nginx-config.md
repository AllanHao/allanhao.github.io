---
layout: post
title: nginx代理配置
categories: [运维]
description: nginx代理配置
keywords: 运维
excerpt: 
---

# Nginx代理配置


# 常见错误及解决方案

## connect() to ****:8080 failed (13: Permission denied) while connecting to upstream

关闭SELinux
```bash
setsebool -P httpd_can_network_connect 1
```


