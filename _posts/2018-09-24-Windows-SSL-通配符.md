---
layout: post
title: 申请免费通配符证书(Let's Encrypt)并绑定IIS（转载）
categories: [运维]
description: 申请免费通配符证书(Let's Encrypt)并绑定IIS（转载）
keywords: Let's encrypt
---

> 本文转载自[https://blog.csdn.net/qq_41608008/article/details/80491447](https://blog.csdn.net/qq_41608008/article/details/80491447)

## 什么是 Let’s Encrypt? ##
部署 HTTPS 网站的时候需要证书，证书由 CA 机构签发，大部分传统 CA 机构签发证书是需要收费的，这不利于推动 HTTPS 协议的使用。

Let’s Encrypt 也是一个 CA 机构，但这个 CA 机构是免费的！！！也就是说签发证书不需要任何费用。

## 什么是通配符证书 ##
在没有出现通配符证书之前，Let’s Encrypt 支持两种证书。

1）单域名证书：证书仅仅包含一个主机。

2）SAN 证书：一张证书可以包括多个主机（Let’s Encrypt 限制是 20）

证书包含的主机可以不是同一个注册域，不要问我注册域是什么？注册域就是向域名注册商购买的域名。

对于个人用户来说，由于主机并不是太多，所以使用 SAN 证书完全没有问题，但是对于大公司来说有一些问题：

* 子域名非常多，而且过一段时间可能就要使用一个新的主机。
* 注册域也非常多。

读者可以思考下，对于大企业来说，SAN 证书可能并不能满足需求，类似于 sina 这样的网站，所有的主机全部包含在一张证书中，而使用 Let’s Encrypt 证书是无法满足的。

## Let’s Encrypt 通配符证书 ##

通配符证书就是证书中可以包含一个通配符，比如 .example.com、.example.cn，读者很快明白，大型企业也可以使用通配符证书了，一张证书可以防止更多的主机了。

这个功能可以说非常重要，从功能上看 Let’s Encrypt 和传统 CA 机构没有什么区别了，会不会触动传统 CA 机构的利益呢？

#  如何申请 Let’s Encrypt 通配符证书 ##

为了实现通配符证书，Let’s Encrypt 对 ACME 协议的实现进行了升级，只有 v2 协议才能支持通配符证书。

也就是说任何客户端只要支持 ACME v2 版本，就可以申请通配符证书了，是不是很激动。

官方介绍 Certbot 0.22.0 版本支持新的协议版本

在了解该协议之前有几个注意点：

1）客户在申请 Let’s Encrypt 证书的时候，需要校验域名的所有权，证明操作者有权利为该域名申请证书，目前支持三种验证方式：

* dns-01：给域名添加一个 DNS TXT 记录。
* http-01：在域名对应的 Web 服务器下放置一个 HTTP well-known URL 资源文件。
* tls-sni-01：在域名对应的 Web 服务器下放置一个 HTTPS well-known URL 资源文件。

而申请通配符证书，只能使用 dns-01 的方式

安装Windows Ubuntu Bash
![](https://upload-images.jianshu.io/upload_images/2503502-f690e235f46aa680.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

打开控制面板\所有控制面板项\程序和功能，点击左边的“启用/关闭Windows功能”
选择上“适用于Linux的Windows子系统”后点“确定”安装相关功能
![](https://upload-images.jianshu.io/upload_images/2503502-c777afa840cc36d5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
然后打开“应用商店”Microsoft Store
搜索“Linux"会出现”在Windows上运行Linux的专题。
列出来的Linux子系统都是Windows10支持的Bash,
本人安装的是Ubuntu
![](https://upload-images.jianshu.io/upload_images/2503502-41c53bae9198badb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
安装后会在菜单里显示Ubuntu的启动项，第一次运行的时候，会要求设置一下管理员的相关密码
按提示设置就可以了
然后从菜单启动，就会看到熟悉的Ubuntu控制台了
我们用sudo lsb_release -a就可以看到当前安装的Ubuntu版本了
```
Giant@Giant:~$ sudo lsb_release -a
[sudo] password for Giant:
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 16.04.3 LTS
Release:        16.04
Codename:       xenial
```
接下来我们开始在这个Ubuntu Bash里通过Certbot申请Let's Encrypt通配符证书
首先安装Certbot
打开Certbot官网https://certbot.eff.org/
选择我们申请证书的使用方式后，就会出现相关安装命令
![](https://upload-images.jianshu.io/upload_images/2503502-97ad0010dbd22dc4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

由于我们的Ubuntu Bash系统是16.04版本，所以选择此系统
然后就会看到安装命令为
```
$ sudo apt-get update
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository ppa:certbot/certbot
$ sudo apt-get update
$ sudo apt-get install certbot 
```
完成这些命令后，我们的申请证书工具certbot已经安装完成。
我们打算给51tcsd.com这个域名申请通配符证书
那么我们就运行此命令
```
$ sudo certbot certonly  -d *.51tcsd.com --manual --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory
```
介绍下相关参数：

* certonly，表示安装模式，Certbot 有安装模式和验证模式两种类型的插件。
* --manual 表示手动安装插件，Certbot 有很多插件，不同的插件都可以申请证书，用户可以根据需要自行选择
* -d 为那些主机申请证书，如果是通配符，输入 *.newyingyong.cn（可以替换为你自己的域名）
* --preferred-challenges dns，使用 DNS 方式校验域名所有权
* --server，Let's Encrypt ACME v2 版本使用的服务器不同于 v1 版本，需要显示指定。

接下去就是命令行的输出：
![](https://upload-images.jianshu.io/upload_images/2503502-66b9d5ccc4a38656.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

上述有两个交互式的提示：

* 是否同意 Let's Encrypt 协议要求
* 询问是否对域名和机器（IP）进行绑定

确认同意才能继续。

继续查看命令行的输出，非常关键：

* 要求配置 DNS TXT 记录，从而校验域名所有权，也就是判断证书申请者是否有域名的所有权。*

上面输出要求给 _acme-challenge.51tcsd.com 配置一条 TXT 记录，在没有确认 TXT 记录生效之前不要回车执行。

我使用的是阿里云的域名服务器，登录控制台操作如下图：
![](https://upload-images.jianshu.io/upload_images/2503502-dcbdf224e34b9c00.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后打开另一个终端输入以下命令确认配置是否生效
```
dig -t txt _acme-challenge.51tcsd.com @8.8.8.8
```
输出如下表示成功配置好DNS记录了
![](https://upload-images.jianshu.io/upload_images/2503502-e017ea77ed0c3e6c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后在申请证书的终端里按下回车执行，输出如下
![](https://upload-images.jianshu.io/upload_images/2503502-f32dd981bca6a236.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

关键信息如下
```
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/51tcsd.com-0001/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/51tcsd.com-0001/privkey.pem
   Your cert will expire on 2018-08-23. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot
   again. To non-interactively renew *all* of your certificates, run
   "certbot renew"
```
表示把相关证书保存在了/etc/letsencrypt/live/51tcsd.com-0001/这个目录
我们进去看一下此目录文件生成了如下文件
cert.pem  chain.pem  fullchain.pem  privkey.pem  README
在Bash下，如果没有用超级用户可能进不到live/51tcsd.com-0001/，显示没有权限
我们用超级用户进入，命令如果下
```
$ sudo su
```
输出结果如下
![](https://upload-images.jianshu.io/upload_images/2503502-b5ae4f0b9b541092.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

到此为此，申请证书相关的工作就完成了

## 怎么把申请到的证书导入到IIS中 ##

由于我们申请的证书为pem格式，而IIS只支持pfx格式证书
所以我们要把输的人pem文件合并为pfx证书

这样我们就要用到openssl命令了
```
openssl pkcs12 -export -out 51tcsd.pfx -inkey privkey.pem -in fullchain.pem -certfile cert.pem
```
我们用此命令把pem文件合并为51tcsd.pfx文件，提示中要输入证书的密码，按提示输入即可
显示输出如下
![](https://upload-images.jianshu.io/upload_images/2503502-061bba41fc837387.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们可以看到，当前目录下成功生成了51tcsd.pfx文件
接下来我们就要把51tcsd.pfx文件导入到Windows系统
我们知道Ubuntu对于Windows来说只是一个应用，
所以Ubuntu里所有的文件，我们都可以通过Windows资源管理里看到，
我发现我的Ubuntu目录挂载在我的Windows目录的此位置

C:\Users\Administrator\AppData\Local\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState\rootfs
![](https://upload-images.jianshu.io/upload_images/2503502-a7f861ed97dc51e0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


C:\Users\Administrator\AppData\Local\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState\rootfs\etc\letsencrypt\live\51tcsd.com-0001

就可以看到我们的pfx文件了
![](https://upload-images.jianshu.io/upload_images/2503502-b33c4df215c26780.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

接下来。我们右键证书点安装pfx
![](https://upload-images.jianshu.io/upload_images/2503502-187ee447f7363ff5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

输入刚刚openssl合并的时候输入的密码
![](https://upload-images.jianshu.io/upload_images/2503502-af06f095bc06d7d8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

点完成后。就会显示导入成功了

接下来。我们打开IIS管理器。看到服务器证书里面，就能发现我们申请的通配符证书了
![](https://upload-images.jianshu.io/upload_images/2503502-c95633407a12eae6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/2503502-60c5deda4956a8c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


测试证书

接下来，我们给一个站点绑定随便一个二级域名，比如：a.51tcsd.com

首先把hosts文件把a.51tcsd.com解析到我本机127.0.0.1
![](https://upload-images.jianshu.io/upload_images/2503502-f04a47e803caf7f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后在IIS里选择站点”Default Web Site"选择右边的“绑定”
输入相关信息，并选择证书
![](https://upload-images.jianshu.io/upload_images/2503502-ca9bad8b4fa37489.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后我们在浏览器里访问https://a.51tcsd.com/

是不是看到惊喜了
![](https://upload-images.jianshu.io/upload_images/2503502-90576deece2ea9e8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

*到此为止。申请免费通配符证书(Let's Encrypt)并绑定IIS已经完成
开启我们站点HTTPS之旅*