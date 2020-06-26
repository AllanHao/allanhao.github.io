---
layout: post
title: windows下GitHub的SSH key配置
categories: [运维]
description: windows下GitHub的SSH key配置
keywords: SSH key, Github
---

SSH Key 是一种方法来确定受信任的计算机，从而实现免密码登录。
Git是分布式的代码管理工具，远程的代码管理是基于SSH的，所以要使用远程的Git则需要SSH的配置。
下面的步骤将完成 生成SSH密钥 并 添加公共密钥到GitHub上的帐户

> 本文引自https://www.jianshu.com/p/9317a927e844

## 先设置GitHub的user name和email

```bash
git config --global user.name "Git账号" 
git config --global user.email "Git邮箱"
```

## 生成一个新的SSH密钥

打开 Git Bash，输入如下命令，然后连续按三个回车即可：

```bash
ssh-keygen -t rsa -C "your_email@example.com"
```

![](https://allanhao.com/images/2019-03-08-15-28-33.png)

注：生成的SSH私钥路径 /c/Users/chenjs/.ssh/id_rsa 后面要用到。

## 将SSH私钥添加到 ssh-agent

配置 ssh-agent 程序使用 SSH key

* 在后台启动 ssh-agent

```bash
eval $(ssh-agent -s)
```

* 将SSH私钥添加到 ssh-agent

```bash
ssh-add /c/Users/chenjs/.ssh/id_rsa
```

![](https://allanhao.com/images/2019-03-08-15-30-02.png)

## 将SSH公钥添加到GitHub账户

配置GitHub账户使用 SSH key

* 先复制SSH公钥的完整内容（/c/Users/chenjs/.ssh/id_rsa.pub）
```bash
clip < /c/Users/chenjs/.ssh/id_rsa.pub
```

* 进入GitHub的设置页面（登录GitHub，在右上角）

* 点击左部侧边栏的 SSH keys 选项

* 点击 Add SSH key 按钮
![](https://allanhao.com/images/2019-03-08-15-31-51.png)

* 在Title输入框内，为你的新key取个名字，在Key输入框内，粘贴前面复制好的公钥内容，然后点击 Add key 按钮即可。

![](https://allanhao.com/images/2019-03-08-15-32-35.png)

## 测试连接

打开 Git Bash 输入：
```bash
ssh -T git@github.com
```

将会看到如下提示：

![](https://allanhao.com/images/2019-03-08-15-33-14.png)

如果提示中的用户名是你的，说明SSH key已经配置成功。
如果提示的是“ access denied”， [you can read these instructions for diagnosing the issue.](https://help.github.com/en/articles/error-permission-denied-publickey)