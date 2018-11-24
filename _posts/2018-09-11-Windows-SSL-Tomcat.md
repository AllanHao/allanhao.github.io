---
layout: post
title: Let's Encrypt的申请与应用（IIS，Tomcat）
categories: [运维]
description: windows下申请Let's encrypt免费证书配置到IIS和Tomcat
keywords: Let's encrypt, Tomcat
---

## 环境 ##
* Windows Server 2008 R2
* Tomcat 8.5.31
* JDK8

## 利用IIS+letsencrypt-win-simple.V1.9.1申请免费SSL证书
1. 新建一个IIS空网站test,并指向域名test.osgis.cn
   ![](https://allanhao.com/images/Let'sEncrypt-Tomcat/1.png)
2. 下载解压[letsencrypt-win-simple.V1.9.1](https://allanhao.com/images/Let'sEncrypt-Tomcat/letsencrypt-win-simple.V1.9.1.zip)
3. 双击运行letsencrypt.exe
4. 开始输入自己的邮箱，用于接收证书到期提醒
   ![](https://allanhao.com/images/Let'sEncrypt-Tomcat/2.png)
5. 按Y统一条款
   ![](https://allanhao.com/images/Let'sEncrypt-Tomcat/3.png)
6. 找到刚才新建的IIS网站，选择对应的序号，当然，也可以选M，指定域名和可以访问的路径就可以了，如下图，选择3
   ![](https://allanhao.com/images/Let'sEncrypt-Tomcat/4.png)
7. 然后便开始注册生成证书并应用到IIS
8. 因为证书3个月就到期，证书生成完成后还会提醒你是否创建任务续期
   ![](https://allanhao.com/images/Let'sEncrypt-Tomcat/5.png)
9. 按Y然后输入计算机的管理员用户名密码就好了
   ![](https://allanhao.com/images/Let'sEncrypt-Tomcat/6.png)
10. 证书部分完成，可以关闭窗口了
    ![](https://allanhao.com/images/Let'sEncrypt-Tomcat/7.png)
11. 然后在IIS编辑绑定中可以选择刚才生成的证书了
    ![](https://allanhao.com/images/Let'sEncrypt-Tomcat/8.png)
12. 访问https://test.osgis.cn,成功。至此，https证书申请和IIS应用完成。
    ![](https://allanhao.com/images/Let'sEncrypt-Tomcat/9.png)

## 下载安装Tomcat，配置https证书
1. 下载安装JDK（JRE）8
2. 下载安装Tomcat 8.5
3. 修改配置conf/server.xml
   ![配置https](https://allanhao.com/images/Let'sEncrypt-Tomcat/10.png)
   ![修改hostname](https://allanhao.com/images/Let'sEncrypt-Tomcat/12.png)
4. *注意* 修改完之后怎么都启动失败，原来需要安装ARP环境。下载解压[tomcat-native-1.2.17-win32-bin.zip](https://allanhao.com/images/Let'sEncrypt-Tomcat/tomcat-native-1.2.17-win32-bin.zip)
   把服务器对应位数(32/64位)的tcnative-1.dll粘贴至C:\Program Files\Java\jre1.8.0_112\bin路径下
   注:32位的就在压缩包的bin目录下
5. 修改tomcat的conf目录下web.xml文件:
   ![](https://allanhao.com/images/Let'sEncrypt-Tomcat/11.png)
   如图位置,加入以下代码:
   ```
   <security-constraint> 
       <web-resource-collection > 
              <web-resource-name >SSL</web-resource-name> 
              <url-pattern>/*</url-pattern> 
       </web-resource-collection>
                             
       <user-data-constraint> 
              <transport-guarantee>CONFIDENTIAL</transport-guarantee> 
       </user-data-constraint> 
   </security-constraint>
   ```
6. 重启Tomcat,完成
7. 注意！访问Manager App报403问题
   * 修改conf/tomcat-users.xml
     ```
     <role rolename="manager-gui"/> 
     <user username="user" password="password" roles="manager-gui"/>
     ```
   * 同时还需要修改(如无新建)conf/Catalina/localhost/manager.xml，因为我们已经将hostname指向了map.osgis.cn,所以需要修改conf/Catalina/map.osgis.cn/manager.xml
     内容如下:
     ```
     <Context privileged="true" antiResourceLocking="false"   
         docBase="${catalina.home}/webapps/manager">  
            <Valve className="org.apache.catalina.valves.RemoteAddrValve" allow="^.*$" />  
     </Context> 
     ```